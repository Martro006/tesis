import { getConnection } from "../database/database";

const getEntrada = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM tbl_concepto JOIN tbl_productos JOIN tbl_entradas WHERE tbl_productos.prod_id = tbl_concepto.prod_id AND tbl_entradas.entr_id = tbl_concepto.entr_id AND tbl_concepto.conc_estado = 1");
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const buscarEntrada = async (req, res) => {
    try {
        const { dato } = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM tbl_concepto JOIN tbl_productos JOIN tbl_entradas WHERE " +
            "tbl_productos.prod_descrip like ? or tbl_productos.prod_codigo like ? or tbl_entradas.entr_fecha like ? or tbl_productos.prod_proveedor" +
            "AND tbl_productos.prod_id = tbl_concepto.prod_id AND tbl_entradas.entr_id = tbl_concepto.entr_id AND tbl_concepto.conc_estado = 1", ["%" + dato + "%", "%" + dato + "%", "%" + dato + "%"]);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addEntrada = async (req, res) => {
    try {
        const prod_estado = 1;
        const prod_cantidad = 0;
        const { prod_codigo, prod_descrip, prod_precio, prod_fecha } = req.body;
        const productos = { prod_codigo, prod_descrip, prod_precio, prod_cantidad, prod_fecha, prod_estado };
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO tbl_productos set ?", productos);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateEntrada = async (req, res) => {
    try {
        console.log(req.params);
        const prod_estado = 1;
        const { prod_id, prod_codigo, prod_descrip, prod_precio, prod_fecha } = req.body;
        const productos = { prod_id, prod_codigo, prod_descrip, prod_precio, prod_fecha, prod_estado };
        const connection = await getConnection();
        const result = await connection.query("UPDATE tbl_productos set ? where prod_id = ?", [productos, prod_id]);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteEntrada = async (req, res) => {
    try {
        const { prod_id } = req.body;
        const prod_estado = 0;
        const connection = await getConnection();
        const result = await connection.query("UPDATE tbl_productos set prod_estado = ? where prod_id = ?", [prod_estado, prod_id]);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const metod = { getEntrada, buscarEntrada, addEntrada, updateEntrada, deleteEntrada };