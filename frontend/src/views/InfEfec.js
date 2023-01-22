import { Button, ButtonGroup, Card, CardTitle } from "reactstrap";

const InfEfec = () => {
    return (
        <Card className="center">
            <br />
            <CardTitle tag="h5" className="text-center" >
                NAVEGACION
            </CardTitle>

            <ButtonGroup className="my-2" size="lg">
                <Button>
                    Caja
                </Button>
            </ButtonGroup>

            <ButtonGroup className="my-2" size="lg">
                <Button>
                    Historial Caja
                </Button>
            </ButtonGroup>

            <ButtonGroup className="my-2" size="lg">
                <Button>
                    Cuadre de Caja
                </Button>
            </ButtonGroup>
            <ButtonGroup className="my-2" size="lg">
                <Button>
                    Valores Pendientes
                </Button>
            </ButtonGroup>
        </Card>
    );
}

export default InfEfec;