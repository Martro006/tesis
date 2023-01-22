import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Row, Col, Table, Modal, Input } from 'reactstrap';
import { methods } from '../server/Clientes';
import { Navigate } from 'react-router-dom';
import ModalClientes from './modales/ModalClientes';

const Clientes = () => {
    const [data, setData] = useState([]); //primera seccion de un hook
    const [modalForm, setModaClientes] = useState(false);
    const toggleForm = () => setModaClientes(!modalForm);

    const [entrada, setEntrada] = useState({
        opcion: 0,
        id: -1,
        dni: "",
        nombres: "",
        correo: "",
        direccion: "",
        telf: "",
    });

    async function obtenerDatos() {
        const res = await methods.getClientes();
        if (res.status === 200) {
            setData(res.data);
        }
    }
    async function eliminarDatos(id) {
        const res = await methods.deleteClientes(id);
        if (res.status === 200) {
            obtenerDatos();
        }
    }
    async function buscarDatos(dato) {
        const res = await methods.buscarDatos(data);
        if (res.status === 200) {
            setData(res.data);
        }
    }
    const seleccionarOpcion = (index, option) => {
        //console.log(data)
        if (option === 1) {
            setEntrada({
                ...entrada,
                opcion: option,
                id: -1,
                dni: "",
                nombres: "",
                correo: "",
                direccion: "",
                telf: ""
            })

            toggleForm();
        }
        else if (option === 2) {
            setEntrada({
                ...entrada,
                opcion: option,
                id: data[index]["cli_id"],
                dni: data[index]["cli_dni"],
                nombres: data[index]["cli_nombres"],
                correo: data[index]["cli_correo"],
                direccion: data[index]["cli_direccion"],
                telf: data[index]["cli_telf"]
            })

            toggleForm();
        }
    }

    const enviarDatos = async (event) => {
        event.preventDefault();

        if (entrada.opcion === 1) {
            const res = await methods.insertClientes({
                "cli_dni": entrada.dni,
                "cli_nombres": entrada.nombres,
                "cli_correo": entrada.correo,
                "cli_direccion": entrada.direccion,
                "cli_telf": entrada.telf
            });
        } else if (entrada.opcion === 2) {
            const res = await methods.actualizarClientes({
                "cli_id": entrada.id,
                "cli_dni": entrada.dni,
                "cli_nombres": entrada.nombres,
                "cli_correo": entrada.correo,
                "cli_direccion": entrada.direccion,
                "cli_telf": entrada.telf
            });
        }
    }

    const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
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
            <CardHeader>
                <Row>
                    <Col xs="6" sm="4" lg="10">
                        CLIENTES
                    </Col>
                    <Col xs="6" sm="4" lg="2" >
                        <Button outline color='primary' size='sm' onClick={() => seleccionarOpcion(0, 1)} >
                            Nuevo
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6" sm="4">
                        Buscar Clientes
                    </Col>
                    <Col xs="6" sm="4" lg="10" >
                        <Input type='text' name='dato' placeholder='Escriba el nombre o la cedula del cliente' >
                        </Input>
                        <Button color='success' size='sm' onClick={() => buscarDatos()} >
                            Buscar
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
                                DNI
                            </th>
                            <th>
                                NOMBRES
                            </th>
                            <th>
                                CORREO
                            </th>
                            <th>
                                DIRECCION
                            </th>
                            <th>
                                TELEFONO
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
                                        {d.cli_dni}
                                    </td>
                                    <td>
                                        {d.cli_nombres}
                                    </td>
                                    <td>
                                        {d.cli_correo}
                                    </td>
                                    <td>
                                        {d.cli_direccion}
                                    </td>
                                    <td>
                                        {d.cli_telf}
                                    </td>
                                    <td>
                                        <Button onClick={() => seleccionarOpcion(index, 2)}>ACTUALIZAR</Button>
                                        <ModalClientes
                                            modalForm={modalForm}
                                            toggleForm={toggleForm}
                                            handleInputChange={handleInputChange}
                                            entrada={entrada}
                                            enviarDatos={enviarDatos}
                                        />
                                        <Button onClick={() => eliminarDatos(d.cli_id)}>ELIMINAR</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
}

export default Clientes;