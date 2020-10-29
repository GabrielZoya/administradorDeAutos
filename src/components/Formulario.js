import React from "react";
import { Button, Form } from "react-bootstrap";

const Formulario = ({ validado, onSubmit, onChange, value }) => {
  return (
    <Form noValidate validated={validado} onSubmit={onSubmit}>
      <Form.Group controlId="formMarca">
        <Form.Control
          required
          onChange={onChange("marca")}
          type="input"
          placeholder="Marca"
          value={value.marca}
        />
      </Form.Group>

      <Form.Group controlId="formModelo">
        <Form.Control
          required
          onChange={onChange("modelo")}
          type="input"
          placeholder="Modelo"
          value={value.modelo}
        />
      </Form.Group>

      <Form.Group controlId="formColor">
        <Form.Control
          required
          onChange={onChange("color")}
          type="input"
          placeholder="Color"
          value={value.color}
        />
      </Form.Group>

      <Form.Group controlId="formPatente">
        <Form.Control
          required
          onChange={onChange("patente")}
          type="input"
          placeholder="Patente"
          value={value.patente}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Formulario;
