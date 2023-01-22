import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ModalForm = (props) => {
    //console.log(props.entrada)
    return (
        <Modal isOpen={props.modalForm} toggle={props.toggleForm}>
            <ModalHeader toggle={props.toggleForm}>Plantilla</ModalHeader>
            <Form onSubmit={props.enviarDatos}>
                <ModalBody>
                    <FormGroup row>
                        <Label
                            for="exampleEmail"
                            sm={3}
                            >
                            Email
                            </Label>
                            <Col sm={9}>
                            <Input
                                bsSize="sm"
                                id="exampleEmail"
                                name="email"
                                placeholder="Escriba su Correo Electrónico"
                                type="email"
                                onChange={props.handleInputChange}
                                value={props.entrada.email}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label
                            for="examplePassword"
                            sm={3}
                            >
                            Contraseña
                            </Label>
                            <Col sm={9}>
                            <Input
                                bsSize="sm"
                                id="examplePassword"
                                name="password"
                                placeholder="Escriba su Contraseña"
                                type="password"
                                onChange={props.handleInputChange}
                                value={props.entrada.password}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label
                            for="exampleImagen"
                            sm={3}
                            >
                            Avatar
                            </Label>
                            <Col sm={9}>
                            <Input
                                bsSize="sm"
                                id="exampleImagen"
                                name="imagen"
                                placeholder={props.entrada.imagen ?? 'Seleccione una imagen'}
                                type="file"
                                accept="image/*"
                                onChange={props.hadleInputFile}
                            />
                        </Col>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type="submit">
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

export default ModalForm;