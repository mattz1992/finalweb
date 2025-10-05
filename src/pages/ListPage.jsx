import { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import ItemCard from "../components/ItemCard";
import PaginationBar from "../components/PaginationBar";
import EmptyState from "../components/EmptyState";
import { listItems, removeItem } from "../api/items";
import { categorias } from "../utils/validators";

export default function ListPage(){
  const [items, setItems] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exhausted, setExhausted] = useState(false);
  const pageSize = 6;

  const load = async (reset=false) => {
    setLoading(true);
    const { data, nextCursor } = await listItems({ categoria: categoria || undefined, pageSize, cursor: reset ? null : cursor });
    setLoading(false);
    if (reset) setItems(data);
    else setItems(prev => [...prev, ...data]);
    setCursor(nextCursor);
    setExhausted(!nextCursor || data.length < pageSize);
  };

  useEffect(() => { load(true); /* carga inicial o cuando cambia filtro */ }, [categoria]);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este ítem?")) return;
    await removeItem(id);
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <Container className="pb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 m-0">Productos</h1>
        <Form.Select aria-label="Filtrar por categoría" style={{maxWidth:260}} value={categoria} onChange={e=>{setCategoria(e.target.value);}}>
          <option value="">Todas las categorías</option>
          {categorias.map(c=> <option key={c} value={c}>{c}</option>)}
        </Form.Select>
      </div>

      {items.length === 0 && !loading && <EmptyState text="No hay productos. ¡Creá el primero!" />}
      <Row xs={1} md={3} className="g-3">
        {items.map(item => (
          <Col key={item.id}><ItemCard item={item} onDelete={handleDelete} /></Col>
        ))}
      </Row>

      <PaginationBar onNext={()=>load(false)} disabled={loading || exhausted} />
    </Container>
  );
}
