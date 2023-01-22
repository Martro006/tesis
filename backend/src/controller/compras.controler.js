import { getConnection } from "../database/database";

const getCompras = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM tbl_entradas WHERE entr_estado = 1");
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getComprasFecha = async (req, res) => {
    try {
        const connection = await getConnection();
        const { entr_fecha } = req.body;
        const result = await connection.query("SELECT * FROM tbl_entradas WHERE entr_estado = 1 AND entr_fecha = ?", entr_fecha);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addCompras = async (req, res) => {
    try {
        const entr_estado = 1;
        const { conc_id, entr_numFact, entr_cant, entr_subtotal, entr_iva, entr_total, entr_precUnit, entr_fecha } = req.body;
        const entrada = { conc_id, entr_numFact, entr_cant, entr_subtotal, entr_iva, entr_total, entr_precUnit, entr_fecha, entr_estado };
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO tbl_entradas set ?", entrada);

        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteCompras = async (req, res) => {
    try {
        const { entr_id } = req.body;
        const entr_estado = 0;
        const connection = await getConnection();
        const result = await connection.query("UPDATE tbl_entradas set entr_estado = ? where entr_id = ?", [entr_estado, entr_id]);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const metod = { getCompras, deleteCompras, getComprasFecha, addCompras };