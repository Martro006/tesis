import { Button, ButtonGroup, Card, CardTitle } from "reactstrap";

const Transacciones = () => {
    const character = {
        top: "200px",
        position: "relative"
    };

    return (
        <Card style={character}>
            <br />
            <CardTitle tag="h5" className="text-center" >
                NAVEGACION
            </CardTitle>

            <ButtonGroup className="my-2" size="lg">
                <Button href="#/ventas" >
                    Ventas
                </Button>
            </ButtonGroup>

            <ButtonGroup className="my-2" size="lg">
                <Button href="#/compras">
                    Compras
                </Button>
            </ButtonGroup>
        </Card>
    );
}

export default Transacciones;