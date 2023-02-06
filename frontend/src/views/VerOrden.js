import { Button, Card, CardBody, CardHeader, Col, Input, Label, Row, Table } from "reactstrap";
import { useEffect, useState } from 'react';
import { mothProd } from '../server/Prod';
import { methods } from '../server/Orden';
import { ReactSession } from 'react-client-session';

const VerOrden = () => {
    const [data, setData] = useState([]);
    const [disable, setDisable] = useState(false);
    const [disableOn, setDisableOn] = useState(true);

    const datosOrd = ReactSession.get("dataOrden");
    console.log(datosOrd);
    const fechaHoy = new Date().toLocaleDateString('es-Es');

    const [entrada, setEntrada] = useState({
        ord_id: -1,
        numCed: "",
        nomCli: "",
        odEsfera: "",
        odCilindro: "",
        odEje: "",
        odDnp: "",
        oiEsfera: "",
        oiClilindro: "",
        oiEje: "",
        oiDnp: "",
        adicion: "",
        altura: "",
        valTotal: "",
        abono: "",
        saldo: "",
        entBancaria: "",
        numCheqTrans: "",
        observ: "",
        ord_fecha: fechaHoy,
    });


    async function obtenerDatos() {
        const res = await mothProd.getProd();
        if (res.status === 200) {
            setData(res.data);
        }
        setEntrada({
            ...entrada,
            ord_id: datosOrd["ord_id"],
            numCed: datosOrd["cli_dni"],
            nomCli: datosOrd["cli_nombres"],
            odEsfera: datosOrd["ord_odEsfera"],
            odCilindro: datosOrd["ord_odCilindro"],
            odEje: datosOrd["ord_odEje"],
            odDnp: datosOrd["ord_odDnp"],
            oiEsfera: datosOrd["ord_oiEsfera"],
            oiClilindro: datosOrd["ord_oiCilindro"],
            oiEje: datosOrd["ord_oiEje"],
            oiDnp: datosOrd["ord_oiDnp"],
            adicion: datosOrd["ord_adicion"],
            altura: datosOrd["ord_altura"],
            valTotal: datosOrd["ord_valorTotal"],
            abono: datosOrd["ord_abono"],
            saldo: datosOrd["ord_saldo"],
            entBancaria: datosOrd["ord_banc"],
            numCheqTrans: datosOrd["ord_numCheqTrans"],
            observ: datosOrd["ord_observ"]
        })

        if (datosOrd["ord_tipo"].includes("TRANSITION")) {

            document.getElementById("transition").checked = true;
        }
        if (datosOrd["ord_tipo"].includes("ANTIRREFLEJO")) {

            document.getElementById("antiref").checked = true;
        }
        if (datosOrd["ord_tipo"].includes("FILTRO AZUL")) {

            document.getElementById("filtroAz").checked = true;
        }

        if (datosOrd["ord_clase"].includes("MONOFOCALES")) {

            document.getElementById("monofoc").checked = true;
        }
        if (datosOrd["ord_clase"].includes("BIFOCALES")) {

            document.getElementById("bifoc").checked = true;
        }
        if (datosOrd["ord_clase"].includes("PROGRESIVOS")) {

            document.getElementById("progres").checked = true;
        }

    }

    function imprSelec() {
        let ficha = document.getElementById("imprimir");
        var ventimp = window.open();
        ventimp.document.write(ficha.innerHTML);
        ventimp.document.close();
        ventimp.print();
        ventimp.close();
    }

    let saldo = 0;

    function calcular() {
        saldo = 0;
        let aux = document.getElementById("valTotal").value;
        let aux2 = document.getElementById("abono").value;

        saldo = Number(aux) - Number(aux2);
        document.getElementById("saldo").value = saldo;
        entrada.saldo = saldo;
    }

    async function act() {
        if (document.getElementById("codAsesor").value !== "") {
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

            const res = await methods.updateOrden({
                "ord_id": entrada.ord_id,
                "cli_dni": entrada.numCed,
                "ord_fecha": entrada.ord_fecha,
                "ord_odEsfera": entrada.odEsfera,
                "ord_oiEsfera": entrada.oiEsfera,
                "ord_odCilindro": entrada.odCilindro,
                "ord_oiCilindro": entrada.oiClilindro,
                "ord_odEje": entrada.odEje,
                "ord_oiEje": entrada.oiEje,
                "ord_odDnp": entrada.odDnp,
                "ord_oiDnp": entrada.oiDnp,
                "ord_adicion": entrada.adicion,
                "ord_altura": entrada.altura,
                "ord_armazon": datosOrd.ord_armazon,
                "ord_material": document.getElementById("selectMaterial").value,
                "ord_tipo": tipo,
                "ord_clase": clase,
                "ord_valorTotal": entrada.valTotal,
                "ord_abono": entrada.abono,
                "ord_saldo": entrada.saldo,
                "ord_observ": entrada.observ,
                "ord_formaPago": document.getElementById("formaPago").value,
                "ord_banc": entrada.entBancaria,
                "ord_numCheqTrans": entrada.numCheqTrans,
                "ord_codAsesor": document.getElementById("codAsesor").value
            });

            if (res.status === 200) {
                alert("Actualizacion exitosa");
                setDisable(true);
                setDisableOn(false);
            }

        } else {
            alert("ingresar codigo de asesor");
        }
        // console.log(entrada.ord_id);
        // console.log(entrada.numCed);
        // console.log(entrada.ord_fecha);
        // console.log(entrada.odEsfera);
        // console.log(entrada.oiEsfera);
        // console.log(entrada.odCilindro);
        // console.log(entrada.oiClilindro);
        // console.log(entrada.odEje);
        // console.log(entrada.oiEje);
        // console.log(entrada.odDnp);
        // console.log(entrada.oiDnp);
        // console.log(entrada.adicion);
        // console.log(entrada.altura);
        // console.log(datosOrd.ord_armazon);
        // console.log(document.getElementById("selectMaterial").value);
        // console.log(tipo);
        // console.log(clase);
        // console.log(entrada.valTotal);
        // console.log(entrada.abono);
        // console.log(entrada.saldo);
        // console.log(entrada.observ);
        // console.log(document.getElementById("formaPago").value);
        // console.log(entrada.entBancaria);
        // console.log(entrada.numCheqTrans);
        //console.log(document.getElementById("codAsesor").value);
        //console.log(res.status);
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
                            <Input readOnly id="numCed" type="text" name="numCed" onChange={handleInputChange} value={entrada.numCed} />
                        </Col>
                    </Row>
                    <br />
                    <Row className="mb-4">
                        <Col>
                            Nombre del cliente:
                        </Col>
                        <Col>
                            <Input readOnly id="nomCli" type="text" name="nomCli" onChange={handleInputChange} value={entrada.nomCli} />
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
                                            <Input id="odEsfera" name="odEsfera" onChange={handleInputChange} value={entrada.odEsfera} />
                                        </td>
                                        <td>
                                            <Input id="odCilindro" name="odCilindro" onChange={handleInputChange} value={entrada.odCilindro} />
                                        </td>
                                        <td>
                                            <Input id="odEje" name="odEje" onChange={handleInputChange} value={entrada.odEje} />
                                        </td>
                                        <td>
                                            <Input id="odDnp" name="odDnp" onChange={handleInputChange} value={entrada.odDnp} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            O.I:
                                        </td>
                                        <td>
                                            <Input id="oiEsfera" name="oiEsfera" onChange={handleInputChange} value={entrada.oiEsfera} />

                                        </td>
                                        <td>
                                            <Input id="oiClilindro" name="oiClilindro" onChange={handleInputChange} value={entrada.oiClilindro} />

                                        </td>
                                        <td>
                                            <Input id="oiEje" name="oiEje" onChange={handleInputChange} value={entrada.oiEje} />

                                        </td>
                                        <td>
                                            <Input id="oiDnp" name="oiDnp" onChange={handleInputChange} value={entrada.oiDnp} />

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        </td>
                                        <td>
                                            Adicion
                                        </td>
                                        <td>
                                            <Input id="adicion" name="adicion" onChange={handleInputChange} value={entrada.adicion} />

                                        </td>
                                        <td>
                                            Altura
                                        </td>
                                        <td>
                                            <Input id="altura" name="altura" onChange={handleInputChange} value={entrada.altura} />
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
                                <option value={datosOrd.ord_armazon}>
                                    {datosOrd.ord_armazon}
                                </option>
                            </Input>
                        </Col>
                        <Col>
                            <h5>
                                <strong>
                                    ESCOGER MATERIAL
                                </strong>
                            </h5>
                            <Input id="selectMaterial" type="select" onChange={handleInputChange} >
                                <option value={datosOrd.ord_material}>
                                    {datosOrd.ord_material}
                                </option>
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
                            <Input id="antiref" type="checkbox" onChange={handleInputChange} />
                            <Label id="antireflejo" check>
                                <h6>
                                    &nbsp; &nbsp; &nbsp; &nbsp; Antireflejo
                                </h6>
                            </Label>

                        </Col>
                        <Col>
                            <Input id="transition" type="checkbox" onChange={handleInputChange} />
                            <Label check>
                                <h6>
                                    &nbsp; &nbsp; &nbsp; &nbsp;  Transition
                                </h6>
                            </Label>
                        </Col>
                        <Col>
                            <Input id="filtroAz" type="checkbox" onChange={handleInputChange} />
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
                            <Input id="monofoc" type="checkbox" onChange={handleInputChange} />
                            <Label check>
                                <h6>
                                    &nbsp;  &nbsp; &nbsp; &nbsp; Monofocales
                                </h6>
                            </Label>

                        </Col>
                        <Col>
                            <Input id="bifoc" type="checkbox" onChange={handleInputChange} />
                            <Label check>
                                <h6>
                                    &nbsp; &nbsp; &nbsp; &nbsp; Bifocales
                                </h6>
                            </Label>
                        </Col>
                        <Col>
                            <Input id="progres" type="checkbox" onChange={handleInputChange} />
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
                            <Input id="valTotal" name="valTotal" type="number" onChange={handleInputChange} value={entrada.valTotal} />
                        </Col>
                        <Col>
                            ABONO
                        </Col>
                        <Col>
                            <Input id="abono" name="abono" type="number" onChange={handleInputChange} value={entrada.abono} />
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            SALDO
                            <Input id="saldo" name="saldo" readOnly value={entrada.saldo} onChange={handleInputChange} />
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
                            <Input id="observ" name="observ" autoComplete="off" value={entrada.observ} onChange={handleInputChange} />
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            Forma de Pago
                        </Col>
                        <Col>
                            <Input id="formaPago" type="select" onChange={handleInputChange} >
                                <option value={datosOrd.ord_formaPago}>
                                    {datosOrd.ord_formaPago}
                                </option>
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
                            <Input id="entBancaria" name="entBancaria" type="text" value={entrada.entBancaria} onChange={handleInputChange} />
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <Col>
                            Numero de cheque o transferencia:
                        </Col>
                        <Col>
                            <Input id="numCheqTrans" name="numCheqTrans" type="text" value={entrada.numCheqTrans} onChange={handleInputChange} />
                        </Col>
                    </Row>
                    <br />
                    <Row className="mb-5">
                        <Col>
                            Codigo del asesor
                        </Col>
                        <br />
                        <Col>
                            <Input type="password" autoComplete="off" id="codAsesor" required onChange={handleInputChange} />
                        </Col>
                    </Row>
                    <Button color="success" disabled={disable} onClick={() => act()} size="lg">GUARDAR</Button>
                    <br />
                    <Button color="warning" disabled={disable} onClick={() => imprSelec()} size="lg">IMPRIMIR</Button>
                </Row>
            </CardBody>
        </Card>
    );
}

export default VerOrden;