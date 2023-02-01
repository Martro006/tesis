import axios from "axios"
import api from "./Config"

const getOrden = async () => {
    return await axios.get(api + "orden");
}

const insertOrden = async (data) => {
    return await axios.post(api + "orden/insert", data);
}

const updateOrden = async (data) => {
    return await axios.post(api + "orden/update", data);
}

const buscarOrden = async (dato) => {
    return await axios.post(api + "orden/buscarOrden", { "dato": dato });
}

export const methods = {
    getOrden: getOrden,
    insertOrden: insertOrden,
    updateOrden: updateOrden,
    buscarOrden: buscarOrden
};