import axios from "axios"
import api from "./Config"

const getUsuarios = async () => {
    return await axios.get(api + "login");
}

const newUsuario = async (datos) => {
    return axios.post(api + "login/insert", datos);
}

const updateUsuario = async (datos) => {
    return axios.put(api + "login/update", datos);
}

const deleteUsuario = async (id) => {
    return axios.put(api + "login/delete", { log_id: id });
}

export const methodsUsu = {
    getUsuario: getUsuarios,
    newUsuario: newUsuario,
    updateUsuario: updateUsuario,
    deleteUsuario: deleteUsuario
};