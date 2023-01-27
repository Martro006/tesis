import axios from "axios"
import api from "./Config"

const getCompras = async () => {
    return await axios.get(api + "entradas");
}

const verFact = async (entr_numFact) => {
    return await axios.post(api + "entradas/verFact", { "entr_numFact": entr_numFact });
}

const insertCompras = async (data) => {
    return await axios.post(api + "entradas/insert", data);
}

const buscarDatos = async (dato) => {
    return await axios.post(api + "entradas/buscarCli", { "dato": dato });
}

export const methods = {
    verFact: verFact,
    getCompras: getCompras,
    insertCompras: insertCompras,
    buscarDatos: buscarDatos
};