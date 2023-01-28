import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Row, Col, Table, Modal, Input, Label } from 'reactstrap';
import { methods } from '../server/Clientes';
import ModalClientes from './modales/ModalClientes';
import { ReactSession } from 'react-client-session';

const Clientes = () => {
    const [data, setData] = useState([]); //primera seccion de un hook
    const [modalForm, setModaClientes] = useState(false);
    const toggleForm = () => setModaClientes(!modalForm);

    const [entrada, setEntrada] = useState({
        opcion: 0,
        id: -1,
        dato: "",
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
        const res = await methods.buscarDatos(dato);
        if (res.status === 200) {
            setData(res.data);
            console.log(data);
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
        } else if (option === 3) {
            ReactSession.set("cliente", data[index]);
            window.location.href = '#/ordenCli';
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
            if (res.status === 200) {
                toggleForm();
            }
        } else if (entrada.opcion === 2) {
            const res = await methods.actualizarClientes({
                "cli_id": entrada.id,
                "cli_dni": entrada.dni,
                "cli_nombres": entrada.nombres,
                "cli_correo": entrada.correo,
                "cli_direccion": entrada.direccion,
                "cli_telf": entrada.telf
            });
            if (res.status === 200) {
                toggleForm();
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
            <CardHeader>
                <Row>
                    <Col xs="6" sm="4" lg="10">
                        <h4>
                            <strong>
                                CLIENTES
                            </strong>
                        </h4>
                    </Col>
                    <Col xs="6" sm="4" lg="2" >
                        <Button outline color='primary' size='sm' onClick={() => seleccionarOpcion(0, 1)} >
                            Nuevo
                        </Button>
                    </Col>
                </Row>
                <Row className="m-lg-4">
                    <Col xs={3} sm={3} lg={3} className='text-end'>
                        <Label>
                            Buscar:
                        </Label>
                    </Col>
                    <Col xs={7} sm={6} lg={6}>
                        <Input
                            bsSize="sm"
                            name="dato"
                            placeholder='Escriba un nombre o numero de cedula del cliente'
                            type="text"
                            onChange={handleInputChange}
                            value={entrada.dato}
                        />
                    </Col>
                    <Col xs={2} sm={3} lg={3}>
                        <Button className='bg-gradient rounded-3' color='info' size='sm' onClick={() => buscarDatos(entrada.dato)} >
                            🔍
                        </Button>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <div>
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
                                            <Button onClick={() => eliminarDatos(d.cli_id)}>ELIMINAR</Button>
                                            <Button onClick={() => seleccionarOpcion(index, 3)} >ORDEN</Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                    <ModalClientes modalForm={modalForm}
                        toggleForm={toggleForm}
                        handleInputChange={handleInputChange}
                        entrada={entrada}
                        enviarDatos={enviarDatos}
                    />
                </div>
            </CardBody>
        </Card>
    );
}

export default Clientes;