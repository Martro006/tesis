import { getConnection } from "../database/database";

const getEntradas = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM tbl_entradas JOIN tbl_productos WHERE tbl_productos.prod_id= tbl_entradas.prod_id AND entr_estado = 1 ");
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const buscarEntradas = async (req, res) => {
    try {
        const { dato } = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM tbl_entradas WHERE entr_numFact like ? or entr_ like ? or prod_fecha like ? and prod_estado = 1", ["%" + dato + "%", "%" + dato + "%", "%" + dato + "%"]);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addEntradas = async (req, res) => {
    try {
        const prod_estado = 1;
        const prod_cantidad = 0;
        const { prod_codigo, prod_descrip, prod_fecha } = req.body;
        const productos = { prod_codigo, prod_descrip, prod_cantidad, prod_fecha, prod_estado };
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO tbl_productos set ?", productos);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateFacturas = async (req, res) => {
    try {
        console.log(req.params);
        const prod_estado = 1;
        const { prod_id, prod_codigo, prod_descrip, prod_fecha } = req.body;
        const productos = { prod_id, prod_codigo, prod_descrip, prod_fecha, prod_estado };
        const connection = await getConnection();
        const result = await connection.query("UPDATE tbl_productos set ? where prod_id = ?", [productos, prod_id]);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
export const metod = { getEntradas, addEntradas, updateFacturas, buscarEntradas };