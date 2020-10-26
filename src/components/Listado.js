import React, { Fragment, useEffect, useState } from "react";
import {
  Table,
  Button,
  Form,
  Container,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Listado.css";
import { v4 as uuidv4 } from "uuid";

const Listado = () => {
  // STATES
  const [autos, setAutos] = useState([]);
  const [agregar, setAgregar] = useState(false);
  const [autosForm, setAutosForm] = useState({
    marca: "",
    modelo: "",
    color: "",
    patente: "",
  });
  const [mostrar, setMostrar] = useState(false);
  const [editar, setEditar] = useState({
    tipo: "",
    id: "",
  });
  const [editarTexto, setEditarTexto] = useState("");
  const [validado, setValidado] = useState(false);

  // FUNCIONES

  const traerAutomoviles = async () => {
    const response = await fetch("http://localhost:3001/automoviles");
    const resData = await response.json();
    setAutos(resData);
  };

  const agregarAuto = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();
    if (form.checkValidity() === false) {
      return;
    }
    setValidado(true);
    const data = { id: uuidv4(), ...autosForm };
    const response = await fetch("http://localhost:3001/automoviles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    await traerAutomoviles();
  };

  const handleChange = (prop) => (e) => {
    setAutosForm({ ...autosForm, [prop]: e.target.value });
  };

  const handleChangeEditar = (e) => {
    setEditarTexto(e.target.value);
  };

  const eliminarAuto = async (id) => {
    const response = await fetch(`http://localhost:3001/automoviles/${id}`, {
      method: "DELETE",
    });
    await traerAutomoviles();
  };

  const editarAuto = async () => {
    const objeto = autos.find((auto) => auto.id === editar.id);
    const data = {
      ...objeto,
      [editar.tipo]: editarTexto,
    };
    const response = await fetch(
      `http://localhost:3001/automoviles/${editar.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    await traerAutomoviles();
  };

  //
  useEffect(() => {
    traerAutomoviles();
  }, []);

  return (
    <div>
      <Container>
        <Row>
          {autos !== [] ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th></th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Color</th>
                  <th>Patente</th>
                </tr>
              </thead>
              <tbody>
                {autos.map((auto) => {
                  return (
                    <Fragment key={auto.id}>
                      <tr>
                        <td
                          onClick={() => {
                            eliminarAuto(auto.id);
                          }}
                        >
                          {" "}
                          <FontAwesomeIcon icon={faTrash} />{" "}
                        </td>
                        <td
                          onClick={() => {
                            setEditar({
                              tipo: "marca",
                              id: auto.id,
                            });
                            setMostrar(true);
                          }}
                        >
                          {auto.marca}
                        </td>
                        <td
                          onClick={() => {
                            setEditar({
                              tipo: "modelo",
                              id: auto.id,
                            });
                            setMostrar(true);
                          }}
                        >
                          {auto.modelo}
                        </td>
                        <td
                          onClick={() => {
                            setEditar({
                              tipo: "color",
                              id: auto.id,
                            });
                            setMostrar(true);
                          }}
                        >
                          {auto.color}
                        </td>
                        <td
                          onClick={() => {
                            setEditar({
                              tipo: "patente",
                              id: auto.id,
                            });
                            setMostrar(true);
                          }}
                        >
                          {auto.patente}
                        </td>
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <h1>No hay datos </h1>
          )}
        </Row>
        <Row>
          <Col>
            <div className="container-boton">
              <Button
                onClick={() => {
                  setAgregar((prevState) => !prevState);
                }}
                variant="primary"
                size="lg"
                className="agregar"
              >
                Agregar auto
              </Button>{" "}
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={12}>
            {agregar ? (
              <Form noValidate validated={validado} onSubmit={agregarAuto}>
                <Form.Group controlId="formMarca">
                  <Form.Control
                    required
                    onChange={handleChange("marca")}
                    type="input"
                    placeholder="Marca"
                    value={autosForm.marca}
                  />
                </Form.Group>

                <Form.Group controlId="formModelo">
                  <Form.Control
                    required
                    onChange={handleChange("modelo")}
                    type="input"
                    placeholder="Modelo"
                    value={autosForm.modelo}
                  />
                </Form.Group>

                <Form.Group controlId="formColor">
                  <Form.Control
                    required
                    onChange={handleChange("color")}
                    type="input"
                    placeholder="Color"
                    value={autosForm.color}
                  />
                </Form.Group>

                <Form.Group controlId="formPatente">
                  <Form.Control
                    required
                    onChange={handleChange("patente")}
                    type="input"
                    placeholder="Patente"
                    value={autosForm.patente}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            ) : null}
          </Col>
        </Row>
      </Container>

      <Modal show={mostrar} onHide={() => setMostrar(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar {editar.tipo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            onChange={handleChangeEditar}
            type="input"
            placeholder={editar.tipo}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setMostrar(false);
              editarAuto();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Listado;
