import { getConnection } from "../database/database";

const getOrdenes = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM tbl_orden JOIN tbl_clientes WHERE tbl_orden.cli_id = tbl_clientes.cli_id ORDER BY tbl_orden.ord_id ASC");
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const buscarOrden = async (req, res) => {
    try {
        const { dato } = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM tbl_orden JOIN tbl_clientes WHERE tbl_orden.cli_id = tbl_clientes.cli_id AND tbl_orden.ord_fecha like ? or tbl_clientes.cli_nombres like ? ORDER BY tbl_orden.ord_id ASC", ["%" + dato + "%", "%" + dato + "%"]);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addOrden = async (req, res) => {
    try {

        const connection = await getConnection();

        const ord_estado = 1;
        const { cli_dni, ord_fecha, ord_odEsfera, ord_oiEsfera, ord_odCilindro, ord_oiCilindro, ord_odEje, ord_oiEje, ord_odDnp, ord_oiDnp,
            ord_adicion, ord_altura, ord_armazon, ord_material, ord_tipo, ord_clase, ord_valorTotal, ord_abono, ord_saldo, ord_observ,
            ord_formaPago, ord_banc, ord_numCheqTrans, ord_codAsesor } = req.body;

        const resp = await connection.query("SELECT tbl_clientes.cli_id FROM tbl_clientes WHERE tbl_clientes.cli_dni = ?", cli_dni);

        const cli_id = resp[0]["cli_id"];
//
        //const prod = await connection.query("SELECT tbl_clientes.cli_id FROM tbl_clientes WHERE tbl_clientes.cli_dni = ?", cli_dni);
//
        //const cli_id = prod[0]["cli_id"];
//
        const orden = {
            cli_id, ord_fecha, ord_odEsfera, ord_oiEsfera, ord_odCilindro, ord_oiCilindro, ord_odEje, ord_oiEje, ord_odDnp, ord_oiDnp,
            ord_adicion, ord_altura, ord_armazon, ord_material, ord_tipo, ord_clase, ord_valorTotal, ord_abono, ord_saldo, ord_observ,
            ord_formaPago, ord_banc, ord_numCheqTrans, ord_codAsesor, ord_estado
        };

        const result = await connection.query("INSERT INTO tbl_orden set ?", orden);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateOrden = async (req, res) => {
    try {

        const connection = await getConnection();
        const ord_estado = 1;


        const { ord_id, cli_dni, ord_fecha, ord_odEsfera, ord_oiEsfera, ord_odCilindro, ord_oiCilindro, ord_odEje, ord_oiEje, ord_odDnp, ord_oiDnp,
            ord_adicion, ord_altura, ord_armazon, ord_material, ord_tipo, ord_clase, ord_valorTotal, ord_abono, ord_saldo, ord_observ,
            ord_formaPago, ord_banc, ord_numCheqTrans, ord_codAsesor } = req.body;

        const resp = await connection.query("SELECT tbl_clientes.cli_id FROM tbl_clientes WHERE tbl_clientes.cli_dni = ?", cli_dni);

        const cli_id = resp[0]["cli_id"];

        const orden = {
            ord_id, cli_id, ord_fecha, ord_odEsfera, ord_oiEsfera, ord_odCilindro, ord_oiCilindro, ord_odEje, ord_oiEje, ord_odDnp, ord_oiDnp,
            ord_adicion, ord_altura, ord_armazon, ord_material, ord_tipo, ord_clase, ord_valorTotal, ord_abono, ord_saldo, ord_observ,
            ord_formaPago, ord_banc, ord_numCheqTrans, ord_codAsesor, ord_estado
        };

        const result = await connection.query("UPDATE tbl_orden set ? where ord_id = ?", [orden, ord_id]);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const metod = { getOrdenes, buscarOrden, addOrden, updateOrden };