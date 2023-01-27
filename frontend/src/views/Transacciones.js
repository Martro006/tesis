import { Button, ButtonGroup, Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";

const Transacciones = () => {
    const character = {
        top: "200px",
        position: "relative"
    };

    return (
        <Card style={character}>
            <CardHeader tag="h5" className="text-center" >
                <Row>
                    <Col className="d-flex justify-content-center align-items-center">
                        <h3>
                            <strong>
                                REGISTRO DE VENTAS
                            </strong>
                        </h3>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <Button block href="#/ventas" >
                    Ventas
                </Button>
                <br />
                <Button block href="#/compras">
                    Compras
                </Button>
            </CardBody>

        </Card>
    );
}

export default Transacciones;