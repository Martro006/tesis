import { getConnection } from './../database/database';

const getLogins = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM tbl_login where log_estado = 1");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addLogin = async (req, res) => {
    try {
        const log_estado = 1;
        const { log_correo, log_contra, log_priv } = req.body;
        const usuario = { log_correo, log_contra, log_priv, log_estado };
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO tbl_productos set ", usuario);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const update = async (req, res) => {
    try {
        const log_estado = 1;
        const { log_id, log_correo, log_contra, log_priv } = req.body;
        const usuario = { log_id, log_correo, log_contra, log_priv, log_estado };
        const connection = await getConnection();
        const result = await connection.query("UPDATE tbl_login set ? where log_id = ?", [usuario, log_id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const deleteLogin = async (req, res) => {
    try {
        const { log_id } = req.body;
        const log_estado = 0;
        const connection = await getConnection();
        const result = await connection.query("UPDATE tbl_login set log_estado = ? where log_id = ?", [log_estado, log_id]);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const autenticacion = async (req, res) => {
    try {

        const { log_correo, log_contra } = req.body;
        if (log_correo == null || log_correo == "") {
            res.status(400);
            res.send("log_correo invalido");
        }

        if (log_contra == null || log_contra == "") {
            res.status(400);
            res.send("log_contra invalido");
        }

        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM `tbl_login` WHERE log_correo= ? AND log_contra= ? AND log_estado = 1", [log_correo, log_contra]);

        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const insertUsuario = async (req, res) => {
    try {
        const log_estado = 1;
        const { log_correo, log_contra, log_priv  } = req.body;

        const login = { log_correo, log_contra, log_estado, log_priv };
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO tbl_login SET ?", login);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const methods = {
    autenticacion,
    getLogins,
    update,
    addLogin,
    deleteLogin,
    insertUsuario,
};