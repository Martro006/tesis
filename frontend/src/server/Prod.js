import axios from "axios"
import api from "./Config"

const getProd = async () => {
    return await axios.get(api + "prod");
}

const insertProd = async (data) => {
    return await axios.post(api + "prod/insert", data);
}

const actualizarProd = async (data) => {
    return await axios.put(api + "prod/update", data);
}

const buscarDatos = async (dato) => {
    return await axios.post(api + "prod/buscarProd", { "dato": dato });
}

export const mothProd = {
    getProd: getProd,
    insertProd: insertProd,
    actualizarProd: actualizarProd,
    buscarDatos: buscarDatos
};