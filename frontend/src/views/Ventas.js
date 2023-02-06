import { Button, ButtonGroup, Card, CardBody, CardHeader, CardTitle, Col, Input, Label, Row, Table } from "reactstrap";
import { useEffect, useState } from 'react';
import { methods } from '../server/Orden';
import { ReactSession } from 'react-client-session';

const Ventas = () => {

    const [data, setData] = useState([]);
    const [entrada, setEntrada] = useState({
        dato: ""
    });

    async function obtenerDatos() {
        const res = await methods.getOrden();
        if (res.status === 200) {
            setData(res.data);
        }
        console.log(data);
    }

    async function buscarDatos(data) {
        ReactSession.set("dataOrden", data);
        window.location.href = '#/verOrden';
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
                                REGISTRO DE ÓRDENES
                            </strong>
                        </h3>
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
                            placeholder='Escriba un nombre del cliente o el num de factura'
                            type="text"
                            onChange={handleInputChange}
                            value={entrada.dato}
                        />
                    </Col>
                    <Col xs={2} sm={3} lg={3}>
                        <Button className='bg-gradient rounded-3' color='info' size='sm' onClick={() => buscarDatos(entrada.dato)}>
                            🔍
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
                                NOMBRE CLIENTE
                            </th>
                            <th>
                                FECHA
                            </th>
                            <th>
                                NUMERO ORDEN
                            </th>
                            <th>
                                ARMAZON
                            </th>
                            <th>
                                VALOR TOTAL
                            </th>
                            <th>
                                ABONO
                            </th>
                            <th>
                                SALDO
                            </th>
                            <th>
                                ASESOR
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
                                        {d.cli_nombres}
                                    </td>
                                    <td>
                                        {d.ord_fecha}
                                    </td>
                                    <td>
                                        {d.ord_id}
                                    </td>
                                    <td>
                                        {d.ord_armazon}
                                    </td>
                                    <td>
                                        {d.ord_valorTotal}
                                    </td>
                                    <td>
                                        {d.ord_abono}
                                    </td>
                                    <td>
                                        {d.ord_saldo}
                                    </td>
                                    <td>
                                        {d.log_correo}
                                    </td>
                                    <td>
                                        <Button onClick={() => buscarDatos(d)}>VER ORDEN</Button>
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

export default Ventas;