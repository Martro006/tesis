import { getConnection } from "../database/database";

const getClientes = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM tbl_clientes WHERE cli_estado = 1");
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
const buscarClientes = async (req, res) => {
    try {
        const { dato } = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM tbl_clientes WHERE cli_dni like ? or cli_nombres like ? ", ["%" + dato + "%", "%" + dato + "%"]);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addClientes = async (req, res) => {
    try {
        const cli_estado = 1;
        const { cli_dni, cli_nombres, cli_correo, cli_direccion, cli_telf } = req.body;
        const clientes = { cli_dni, cli_nombres, cli_correo, cli_direccion, cli_telf, cli_estado };
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO tbl_clientes set ?", clientes);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateClientes = async (req, res) => {
    try {
        console.log(req.params);
        // const { cli_id } = req.params;
        const cli_estado = 1;
        const { cli_id, cli_dni, cli_nombres, cli_correo, cli_direccion, cli_telf } = req.body;
        const clientes = { cli_id, cli_dni, cli_nombres, cli_correo, cli_direccion, cli_telf, cli_estado };
        const connection = await getConnection();
        const result = await connection.query("UPDATE tbl_clientes set ? where cli_id = ?", [clientes, cli_id]);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteClientes = async (req, res) => {
    try {
        const { cli_id } = req.body;
        const cli_estado = 0;
        const connection = await getConnection();
        const result = await connection.query("UPDATE tbl_clientes set cli_estado = ? where cli_id = ?", [cli_estado, cli_id]);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const metod = { getClientes, addClientes, updateClientes, deleteClientes, buscarClientes };