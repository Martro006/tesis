import { getConnection } from "../database/database";

const getEntrada = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM tbl_entradas JOIN tbl_productos WHERE tbl_productos.prod_id = tbl_entradas.prod_id AND tbl_entradas.entr_estado = 1 GROUP BY entr_numFact ORDER BY tbl_entradas.entr_id DESC");
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const verFactura = async (req, res) => {
    try {
        const { entr_numFact } = req.body;

        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM tbl_entradas JOIN tbl_productos WHERE tbl_productos.prod_id = tbl_entradas.prod_id AND tbl_entradas.entr_estado = 1 AND tbl_entradas.entr_numFact =  ? ", entr_numFact);
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
        const result = await connection.query("SELECT * FROM tbl_entradas JOIN tbl_productos WHERE " +
            "tbl_productos.prod_descrip like ? or tbl_productos.prod_codigo like ? or tbl_entradas.entr_fecha like ? or tbl_entradas.entr_numFact like ? or tbl_entradas.entr_prov" +
            "AND tbl_productos.prod_id = tbl_entradas.prod_id AND tbl_entradas.entr_estado = 1", ["%" + dato + "%", "%" + dato + "%", "%" + dato + "%", "%" + dato + "%"]);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addEntrada = async (req, res) => {
    try {
        const entr_estado = 1;

        const { prod_id, entr_prov, entr_numFact, entr_cant, entr_subtotal, entr_iva, entr_total, entr_precUnit, entr_fecha } = req.body;
        const entrada = { prod_id, entr_prov, entr_numFact, entr_cant, entr_subtotal, entr_iva, entr_total, entr_precUnit, entr_fecha, entr_estado };
        const connection = await getConnection();

        const resp = await connection.query("INSERT INTO tbl_entradas set ?", entrada);

        const prodCant = await connection.query("SELECT prod_cantidad FROM tbl_productos WHERE prod_estado = 1 AND prod_id = ?", prod_id);

        const prod_cantidad = Number(prodCant[0]["prod_cantidad"]) + entr_cant;
        await connection.query("UPDATE tbl_productos set tbl_productos.prod_cantidad = ? WHERE tbl_productos.prod_id = ?", [prod_cantidad, prod_id]);

        res.json(resp);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateEntrada = async (req, res) => {
    try {
        const entr_estado = 1;

        const { prod_id, entr_numFact, entr_cant, entr_subtotal, entr_iva, entr_total, entr_precUnit, entr_fecha } = req.body;

        const actentrada = { prod_id, entr_numFact, entr_cant, entr_subtotal, entr_iva, entr_total, entr_precUnit, entr_fecha, entr_estado };

        const connection = await getConnection();

        //const prodCant = await connection.query("SELECT prod_cantidad FROM tbl_productos WHERE prod_estado = 1 AND prod_id = ?", prodAnt_id);
        //const restAnt = Number(prodCant[0]["prod_cantidad"]) - prodStockAnt;
        //await connection.query("UPDATE tbl_productos set tbl_productos.prod_cantidad = ? WHERE tbl_productos.prod_id = ?", [restAnt, prodAnt_id]);

        const result = await connection.query("UPDATE tbl_entradas set ? WHERE entr_estado = 1 AND entr_numFact = ?", [actentrada, entr_numFact]);
        const prodCant = await connection.query("SELECT prod_cantidad FROM tbl_productos WHERE prod_estado = 1 AND prod_id = ?", prod_id);

        const prod_cantidad = Number(prodCant[0]["prod_cantidad"]) + entr_cant;
        await connection.query("UPDATE tbl_productos set tbl_productos.prod_cantidad = ? WHERE tbl_productos.prod_id = ?", [prod_cantidad, prod_id]);


        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const metod = { getEntrada, buscarEntrada, addEntrada, updateEntrada, verFactura };