import { Button, ButtonGroup, Card, CardBody, CardHeader, CardTitle, Col, Row, Table } from "reactstrap";
import { useEffect, useState } from 'react';
import { ReactSession } from 'react-client-session';
import { methods } from '../server/Compras';
import { mothProd } from '../server/Prod';
import ModalCompras from "./modales/ModalCompras";
import ModalProd from "./modales/ModalProdCrear";

const Compras = () => {
    const [data, setData] = useState([]);
    const [modalForm, setModal] = useState(false);
    const toggleForm = () => setModal(!modalForm);
    const fechaHoy = new Date().toLocaleDateString('es-Es');

    const [entrada, setEntrada] = useState({
        opcion: 0,
        id: -1,
        prodId: "",
        nomFact: "",
        cant: "",
        subt: "",
        iva: "",
        total: "",
        precUnit: "",
        fecha: "",
        prov: "",
        cod: "",
        descrip: "",
        cantProd: "",
        precio: "",
    });

    async function obtenerFacturas() {
        const res = await methods.getCompras();
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
                cod: "",
                descrip: "",
                precio: "",
                fecha: fechaHoy
            })

            toggleForm();
        }
        else if (option === 2) {
            ReactSession.set("numFactEnv", data[index]["entr_numFact"]);
            window.location.href = '#/verFactEntr';
        }
    }

    const enviarDatos = async (event) => {
        event.preventDefault();

        if (entrada.opcion === 1) {
            const res = await mothProd.insertProd({
                "prod_codigo": entrada.prodCod,
                "prod_descrip": entrada.desc,
                "prod_precio": entrada.precio,
                "prod_fecha": entrada.fecha
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
        obtenerFacturas();
    }, []);// hasta aqui tengo los datos

    console.log(data);
    return (
        <Card>
            <CardHeader>
                <Row>
                    <Col className="d-flex justify-content-center align-items-center">
                        <h3>
                            <strong>
                                COMPRAS
                            </strong>
                        </h3>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center align-items-center">
                        <Button size="lg" onClick={() => seleccionarOpcion(0, 1)}>
                            Crear Producto
                        </Button>
                    </Col>
                    <Col className="d-flex justify-content-center align-items-center">
                        <Button size="lg" color='primary' href="#/prod">
                            Ver Productos Creados
                        </Button>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>

                <Col className="d-flex justify-content-center align-items-center">
                    <Button size="lg" color='success' href="#/factEntr">
                        CREAR NUEVA FACTURA
                    </Button>
                </Col>
                <div>
                    <Table striped responsive size='sm'>
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    NUM FACTURA
                                </th>
                                <th>
                                    TOTAL FACUTRA
                                </th>
                                <th>
                                    FECHA
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
                                            {d.entr_numFact}
                                        </td>
                                        <td>
                                            {d.entr_total}
                                        </td>
                                        <td>
                                            {d.entr_fecha}
                                        </td>
                                        <td>
                                            <Button onClick={() => seleccionarOpcion(index, 2)}>VER FACTURA</Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
                <ModalProd modalForm={modalForm}
                    toggleForm={toggleForm}
                    handleInputChange={handleInputChange}
                    entrada={entrada}
                    enviarDatos={enviarDatos}
                />
            </CardBody>
        </Card>
    );
}

export default Compras;