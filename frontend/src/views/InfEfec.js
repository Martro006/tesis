import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";

const InfEfec = () => {
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
                </Row>
            </CardHeader>

            <CardBody>
                <Button block>
                    Caja
                </Button>
                <br />

                <Button block>
                    Historial Caja
                </Button>


                <br />
                <Button block>
                    Cuadre de Caja
                </Button>

                <br />
                <Button block>
                    Valores Pendientes
                </Button>

                <br />

            </CardBody>
        </Card>
    );
}

export default InfEfec;

