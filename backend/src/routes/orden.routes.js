import { Router } from "express";
import { metod as ordenControler } from "../controller/orden.controler";

const router = Router();

router.get("/", ordenControler.getOrdenes);
router.post("/buscarOrden", ordenControler.buscarOrden);
router.post("/insert", ordenControler.addOrden);
router.put("/update", ordenControler.updateOrden);

export default router;