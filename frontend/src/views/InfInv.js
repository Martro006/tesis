import { Button, ButtonGroup, Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";

const InfInv = () => {
    return (
        <Card className="center">
            <CardHeader>
                <Row>
                    <Col className="d-flex justify-content-center align-items-center">
                        <h3>
                            <strong>
                                INFORMES DE INVENTARIO
                            </strong>
                        </h3>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <Button block>
                    Stock Productos
                </Button>
                <br />
                <Button block>
                    Historial Productos
                </Button>
                <br />
            </CardBody>
        </Card>
    );
}

export default InfInv;