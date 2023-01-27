import { Router } from "express";
import { metod as entradasControler } from "../controller/entradas.controler";

const router = Router();

router.get("/", entradasControler.getEntrada);
router.post("/insert", entradasControler.addEntrada);
router.post("/verFact", entradasControler.verFactura);
router.put("/update", entradasControler.updateEntrada);

export default router;