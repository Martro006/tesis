import { getConnection } from "../database/database";

const getCaja = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM tbl_caja WHERE caj_estado = 1");
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getDiaCaja = async (req, res) => {
    try {
        const connection = await getConnection();
        const { caj_fecha } = req.body;        
        const result = await connection.query("SELECT * FROM tbl_caja WHERE caj_estado = 1 AND caj_fecha = ?", caj_fecha);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addCaja = async (req, res) => {
    try {
        const caj_estado = 1;
        const { caj_fecha, caj_inicio, caj_fin, log_id, caj_depositos, caj_efectivo, caj_transf, caj_tarjeta, caj_cheque, caj_ingresos, caj_retEfect, caj_serbisel, caj_sueldas, caj_egresosFact, caj_egresosNoFac, caj_depositosEgresos, caj_egresos, caj_ingesosEgresos, caj_valorCaja, caj_voucher, caj_total, caj_diferencia } = req.body;
        const caja = { caj_fecha, caj_inicio, caj_fin, log_id, caj_depositos, caj_efectivo, caj_transf, caj_tarjeta, caj_cheque, caj_ingresos, caj_retEfect, caj_serbisel, caj_sueldas, caj_egresosFact, caj_egresosNoFac, caj_depositosEgresos, caj_egresos, caj_ingesosEgresos, caj_valorCaja, caj_voucher, caj_total, caj_diferencia, caj_estado};
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO tbl_caja set ?", caja);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateCaja = async (req, res) => {
    try {
        console.log(req.params);
        const caj_estado = 1;
        const {caj_id, caj_fecha, caj_inicio, caj_fin, log_id, caj_depositos, caj_efectivo, caj_transf, caj_tarjeta, caj_cheque, caj_ingresos, caj_retEfect, caj_serbisel, caj_sueldas, caj_egresosFact, caj_egresosNoFac, caj_depositosEgresos, caj_egresos, caj_ingesosEgresos, caj_valorCaja, caj_voucher, caj_total, caj_diferencia } = req.body;
        const caja = { caj_fecha, caj_inicio, caj_fin, log_id, caj_depositos, caj_efectivo, caj_transf, caj_tarjeta, caj_cheque, caj_ingresos, caj_retEfect, caj_serbisel, caj_sueldas, caj_egresosFact, caj_egresosNoFac, caj_depositosEgresos, caj_egresos, caj_ingesosEgresos, caj_valorCaja, caj_voucher, caj_total, caj_diferencia, caj_estado};
        const connection = await getConnection();
        const result = await connection.query("UPDATE tbl_caja set ? where caj_id = ?", [caja, caj_id]);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteCaja = async (req, res) => {
    try {
        const { caj_id } = req.body;
        const caj_estado = 0;
        const connection = await getConnection();
        const result = await connection.query("UPDATE tbl_caja set caj_estado = ? where caj_id = ?", [caj_estado, caj_id]);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const metod = { getCaja, addCaja, updateCaja, deleteCaja, getDiaCaja };