import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ItemCard({ item, onDelete }){
  return (
    
    <Card className="h-100">
      {item.imagenURL && <Card.Img src={item.imagenURL} alt={item.nombre} style={{objectFit:"cover", height:180}}/>}
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-start">
          <span>{item.nombre}</span>
          <span className="badge bg-secondary text-uppercase">{item.categoria}</span>
        </Card.Title>
        <Card.Text className="mb-1"><strong>Precio:</strong> ${item.precio}</Card.Text>
        <Card.Text className="mb-3"><strong>Stock:</strong> {item.stock}</Card.Text>
        <div className="d-flex gap-2">
          <Button as={Link} to={`/item/${item.id}`} size="sm" variant="outline-primary" aria-label={`Ver ${item.nombre}`}>Ver</Button>
          <Button as={Link} to={`/editar/${item.id}`} size="sm" variant="primary" aria-label={`Editar ${item.nombre}`}>Editar</Button>
          <Button size="sm" variant="outline-danger" onClick={() => onDelete?.(item.id)} aria-label={`Eliminar ${item.nombre}`}>Eliminar</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
