import { Card, CardBody, CardHeader, Col, Input, Label, Row, Table } from "reactstrap";
import { useEffect, useState } from 'react';
import { methods } from '../server/Compras';
import { ReactSession } from 'react-client-session';

const FactEntr = () => {
    const [data, setData] = useState([]);

    const numFactEnviado = ReactSession.get("numFactEnv");

    let subt = 0;
    let iva = 0;
    let total = 0;

    async function obtenerDatosMostrar() {
        const res = await methods.verFact(numFactEnviado);
        setData(res.data);
    }

    useEffect(() => {
        obtenerDatosMostrar();
    }, []);// hasta aqui tengo los datos

    data.map((d) => (
        document.getElementById("numF").value = d.entr_numFact,
        document.getElementById("provee").value = d.entr_prov,
        document.getElementById("subt").textContent = d.entr_subtotal,
        document.getElementById("iva").textContent = d.entr_iva,
        document.getElementById("total").textContent = d.entr_total
    ));

    return (
        <Card>
            <CardHeader className="d-flex justify-content-center align-items-center">
                <h4>
                    <strong>
                        RESUMEN DE FACTURA
                    </strong>
                </h4>
            </CardHeader>
            <CardBody>
                <Row className="mb-4">
                    <Col>
                        Numero de factura:
                    </Col>
                    <Col>
                        <Input id="numF" type="text"></Input>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        Proveedor:
                    </Col>
                    <Col>
                        <Input id="provee" type="text"></Input>
                    </Col>
                </Row>
                <Table className="mb-6" striped>
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                Codigo Producto
                            </th>
                            <th>
                                Descripcion
                            </th>
                            <th>
                                Cantidad
                            </th>
                            <th>
                                Precio Unitario
                            </th>
                            <th>
                                Precio Total
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
                                        {d.entr_cant}
                                    </td>
                                    <td id={index + "p"}>
                                        {d.prod_precio}
                                    </td>
                                    <td>
                                        <Label id={index + "pt"}>
                                            {d.entr_cant * d.entr_precUnit}
                                        </Label>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </Table>
                <Table bordered>
                    <tbody>
                        <tr>
                            <th scope="row">
                                SUBTOTAL
                            </th>
                            <td id="subt">
                                {subt}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                IVA 12%
                            </th>
                            <td id="iva">
                                {iva}
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                VALOR TOTAL
                            </th>
                            <td id="total">
                                {total}
                            </td>
                        </tr>
                    </tbody>

                </Table>

            </CardBody>
        </Card>
    );
}

export default FactEntr;