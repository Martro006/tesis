import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ModalLogin = (props) => {
    return (
        <Modal isOpen={props.modalForm} toggle={props.toggleForm}>
            <ModalHeader toggle={props.toggleForm}>
                USUARIOS
            </ModalHeader>
            <Form onSubmit={props.enviarDatos}>
                <ModalBody>
                    <FormGroup row>
                        <Label
                            for="usuI"
                            sm={3}
                        >
                            USUARIO
                        </Label>
                        <Col sm={9}>
                            <Input
                                bsSize="sm"
                                id="usuI"
                                name="usu"
                                placeholder="Escriba el nombre del Usuario"
                                type="text"
                                onChange={props.handleInputChange}
                                value={props.entrada.usu}
                                required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label
                            for="contraI"
                            sm={3}
                        >
                            Contraseña
                        </Label>
                        <Col sm={9}>
                            <Input
                                bsSize="sm"
                                id="contraI"
                                name="contra"
                                placeholder="Escriba la contraseña del usuario"
                                type="text"
                                onChange={props.handleInputChange}
                                value={props.entrada.contra}
                                required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label
                            for="privI"
                            sm={3}
                        >
                            Privilegio
                        </Label>
                        <Col sm={9}>
                            <Input
                                bsSize="sm"
                                id="privI"
                                name="priv"
                                placeholder="privilegio del usuario"
                                type="number"
                                //step="0.01"
                                onChange={props.handleInputChange}
                                value={props.entrada.priv}
                                required
                            />
                        </Col>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type="submit" >
                        Guardar
                    </Button>
                    <Button color="secondary" onClick={props.toggleForm}>
                        Cerrar
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
}

export default ModalLogin;