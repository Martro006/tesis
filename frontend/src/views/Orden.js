import { Button, Card, CardBody, CardHeader, Col, Input, Label, Row, Table } from "reactstrap";
import { useEffect, useState } from 'react';
import { mothProd } from '../server/Prod';
import { methods } from '../server/Orden';
import { ReactSession } from 'react-client-session';
import { methodsUsu } from '../server/Usuario';

const OrdenCli = () => {
    const [data, setData] = useState([]);
    const [usu, usuData] = useState([]);
    const [disable, setDisable] = useState(false);
    const [disableOn, setDisableOn] = useState(true);

    const cliente = ReactSession.get("cliente");

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
        document.getElementById("numCed").value = cliente.cli_dni;

        const res = await mothProd.getProd();
        if (res.status === 200) {
            setData(res.data);
        }
        const resUsu = await methodsUsu.getUsuario();
        if (resUsu.status === 200) {
            usuData(resUsu.data);

            console.log(resUsu);
            console.log(usu);
        }

    }

    async function guardarDatos() {

        let tipo = "";

        if (document.getElementById("antiref").checked === true) {
            tipo += "ANTIRREFLEJO";
        }
        if (document.getElementById("filtroAz").checked === true) {
            tipo += " FILTRO AZUL";
        }
        if (document.getElementById("transition").checked === true) {
            tipo += " TRANSITION";
        }

        let clase = "";

        if (document.getElementById("monofoc").checked === true) {
            clase += "MONOFOCALES";
        }
        if (document.getElementById("bifoc").checked === true) {
            clase += " BIFOCALES";
        }
        if (document.getElementById("progres").checked === true) {
            clase += " PROGRESIVOS";
        }

        const res = await methods.insertOrden({
            "cli_dni": document.getElementById("numCed").value,
            "ord_fecha": fechaHoy,
            "ord_odEsfera": document.getElementById("odEsfera").value,
            "ord_oiEsfera": document.getElementById("oiEsfera").value,
            "ord_odCilindro": document.getElementById("odCilindro").value,
            "ord_oiCilindro": document.getElementById("oiClilindro").value,
            "ord_odEje": document.getElementById("odEje").value,
            "ord_oiEje": document.getElementById("oiEje").value,
            "ord_odDnp": document.getElementById("odDnp").value,
            "ord_oiDnp": document.getElementById("oiDnp").value,
            "ord_adicion": document.getElementById("adicion").value,
            "ord_altura": document.getElementById("altura").value,
            "ord_armazon": document.getElementById("armazon").value,
            "ord_material": document.getElementById("selectMaterial").value,
            "ord_tipo": tipo,
            "ord_clase": clase,
            "ord_valorTotal": document.getElementById("valTotal").value,
            "ord_abono": document.getElementById("abono").value,
            "ord_saldo": document.getElementById("saldo").value,
            "ord_observ": document.getElementById("observ").value,
            "ord_formaPago": document.getElementById("formaPago").value,
            "ord_banc": document.getElementById("entBancaria").value,
            "ord_numCheqTrans": document.getElementById("numCheqTrans").value,
            "ord_codAsesor": document.getElementById("codAsesor").value
        });
        console.log(res.status);

        if (res.status === 200) {
            alert("ORDEN AÑADIDA CON EXITO");
            setDisable(true);
            setDisableOn(false);
        } else {
            alert("STOCK DE PRODUCTOS INSUFICIENTE");
        }

    }

    function imprSelec() {
        let ficha = document.getElementById("imprimir");
        var ventimp = window.open(' ', 'popimpr');
        ventimp.document.write(ficha.innerHTML);
        ventimp.document.close();
        ventimp.print();
        ventimp.close();
    }

    function calcular() {
        let saldo = 0;
        let aux = document.getElementById("valTotal").value;
        let aux2 = document.getElementById("abono").value;

        saldo = Number(aux) - Number(aux2);
        document.getElementById("saldo").value = saldo;
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

        <Card id="imprimir">
            <CardHeader className="d-flex justify-content-center align-items-center">
                <h4>
                    <strong>
                        ORDEN DE TRABAJO
                    </strong>
                </h4>
            </CardHeader>
            <CardBody style={{ backgroundColor: '#D6EAF8' }}>
                <Row >
                    <Row className="mb-4">
                        <Col>
                            Fecha:
                        </Col>
                        <Col>
                            <Input id="fecha" value={fechaHoy} readOnly />
                        </Col>
                    </Row>
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
                                            <Input id="odEsfera" />
                                        </td>
                                        <td>
                                            <Input id="odCilindro" />
                                        </td>
                                        <td>
                                            <Input id="odEje" />
                                        </td>
                                        <td>
                                            <Input id="odDnp" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            O.I:
                                        </td>
                                        <td>
                                            <Input id="oiEsfera" />

                                        </td>
                                        <td>
                                            <Input id="oiClilindro" />

                                        </td>
                                        <td>
                                            <Input id="oiEje" />

                                        </td>
                                        <td>
                                            <Input id="oiDnp" />

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        </td>
                                        <td>
                                            Adicion
                                        </td>
                                        <td>
                                            <Input id="adicion" />

                                        </td>
                                        <td>
                                            Altura
                                        </td>
                                        <td>
                                            <Input id="altura" />
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
                            <Input type="select" id="armazon" name="dato" onChange={handleInputChange} >
                                <option value={""}>
                                    Elegir
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
                            <h5>
                                <strong>
                                    ESCOGER MATERIAL
                                </strong>
                            </h5>
                            <Input id="selectMaterial" type="select">
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
                    <Row className="mb-4">
                        <Col>
                            <Input id="antiref" type="checkbox" />
                            <Label id="antireflejo" check>
                                <h6>
                                    &nbsp; &nbsp; &nbsp; &nbsp; Antireflejo
                                </h6>
                            </Label>

                        </Col>
                        <Col>
                            <Input id="transition" type="checkbox" />
                            <Label check>
                                <h6>
                                    &nbsp; &nbsp; &nbsp; &nbsp;  Transition
                                </h6>
                            </Label>
                        </Col>
                        <Col>
                            <Input id="filtroAz" type="checkbox" />
                            <Label check>
                                <h6>
                                    &nbsp; &nbsp; &nbsp; &nbsp; Filtro azul
                                </h6>
                            </Label>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <h5>
                                <strong>
                                    ESCOGER CLASE
                                </strong>
                            </h5>

                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <Input id="monofoc" type="checkbox" />
                            <Label check>
                                <h6>
                                    &nbsp;  &nbsp; &nbsp; &nbsp; Monofocales
                                </h6>
                            </Label>

                        </Col>
                        <Col>
                            <Input id="bifoc" type="checkbox" />
                            <Label check>
                                <h6>
                                    &nbsp; &nbsp; &nbsp; &nbsp; Bifocales
                                </h6>
                            </Label>
                        </Col>
                        <Col>
                            <Input id="progres" type="checkbox" />
                            <Label check>
                                <h6>
                                    &nbsp; &nbsp; &nbsp; &nbsp; Progresivas
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
                            <Input id="valTotal" type="number"></Input>
                        </Col>
                        <Col>
                            ABONO
                        </Col>
                        <Col>
                            <Input id="abono" type="number"></Input>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            SALDO
                            <Input id="saldo" readOnly />
                        </Col>
                        <Col>
                            <br />
                            <div>
                                <Button onClick={() => calcular()}>CALCULAR</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            Observaciones:
                            <Input id="observ" autoComplete="off" />
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            Forma de Pago
                        </Col>
                        <Col>
                            <Input id="formaPago" type="select">
                                <option value={"Efectivo"}>
                                    Efectivo
                                </option>
                                <option value={"Tarjeta"}>
                                    Tarjeta
                                </option>
                                <option value={"Transferencia"}>
                                    Transferencia
                                </option>
                                <option value={"Cheque"}>
                                    Cheque
                                </option>
                            </Input>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <h5>
                                <strong>
                                    Detalles de pago (No Efectivo / Tarjeta)
                                </strong>
                            </h5>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            Entidad Bancaria:
                        </Col>
                        <Col>
                            <Input id="entBancaria" type="text" />
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <Col>
                            Numero de cheque o transferencia:
                        </Col>
                        <Col>
                            <Input id="numCheqTrans" type="text" />
                        </Col>
                    </Row>
                    <br />
                    <Row className="mb-5">
                        <Col>
                            Asesor
                        </Col>
                        <br />
                        <Col>
                            <Input type="select" autoComplete="off" id="codAsesor">
                                <option value={""}>
                                    Elegir
                                </option>
                                {
                                    usu.map((d, index) => (
                                        <option key={index} value={d.log_correo}>
                                            {d.log_correo}
                                        </option>
                                    ))
                                }
                            </Input>
                        </Col>
                    </Row>
                    <Button color="success" disabled={disable} onClick={() => guardarDatos()} size="lg">GUARDAR</Button>
                    <br />
                    <Button color="warning" disabled={disableOn} onClick={() => imprSelec()} size="lg">IMPRIMIR</Button>
                </Row>
            </CardBody>
        </Card>
    );
}

export default OrdenCli;