import { Container } from "react-bootstrap";
export default function About(){
  return (
    <Container className="py-4">
      <h1 className="h4">Sobre el proyecto</h1>
      <p>SPA de ejemplo con React, CRUD en Firebase Firestore, filtros y paginación. Tema: tienda de regalos, chocolate y peluches.</p>
    </Container>
  );
}
