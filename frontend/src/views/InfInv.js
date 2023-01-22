import { Button, ButtonGroup, Card, CardTitle } from "reactstrap";

const InfInv = () => {
    return (
        <Card className="center">
            <br />
            <CardTitle tag="h5" className="text-center" >
                NAVEGACION
            </CardTitle>

            <ButtonGroup className="my-2" size="lg">
                <Button>
                    Stock Productos
                </Button>
            </ButtonGroup>

            <ButtonGroup className="my-2" size="lg">
                <Button>
                    Historial Productos
                </Button>
            </ButtonGroup>
        </Card>
    );
}

export default InfInv;