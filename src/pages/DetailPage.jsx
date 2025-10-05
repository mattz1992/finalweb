import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { getItem } from "../api/items";

export default function DetailPage(){
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    getItem(id).then(setItem).catch(()=> setItem(null));
  }, [id]);

  if (!item) return <Container className="py-4"><p>Cargando...</p></Container>;

  return (
    <Container className="py-4">
      <Card>
        {item.imagenURL && <Card.Img variant="top" src={item.imagenURL} alt={item.nombre} />}
        <Card.Body>
          <Card.Title>{item.nombre}</Card.Title>
          <Card.Text><strong>Categoría:</strong> {item.categoria}</Card.Text>
          <Card.Text><strong>Precio:</strong> ${item.precio}</Card.Text>
          <Card.Text><strong>Stock:</strong> {item.stock}</Card.Text>
          <div className="d-flex gap-2">
            <Button as={Link} to={`/editar/${item.id}`} variant="primary">Editar</Button>
            <Button as={Link} to="/" variant="outline-primary">Volver</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
