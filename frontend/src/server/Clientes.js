import axios from "axios"
import api from "./Config"

const getClientes = async () => {
    return await axios.get(api + "clientes");
}
const deleteClientes = async (id) => {
    return await axios.put(api + "clientes/delete", { cli_id: id });
}
const insertClientes = async (data) => {
    return await axios.post(api + "clientes/insert", data);
}

const actualizarClientes = async (data) => {
    return await axios.put(api + "clientes/update", data);
}

const buscarDatos = async (dato) => {
    return await axios.post(api + "clientes/buscarCli", { "dato": dato });
}

export const methods = {
    getClientes: getClientes,
    deleteClientes: deleteClientes,
    actualizarClientes: actualizarClientes,
    insertClientes: insertClientes,
    buscarDatos: buscarDatos
};