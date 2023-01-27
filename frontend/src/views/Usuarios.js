import { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, CardBody, CardHeader, CardTitle, Col, Row, Table } from "reactstrap";
import ModalLogin from './modales/ModalLogin';
import { methods } from '../server/Usuario';
import { Navigate } from 'react-router-dom';

const Usuarios = () => {
    const [data, setData] = useState([]);
    const [modalForm, setModalLogin] = useState(false);
    const toggleForm = () => setModalLogin(!modalForm);

    const [entrada, setEntrada] = useState({
        opcion: 0,
        id: -1,
        usu: "",
        contra: "",
        priv: ""
    });

    async function obtenerDatos() {
        const res = await methods.getUsuario();
        if (res.status === 200) {
            setData(res.data);
        }
    }

    async function eliminarDatos(id) {
        const res = await methods.deleteUsuario(id);
        if (res.status === 200) {
            obtenerDatos();
        }
    }

    const seleccionarOpcion = (index, option) => {
        //console.log(data)
        if (option === 1) {
            setEntrada({
                ...entrada,
                opcion: option,
                id: -1,
                usu: "",
                contra: "",
                priv: ""
            })

            toggleForm();
        }
        else if (option === 2) {
            setEntrada({
                ...entrada,
                opcion: option,
                id: data[index]["log_id"],
                usu: data[index]["log_correo"],
                contra: data[index]["log_contra"],
                priv: data[index]["log_priv"]
            })

            toggleForm();
        }
    }

    const enviarDatos = async (event) => {
        event.preventDefault();

        if (entrada.opcion === 1) {
            const res = await methods.newUsuario({
                "log_correo": entrada.usu,
                "log_contra": entrada.contra,
                "log_priv": entrada.priv
            });
            if (res.status === 200) {
                toggleForm();
                obtenerDatos();
            }
        } else if (entrada.opcion === 2) {
            const res = await methods.updateUsuario({
                "log_id": entrada.id,
                "log_correo": entrada.usu,
                "log_contra": entrada.contra,
                "log_priv": entrada.priv
            });
            console.log(res.status);
            if (res.status === 200) {
                toggleForm();
                obtenerDatos();
            }
        }
    }
    const handleInputChange = (event) => {
        setEntrada({
            ...entrada,
            [event.target.name]: event.target.value
        })
    }
    useEffect(() => {
        obtenerDatos();
    }, []);// hasta aqui tengo los datos


    return (
        <Card>
            <br />
            <CardTitle tag="h5" className="text-center" >
                <Col className="d-flex justify-content-center align-items-center">
                    <h3>
                        <strong>
                            LISTA DE USUARIOS DEL SISTEMA
                        </strong>
                    </h3>
                </Col>
            </CardTitle>
            <CardHeader>
                <Row>
                    <Col className="d-flex justify-content-center align-items-center">
                        <strong>
                            USUARIOS
                        </strong>
                    </Col>
                    <Col xs="6" sm="4" lg="2" >
                        <Button outline color='primary' size='sm' onClick={() => seleccionarOpcion(0, 1)}>
                            Nuevo
                        </Button>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <Table striped responsive size='sm'>
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                NOMBRE USUARIO
                            </th>
                            <th>
                                CONTRASEÑA
                            </th>
                            <th>
                                PRIVIELEGIO
                            </th>
                            <th>
                                OPCIONES
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((d, index) => (
                                <tr key={index}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {d.log_correo}
                                    </td>
                                    <td>
                                        {d.log_contra}
                                    </td>
                                    <td>
                                        {d.log_priv}
                                    </td>
                                    <td>
                                        <Button onClick={() => seleccionarOpcion(index, 2)}>ACTUALIZAR</Button>
                                        <Button onClick={() => eliminarDatos(d.log_id)}>ELIMINAR</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <ModalLogin
                    modalForm={modalForm}
                    toggleForm={toggleForm}
                    handleInputChange={handleInputChange}
                    entrada={entrada}
                    enviarDatos={enviarDatos}
                />
            </CardBody>
        </Card>
    );
}

export default Usuarios;