import { Button, ButtonGroup, Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { useEffect, useState } from 'react';
import { mothProd } from '../server/Prod';
import ModalCrearProd from "./modales/ModalProdCrear";

const Compras = () => {
    const [data, setData] = useState([]);
    const [modalFormProd, setModalProd] = useState(false);
    const toggleFormProd = () => setModalProd(!modalFormProd);
    const fechaHoy = new Date().toLocaleDateString('es-Es');

    const [entradaProd, setEntradaProd] = useState({
        opcion: 0,
        id: -1,
        prodCod: "",
        desc: "",
        fecha: ""
    });

    async function obtenerFacturas() {
        const res = await mothProd.getProductos();
        if (res.status === 200) {
            setData(res.data);
        }
    }

    const seleccionarOpcion = (index, option) => {
        //console.log(data)
        if (option === 1) {
            setEntradaProd({
                ...entradaProd,
                opcion: option,
                id: -1,
                prodCod: "",
                desc: "",
                fecha: fechaHoy
            })
            toggleFormProd();
        }
    }

    const enviarDatosProd = async (event) => {
        event.preventDefault();

        if (entradaProd.opcion === 1) {
            const res = await mothProd.insertProd({
                "prod_codigo": entradaProd.prodCod,
                "prod_descrip": entradaProd.desc,
                "prod_fecha": entradaProd.fecha
            });

            if (res.status === 200) {
                toggleFormProd();
            }
        }
    }

    const handleInputChange = (event) => {
        setEntradaProd({
            ...entradaProd,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        obtenerFacturas();
    }, []);// hasta aqui tengo los datos

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
                <Row>
                    <Col className="d-flex justify-content-center align-items-center">
                        <Button color='success' size="lg" >
                            Ingresar Nueva Compra
                        </Button>
                    </Col>
                </Row>
                <ModalCrearProd modalForm={modalFormProd}
                    toggleForm={toggleFormProd}
                    handleInputChange={handleInputChange}
                    entrada={entradaProd}
                    enviarDatos={enviarDatosProd}
                />
            </CardBody>
        </Card>
    );
}

export default Compras;