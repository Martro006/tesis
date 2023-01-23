import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";


const ModalProdCreados = (props) => {
    return (
        <Modal isOpen={props.modalForm} toggle={props.toggleForm}>
            <ModalHeader toggle={props.toggleForm}>
                CREAR NUEVO PRODUCTO
            </ModalHeader>
            <Form onSubmit={props.enviarDatos}>
                <ModalBody>
                    <FormGroup row>
                        <Label
                            for="prodCodI"
                            sm={3}
                        >
                            Producto Codigo
                        </Label>
                        <Col sm={9}>
                            <Input
                                bsSize="sm"
                                id="prodCodI"
                                name="prodCod"
                                placeholder="Escriba el codigo del producto"
                                type="text"
                                onChange={props.handleInputChange}
                                value={props.entrada.prodCod}
                                required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label
                            for="descI"
                            sm={3}
                        >
                            Producto Descripcion
                        </Label>
                        <Col sm={9}>
                            <Input
                                bsSize="sm"
                                id="descI"
                                name="desc"
                                placeholder="Escriba la descripcion del producto"
                                type="text"
                                onChange={props.handleInputChange}
                                value={props.entrada.desc}
                                required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label
                            for="fechaI"
                            sm={3}
                        >
                            Correo
                        </Label>
                        <Col sm={9}>
                            <Input
                                bsSize="sm"
                                id="fechaI"
                                name="fecha"
                                type="text"
                                readonly
                                onChange={props.handleInputChange}
                                value={props.entrada.fecha}
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

export default ModalProdCreados;