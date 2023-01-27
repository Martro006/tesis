import { Button, ButtonGroup, Card, CardBody, CardHeader, CardTitle, Col, Input, Label, Row, Table } from "reactstrap";

const Ventas = () => {

    return (
        <Card>
            <CardHeader>
                <Row>
                    <Col className="d-flex justify-content-center align-items-center">
                        <h3>
                            <strong>
                                REGISTRO DE VENTAS
                            </strong>
                        </h3>
                    </Col>
                </Row>
                <Row className="m-lg-4">
                    <Col xs={3} sm={3} lg={3} className='text-end'>
                        <Label>
                            Buscar:
                        </Label>
                    </Col>
                    <Col xs={7} sm={6} lg={6}>
                        <Input
                            bsSize="sm"
                            name="dato"
                            placeholder='Escriba un nombre, apellido, producto o fecha'
                            type="text"
                        />
                    </Col>
                    <Col xs={2} sm={3} lg={3}>
                        <Button className='bg-gradient rounded-3' color='info' size='sm'  >
                            🔍
                        </Button>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <Table striped responsive size='sm'>

                </Table>
            </CardBody>
        </Card>
    );
}

export default Ventas;