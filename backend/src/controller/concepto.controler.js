import { getConnection } from "../database/database";

const getConcepto = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM tbl_concepto WHERE conc_estado = 1");
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addConcepto = async (req, res) => {
    try {
        const conc_estado = 1;
        const { prod_id, conc_color, conc_codigo, conc_descripcion } = req.body;
        const concepto = { prod_id, conc_color, conc_codigo, conc_descripcion, conc_estado };
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO tbl_concepto set ?", concepto);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateConcepto = async (req, res) => {
    try {
        console.log(req.params);
        const conc_estado = 1;
        const {conc_id, prod_id, conc_color, conc_codigo, conc_descripcion } = req.body;
        const concepto = {prod_id, conc_color, conc_codigo, conc_descripcion, conc_estado };
        const connection = await getConnection();
        const result = await connection.query("UPDATE tbl_concepto set ? where conc_id = ?", [concepto, conc_id]);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteConcepto = async (req, res) => {
    try {
        const { conc_id } = req.body;
        const conc_estado = 0;
        const connection = await getConnection();
        const result = await connection.query("UPDATE tbl_concepto set conc_estado = ? where conc_id = ?", [conc_estado, conc_id]);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const metod = { getConcepto, addConcepto, updateConcepto, deleteConcepto };