import { Router } from "express";
import { metod as comprasControler } from "../controller/compras.controler";

const router = Router();

router.get("/", comprasControler.getCompras);
router.get("/dia", comprasControler.getComprasFecha);
router.post("/insert", comprasControler.addCompras);
router.put("/delete", comprasControler.deleteCompras);

export default router;