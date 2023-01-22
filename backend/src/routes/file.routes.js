import { Router } from "express";
import { methods as FileController } from "../controller/file.controller";

const router = Router();

// RUTAS DE ACCESO PARA API DE LOGIN
router.post('/upload', FileController.updateFile);

export default router;