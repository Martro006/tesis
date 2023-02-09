import { Button, Card, CardBody, CardHeader, Col, Input, Row, Table } from "reactstrap";
import { methodsUsu } from '../server/Usuario';
import { useEffect, useState } from "react";
import { ReactSession } from 'react-client-session';

const InfEfec = () => {
    const [data, setData] = useState([]);

    const [entrada, setEntrada] = useState({

    });

    async function obtenerDatos() {
        const res = await methodsUsu.getUsuario();
        if (res.status === 200) {
            setData(res.data);
        }
        console.log(data);
    }

    async function buscarDatos(data) {
        console.log(data);
        ReactSession.set("transAse", data);
        window.location.href = '#/transAsesor';
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
        <Card className="center">
            <CardHeader>
                <Row>
                    <Col className="d-flex justify-content-center align-items-center">
                        <h3>
                            <strong>
                                INFORMES DE EFECTIVO
                            </strong>
                        </h3>
                    </Col>
                </Row>  <Row>
                    <Col className="d-flex justify-content-center align-items-center">
                        <h5>
                            <strong>
                                SELECCIONAR USUARIO
                            </strong>
                        </h5>
                    </Col>
                </Row>
            </CardHeader>

            <CardBody>
                <Row className="mb-4" >
                    <Col>
                        <h5>
                            <strong>
                                ESCOGER ASESOR
                            </strong>
                        </h5>

                        <Input className="mb-4" type="select" id="secre" name="dato" onChange={handleInputChange} >
                            <option value={"General"}>
                                GENERAL
                            </option>
                            {
                                data.map((d) => (
                                    <option value={d.log_correo}>
                                        {d.log_correo}
                                    </option>
                                ))
                            }
                        </Input>
                        <Button>BUSCAR</Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default InfEfec;

