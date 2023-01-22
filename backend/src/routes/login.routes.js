import { Router } from "express";
import { methods as LoginController } from "../controller/login.controller";

const router = Router();

// RUTAS DE ACCESO PARA API DE LOGIN
router.get('/', LoginController.getLogins);
router.post('/auth', LoginController.autenticacion);
router.post('/insert', LoginController.insertUsuario);
router.put("/update", LoginController.update);
router.put("/delete", LoginController.deleteLogin);

export default router;