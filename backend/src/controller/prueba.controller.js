import {getConnection} from "./../database/database"

const getLogins = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM tbl_login");
        res.json(result);   
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getLogin = async (req, res) => {
    try {
        const {id} = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM tbl_login WHERE log_id=" + id);
        res.json(result);   
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addLogin = async (req, res) => {
    try {
        const log_estado = 1;
        const {log_correo, log_password} = req.body;
        const login = {log_correo, log_password, log_estado};
        if(log_correo == undefined){
            res.status(400);
            res.send("log_correo not defined");
        }
        if(log_password == undefined){
            res.status(400);
            res.send("log_password not defined");
        }
        const connection = await getConnection();
        // Esta consulta si nos devuelve por defecto el id del insert
        const result = await connection.query("INSERT INTO tbl_login SET ?", login);
        console.log(result);
        res.send("ENVIADO CORRECTO");
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateLogin = async (req, res) => {
    try {
        const {log_id} = req.params;
        const log_estado = 1;
        const {log_correo, log_password} = req.body;
        const login = {log_id, log_correo, log_password, log_estado};
        if(log_id == undefined){
            res.status(400);
            res.send("log_id not defined (param)");
        }
        if(log_correo == undefined){
            res.status(400);
            res.send("log_correo not defined (body)");
        }
        if(log_password == undefined){
            res.status(400);
            res.send("log_password not defined (body)");
        }
        const connection = await getConnection();
        const result = await connection.query("UPDATE tbl_login SET ? WHERE log_id = ?", [login, log_id]);
        console.log(result);
        res.send("ACTUALIZADO CORRECTO");
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteLogin = async (req, res) => {
    try {
        const {id} = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM tbl_login WHERE log_id=" + id);
        console.log(result);
        res.send("ELIMINADO CORRECTO");
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getLogins,
    getLogin,
    addLogin,
    updateLogin,
    deleteLogin,
};