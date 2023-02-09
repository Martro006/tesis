import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Row, Col, Table, Modal, Input, Label } from 'reactstrap';
import { methods } from '../server/Clientes';
import { ReactSession } from 'react-client-session';

const TransAsesor = () => {
    const [data, setData] = useState([]); //primera seccion de un hook
    const [modalForm, setModaClientes] = useState(false);
    const toggleForm = () => setModaClientes(!modalForm);


    const datosAsesor = ReactSession.get("transAse");

    console.log(datosAsesor);

    const [entrada, setEntrada] = useState({
        opcion: 0,
        id: -1,
        dato: "",
        dni: "",
        nombres: "",
        correo: "",
        direccion: "",
        telf: "",
    });

    async function obtenerDatos() {
        const res = await methods.getClientes();
        if (res.status === 200) {
            setData(res.data);
        }
    }

    async function buscarDatos(dato) {
        const res = await methods.buscarDatos(dato);
        if (res.status === 200) {
            setData(res.data);
            console.log(data);
        }
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
        <Card>
            <CardHeader>
                <Row>
                    <Col xs="6" sm="4" lg="10">
                        <h4>
                            <strong>
                                INFORMES DE EFECTIVO
                            </strong>
                        </h4>
                    </Col>
                    <Col xs="6" sm="4" lg="2" >
                        <Button outline color='primary' size='sm' >
                            Nuevo
                        </Button>
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
                            placeholder='Escriba un nombre o numero de cedula del cliente'
                            type="text"
                            onChange={handleInputChange}
                            value={entrada.dato}
                        />
                    </Col>
                    <Col xs={2} sm={3} lg={3}>
                        <Button className='bg-gradient rounded-3' color='info' size='sm' onClick={() => buscarDatos(entrada.dato)} >
                            🔍
                        </Button>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>

            </CardBody>
        </Card>
    );
}

export default TransAsesor;