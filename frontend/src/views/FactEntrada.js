import { Button, ButtonGroup, Card, CardBody, CardHeader, CardTitle, Col, Input, Label, Row, Table } from "reactstrap";
import { useEffect, useState } from 'react';
import { mothProd } from '../server/Prod';
import { methods } from '../server/Compras';
import ModalCompras from "./modales/ModalCompras";
import { array, element } from "prop-types";
import { ReactSession } from 'react-client-session';

const FactEntr = () => {
    const [data, setData] = useState([]);
    const [tabla, setTabla] = useState([]);

    let subt = 0;
    let iva = 0;
    let total = 0;
    const fechaHoy = new Date().toLocaleDateString('es-Es');

    const [entrada, setEntrada] = useState({
        opcion: 0,
        id: -1,
        prodProv: "",
        prodCod: "",
        desc: "",
        precio: "",
        cant: "",
        fecha: "",
        dato: ""
    });

    async function obtenerDatos() {
        const res = await mothProd.getProd();
        if (res.status === 200) {
            setData(res.data);
        }
    }

    async function guardarDatos() {
        tabla.forEach(async (element, key) => {
            await methods.insertCompras({
                "prod_id": element.prod_id,
                "entr_prov": document.getElementById("provee").value,
                "entr_numFact": document.getElementById("numF").value,
                "entr_cant": parseFloat(document.getElementById(key + "cant").value),
                "entr_subtotal": parseFloat(document.getElementById("subt").textContent),
                "entr_iva": parseFloat(document.getElementById("iva").textContent),
                "entr_total": parseFloat(document.getElementById("total").textContent),
                "entr_precUnit": element.prod_precio,
                "entr_fecha": fechaHoy
            });

        });
        window.location.href = '#/compras';
    }

    async function buscarDatos() {
        const res = await mothProd.buscarDatos(entrada.dato);
        if (res.status === 200) {
            setTabla([...tabla, res.data[0]]);
        }
    }
    let cant = 0;
    function cambiarValor(index) {
        cant = document.getElementById(index + "cant").value;
        let precio = document.getElementById(index + "p").textContent;
        let precioT = cant * precio;
        document.getElementById(index + "pt").textContent = precioT;
        //aqui poner el subt el iva y el total de todos los productos
    }

    function calcular() {
        subt = 0;
        tabla.forEach((element, key) => {
            subt += (element.prod_precio * document.getElementById(key + "cant").value)
            console.log(element);
            console.log(document.getElementById(key + "cant").value);
            console.log(subt);
        });

        document.getElementById("subt").textContent = "" + subt;

        iva = subt * 0.12;
        document.getElementById("iva").textContent = "" + iva.toFixed(2);

        total = iva + subt;
        document.getElementById("total").textContent = "" + total;
    }

    function quitar(index) {
        subt = 0;
        document.getElementById("subt").textContent = "" + subt;
        iva = 0;
        document.getElementById("iva").textContent = "" + iva;
        total = 0;
        document.getElementById("total").textContent = "" + total;

        let tblN = [];
        tabla.forEach((element, key) => {
            if (key !== index) {
                tblN.push(element);
            }
        });
        setTabla(tblN);
        //let nuevaTabla = Array.from(tabla);
        //nuevaTabla.pop();
        //setTabla(nuevaTabla);
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
                <Row className="mb-4 ">
                    <Col>
                        Seleccionar Productos
                    </Col>
                    <Col>
                        <Input type="select" name="dato" value={entrada.dato} onChange={handleInputChange} >
                            <option value={""}>
                                elegir
                            </option>
                            {
                                data.map((d, index) => (
                                    <option key={index} value={d.prod_codigo}>
                                        {d.prod_codigo}
                                    </option>
                                ))}
                        </Input>
                    </Col>
                    <Col>
                        <Button onClick={() => buscarDatos()}>
                            Añadir
                        </Button>
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
                            <th>
                                Quitar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tabla.map((d, index) => (
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
                                        <Input onChange={() => cambiarValor(index)} id={index + "cant"} type="number" />
                                    </td>
                                    <td id={index + "p"}>
                                        {d.prod_precio}
                                    </td>
                                    <td>
                                        <Label id={index + "pt"}>
                                            0
                                        </Label>
                                    </td>
                                    <td>
                                        <Button onClick={() => quitar(index)}>❌</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <Button onClick={() => calcular()}>CALCULAR</Button>
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

                <Button onClick={() => guardarDatos()}>
                    Guardar Factura
                </Button>
            </CardBody>
        </Card>
    );
}

export default FactEntr;