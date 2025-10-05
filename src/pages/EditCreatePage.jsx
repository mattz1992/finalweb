import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { createItem, getItem, updateItem } from "../api/items";
import { categorias, isValidUrl } from "../utils/validators";

export default function EditCreatePage({ mode }){
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState:{ errors, isSubmitting } } = useForm();

  useEffect(()=>{
    if(mode === "edit" && id){
      getItem(id).then(item=>{
        ["nombre","precio","stock","categoria","imagenURL"].forEach(k => setValue(k, item[k] ?? ""));
      });
    }
  },[mode, id, setValue]);

  const onSubmit = async (data) => {
    if(mode === "edit") await updateItem(id, data);
    else await createItem(data);
    navigate("/");
  };

  return (
    <Container className="py-4">
      <h1 className="h4 mb-3">{mode === "edit" ? "Editar producto" : "Crear producto"}</h1>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            {...register("nombre", { required:"El nombre es obligatorio" })}
            aria-invalid={!!errors.nombre} />
          {errors.nombre && <small className="text-danger">{errors.nombre.message}</small>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="number" step="0.01"
            {...register("precio", {
              required:"El precio es obligatorio",
              min:{ value:0.01, message:"Debe ser mayor a 0" }
            })}
            aria-invalid={!!errors.precio} />
          {errors.precio && <small className="text-danger">{errors.precio.message}</small>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Stock</Form.Label>
          <Form.Control type="number"
            {...register("stock", {
              required:"El stock es obligatorio",
              min:{ value:0, message:"No puede ser negativo" },
              validate: v => Number.isInteger(Number(v)) || "Debe ser entero"
            })}
            aria-invalid={!!errors.stock} />
          {errors.stock && <small className="text-danger">{errors.stock.message}</small>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Select
            {...register("categoria", {
              required:"Seleccioná una categoría",
              validate: v => categorias.includes(v) || "Categoría inválida"
            })}
            aria-invalid={!!errors.categoria}>
            <option value="">Elegir…</option>
            {categorias.map(c => <option key={c} value={c}>{c}</option>)}
          </Form.Select>
          {errors.categoria && <small className="text-danger">{errors.categoria.message}</small>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Imagen (URL)</Form.Label>
          <Form.Control
            placeholder="https://…"
            {...register("imagenURL", {
              validate: v => !v || isValidUrl(v) || "Debe ser una URL válida"
            })}
            aria-invalid={!!errors.imagenURL} />
          {errors.imagenURL && <small className="text-danger">{errors.imagenURL.message}</small>}
        </Form.Group>

        <Button type="submit" disabled={isSubmitting} variant="primary">
          {mode === "edit" ? "Guardar cambios" : "Crear"}
        </Button>
      </Form>
    </Container>
  );
}
