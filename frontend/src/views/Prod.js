import { Button, ButtonGroup, Card, CardBody, CardHeader, CardTitle, Col, Input, Row, Table } from "reactstrap";
import { useEffect, useState } from 'react';
import { methods } from '../server/Compras';
import { mothProd } from '../server/Prod';
import ModalCrearProd from "./modales/ModalProdCrear";

const Prod = () => {
    const [data, setData] = useState([]);
    const [modalForm, setModal] = useState(false);
    const toggleForm = () => setModal(!modalForm);
    const fechaHoy = new Date().toLocaleDateString('es-Es');

    const [entrada, setEntrada] = useState({
        opcion: 0,
        id: -1,
        prodProv: "",
        prodCod: "",
        desc: "",
        precio: "",
        cant: "",
        fecha: fechaHoy
    });

    async function obtenerDatos() {
        const res = await mothProd.getProd();
        if (res.status === 200) {
            setData(res.data);
        }
    }

    const seleccionarOpcion = (index, option) => {
        //console.log(data)
        if (option === 2) {
            setEntrada({
                ...entrada,
                opcion: option,
                id: data[index]["prod_id"],
                prodProv: data[index]["prod_proveedor"],
                precio: data[index]["prod_precio"],
                prodCod: data[index]["prod_codigo"],
                desc: data[index]["prod_descrip"],
                fecha: fechaHoy
            })

            toggleForm();
        }
    }

    const enviarDatosProd = async (event) => {
        event.preventDefault();

        if (entrada.opcion === 2) {
            const res = await mothProd.actualizarProd({
                "prod_id": entrada.id,
                "prod_codigo": entrada.prodCod,
                "prod_proveedor": entrada.prodProv,
                "prod_precio": entrada.precio,
                "prod_descrip": entrada.desc,
                "prod_fecha": entrada.fecha
            });

            if (res.status === 200) {
                toggleForm();
                obtenerDatos();
            }
        }
    }
    async function buscarDatos(dato) {
        const res = await mothProd.buscarDatos(dato);
        if (res.status === 200) {
            setData(res.data);
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
                    <Col className="d-flex justify-content-center align-items-center">
                        <h3>
                            <strong>
                                PRODUCTOS CREADOS
                            </strong>
                        </h3>
                    </Col>
                </Row>
                <Row>
                    <Col divider xs="6" sm="4">
                        <h5>
                            <strong>
                                Buscar Productos
                            </strong>
                        </h5>
                    </Col>
                    <Col xs="6" sm="4" lg="10" >
                        <Input type='text' name='dato' onChange={handleInputChange} value={entrada.dato} placeholder='Escriba el nombre o la cedula del cliente' />
                        <br />
                        <Button color='success' size='sm' onClick={() => buscarDatos(entrada.dato)} >
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
                                CODIGO
                            </th>
                            <th>
                                DESCRIPCION
                            </th>
                            <th>
                                PRECIO
                            </th>
                            <th>
                                FECHA REGISTRO
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
                                        {d.prod_codigo}
                                    </td>
                                    <td>
                                        {d.prod_descrip}
                                    </td>
                                    <td>
                                        {d.prod_precio}
                                    </td>
                                    <td>
                                        {d.prod_fecha}
                                    </td>
                                    <td>
                                        <Button onClick={() => seleccionarOpcion(index, 2)}>ACTUALIZAR</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <ModalCrearProd modalForm={modalForm}
                    toggleForm={toggleForm}
                    handleInputChange={handleInputChange}
                    entrada={entrada}
                    enviarDatos={enviarDatosProd}
                />
            </CardBody>
        </Card>
    );
}

export default Prod;