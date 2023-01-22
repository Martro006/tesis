import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ModalProdCreados = (props) => {
    return (
        <Modal isOpen={props.modalForm} toggle={props.toggleForm}>
            <ModalHeader toggle={props.toggleForm}>
                CLIENTES
            </ModalHeader>
            <Form onSubmit={props.enviarDatos}>
                <ModalBody>
                    <FormGroup row>
                        <Label
                            for="dniI"
                            sm={3}
                        >
                            DNI
                        </Label>
                        <Col sm={9}>
                            <Input
                                bsSize="sm"
                                id="dniI"
                                name="dni"
                                placeholder="Escriba el num de cedula"
                                type="text"
                                onChange={props.handleInputChange}
                                value={props.entrada.dni}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label
                            for="nombresI"
                            sm={3}
                        >
                            Nombres
                        </Label>
                        <Col sm={9}>
                            <Input
                                bsSize="sm"
                                id="nombresI"
                                name="nombres"
                                placeholder="Escriba el nombre del cliente"
                                type="text"
                                //step="0.01"
                                onChange={props.handleInputChange}
                                value={props.entrada.nombres}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label
                            for="correoI"
                            sm={3}
                        >
                            Correo
                        </Label>
                        <Col sm={9}>
                            <Input
                                bsSize="sm"
                                id="correoI"
                                name="correo"
                                placeholder="Escriba el correo electronico"
                                type="text"
                                //step="0.01"
                                onChange={props.handleInputChange}
                                value={props.entrada.correo}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label
                            for="direccionI"
                            sm={3}
                        >
                            Direccion
                        </Label>
                        <Col sm={9}>
                            <Input
                                bsSize="sm"
                                id="direccionI"
                                name="direccion"
                                placeholder="Escriba la direccion del cliente"
                                type="text"
                                //step="0.01"
                                onChange={props.handleInputChange}
                                value={props.entrada.direccion}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label
                            for="telefonoI"
                            sm={3}
                        >
                            Telefono
                        </Label>
                        <Col sm={9}>
                            <Input
                                bsSize="sm"
                                id="telefonoI"
                                name="telf"
                                placeholder="Escriba el telefono del cliente"
                                type="text"
                                //step="0.01"
                                onChange={props.handleInputChange}
                                value={props.entrada.telf}
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

export default ModalProdCreados;