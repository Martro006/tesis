import { Button, ButtonGroup, Card, CardBody, CardHeader, CardTitle, Col, Input, Label, Row, Table } from "reactstrap";
import { useEffect, useState } from 'react';
import { mothProd } from '../server/Prod';
import { methods } from '../server/Compras';
import ModalCompras from "./modales/ModalCompras";
import { array, element } from "prop-types";
import { ReactSession } from 'react-client-session';

const OrdenCli = () => {
    const [data, setData] = useState([]);
    const [tabla, setTabla] = useState([]);

    const cliente = ReactSession.get("cliente");

    console.log(cliente);
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

        document.getElementById("nomCli").value = cliente.cli_nombres;
        document.getElementById("numCed").value = cliente.cli_dni;
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
                        RECIBO
                    </strong>
                </h4>
            </CardHeader>
            <CardBody style={{ backgroundColor: '#D6EAF8' }}>
                <Row >

                    <Row className="mb-4">
                        <Col>
                            <h5>
                                <strong>
                                    INFORMACION DEL CLIENTE
                                </strong>
                            </h5>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            Numero de cedula:
                        </Col>
                        <Col>
                            <Input readOnly id="numCed" type="text" />
                        </Col>
                    </Row>
                    <br />
                    <Row className="mb-4">
                        <Col>
                            Nombre del cliente:
                        </Col>
                        <Col>
                            <Input readOnly id="nomCli" type="text" />
                        </Col>
                    </Row>
                </Row>
                <Row className="mb-4" style={{ backgroundColor: '#D1F2EB' }}>
                    <Row className="mb-5" >
                        <Col>
                            <Table >
                                <thead>
                                    <tr>
                                        <th>

                                        </th>
                                        <th>
                                            Esfera
                                        </th>
                                        <th>
                                            Cilindro
                                        </th>
                                        <th>
                                            Eje
                                        </th>
                                        <th>
                                            DNP
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            O.D:
                                        </td>
                                        <td>
                                            <Input>

                                            </Input>
                                        </td>
                                        <td>
                                            <Input>

                                            </Input>
                                        </td>
                                        <td>
                                            <Input>

                                            </Input>
                                        </td>
                                        <td>
                                            <Input>

                                            </Input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            O.I:
                                        </td>
                                        <td>
                                            <Input>

                                            </Input>
                                        </td>
                                        <td>
                                            <Input>

                                            </Input>
                                        </td>
                                        <td>
                                            <Input>

                                            </Input>
                                        </td>
                                        <td>
                                            <Input>

                                            </Input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        </td>
                                        <td>
                                            Adicion
                                        </td>
                                        <td>
                                            <Input>

                                            </Input>
                                        </td>
                                        <td>
                                            Altura
                                        </td>
                                        <td>
                                            <Input>

                                            </Input>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <h5>
                                <strong>
                                    ESCOGER ARMAZON
                                </strong>
                            </h5>
                            <Input type="select"></Input>
                        </Col>
                        <Col>
                            <h5>
                                <strong>
                                    ESCOGER MATERIAL
                                </strong>

                            </h5>
                            <Input type="select">
                                <option>
                                    Cristal
                                </option>
                                <option>
                                    Plastico
                                </option>
                                <option>
                                    Policarbonato
                                </option>
                            </Input>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <h5>
                                <strong>
                                    ESCOGER TIPO
                                </strong>
                            </h5>

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input type="checkbox" />
                            <Label check>
                                <h6>
                                    antireflejo
                                </h6>
                            </Label>

                        </Col>
                        <Col>
                            <Input type="checkbox" />
                            <Label check>
                                <h6>
                                    transition
                                </h6>
                            </Label>
                        </Col>
                        <Col>
                            <Input type="checkbox" />
                            <Label check>
                                <h6>
                                    Filtro azul
                                </h6>
                            </Label>
                        </Col>
                    </Row>
                </Row>
                <Row style={{ backgroundColor: '#D6EAF8' }}>
                    <Row className="mb-3">
                        <Col>
                            VALOR TOTAL
                        </Col>
                        <Col>
                            <Input></Input>
                        </Col>
                        <Col>
                            ABONO
                        </Col>
                        <Col>
                            <Input></Input>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            SALDO
                            <Input></Input>
                        </Col>
                        <Col>
                            <br />
                            <div>
                                <Button>CALCULAR</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            Observaciones:
                            <Input ></Input>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            Forma de Pago
                        </Col>
                        <Col>
                            <Input type="select">

                            </Input>
                        </Col>
                    </Row>
                    <br />
                    <Row className="mb-5">
                        <Col>
                            Codigo del asesor
                        </Col>
                        <br />
                        <Col>
                            <Input>

                            </Input>
                        </Col>
                    </Row>
                    <Button color="success" size="lg">GUARDAR</Button>

                </Row>
            </CardBody>
        </Card >
    );
}

export default OrdenCli;