import { Button, ButtonGroup, Card, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { useEffect, useState } from 'react';
import { methods } from '../server/Compras';
import { mothProd } from '../server/Prod';

const Compras = () => {
    const [data, setData] = useState([]);
    const [modalForm, setModalCompras] = useState(false);
    const toggleForm = () => setModalCompras(!modalForm);

    const [entradaProd, setEntradaProd] = useState({
        opcion: 0,
        id: -1,
        proveedor: "",
        descripcion: "",
        marca: "",
        tipo: "",
    });

    async function obtenerProductos() {
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
                dni: "",
                nombres: "",
                correo: "",
                direccion: "",
                telf: ""
            })

            toggleForm();
        }
    }
    useEffect(() => {
        obtenerProductos();
    }, []);// hasta aqui tengo los datos

    return (
        <CardHeader>
            <Row>
                <Col xs="6" sm="4" lg="10">
                    COMPRAS
                </Col>
                <Col xs="6" sm="4" lg="2" >
                    <Button href="#/compras">
                        Crear Producto
                    </Button>
                    <Button color='primary' size='sm' onClick={() => seleccionarOpcion(0, 1)}>
                        Ver Productos creados
                    </Button>
                </Col>
            </Row>
        </CardHeader>
    );
}

export default Compras;