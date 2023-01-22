import { Router } from "express";
import { metod as cajaControler } from "../controller/caja.controler";

const router = Router();

router.get("/", cajaControler.getCaja);
router.get("/dia", cajaControler.getDiaCaja);
router.post("/insert", cajaControler.addCaja);
router.put("/update", cajaControler.updateCaja);
router.put("/delete", cajaControler.deleteCaja);

export default router;
