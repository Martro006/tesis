import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap';
import { methodsUsu } from '../../server/Usuario';
import Image from "../../components/dashboard/Image";
import avatar from '../../assets/images/users/user5.jpg';
import ModalForm from './modalForm';

const Plantilla = () => {
    const [status, setStatus] = useState(null);
    const [data, setData] = useState([]);
    const [entrada, setEntrada] = useState({
        opcion: 0,
        id: -1,
        email: "",
        password: "",
        imagen: null,
    });

    const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setEntrada({
            ...entrada,
            [event.target.name] : event.target.value
        })
    }

    const hadleInputFile = (event) => {
        //console.log(event.target.files[0]);
        setEntrada({
            ...entrada,
            [event.target.name] : event.target.files[0]
        })
    }

    const enviarDatos = async (event) => {
        event.preventDefault();
        if(entrada.email === "" || entrada.password === "" || entrada.imagen === null)
            alert("FORMULARIO INCORRECTO");
        if(entrada.opcion === 1){
            const res = await methodsUsu.uploadFile(entrada.imagen);
            if(res.status === 200){
                const r = await methodsUsu.newUsuario({
                    "log_correo": entrada.email,
                    "log_password": entrada.password,
                    "log_name_imagen": res.data.name,
                    "log_imagen": res.data.url
                });
                console.log(r);
            }else{
                alert("ERROR NO SE PUDO SUBIR LA FOTO VUELVA A INTENTAR");
            }
        }else if(entrada.opcion === 2){
            alert("TENEMOS LOS DATOS IMPRIMIR");
        }
        console.log('enviando datos...' + entrada.email + ' ' + entrada.password + ' ' + entrada.imagen)
    }

    const datosUsuario = async () => {
        try {
            setStatus(false);
            const res = await methodsUsu.getUsuario();
            if (res.status === 200) {
                setData(res.data);
            }
            setStatus(true);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        datosUsuario();
    }, []);

    const selectionOption = (option, index) => {
        //console.log(data)
        if(option === 1)
            setEntrada({
                ...entrada,
                opcion : option,
                id: -1,
                email: "",
                password: "",
                imagen: null
            })
        else if(option === 2)
            setEntrada({
                ...entrada,
                opcion : option,
                id: index,
                email: data[index].log_correo,
                password: data[index].log_password,
                imagen: data[index].log_imagen
            })
        toggleForm();
    }

    //Modals
    const [modalImagen, setModalImagen] = useState(false);
    const toggleImagen = () => setModalImagen(!modalImagen);
    const [modalForm, setModalForm] = useState(false);
    const toggleForm = () => setModalForm(!modalForm);
    
    return (
        <Card>
            <CardHeader>
                <Row>
                    <Col xs="9" sm="9" lg="10">
                        Plantilla
                    </Col>
                    <Col xs="3" sm="3" lg="2">
                        <Button block outline color="primary" size="sm" onClick={() => selectionOption(1, -1)}>
                            Nuevo
                        </Button>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                {status === true ? 
                    <Table striped>
                        <thead>
                            <tr>
                                <th>
                                    Correo
                                </th>
                                <th>
                                    Imagen
                                </th>
                                <th>
                                    Opciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((d, index) => (
                                    <tr key={index}>
                                        <td>
                                            {d.log_correo}
                                        </td>
                                        <td>
                                            <Button color='primary' onClick={toggleImagen}>Imagen</Button>
                                        </td>
                                        <Modal isOpen={modalImagen} toggle={toggleImagen}>
                                            <ModalHeader toggle={toggleImagen}>Avatar</ModalHeader>
                                            <ModalBody>
                                                <Image 
                                                    src={d.log_imagen === "" ? avatar : d.log_imagen} 
                                                    title= ""
                                                    subtitle= ""
                                                    height= {300}
                                                />
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="secondary" onClick={toggleImagen}>
                                                    Cerrar
                                                </Button>
                                            </ModalFooter>
                                        </Modal>
                                        <td>
                                            <Button color='warning' onClick={() => selectionOption(2, index)}>Actualizar</Button>
                                            <ModalForm
                                                modalForm = {modalForm}
                                                toggleForm = {toggleForm}
                                                handleInputChange = {handleInputChange}
                                                hadleInputFile = {hadleInputFile}
                                                enviarDatos = {enviarDatos}
                                                entrada = {entrada}
                                            />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table> :
                    <Spinner
                        color="primary"
                        type="grow"
                    />
                }
            </CardBody>
        </Card>
    );
}

export default Plantilla;

//https://bluuweb.github.io/react/formularios/#react-hook-form