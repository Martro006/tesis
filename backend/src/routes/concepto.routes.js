import { Router } from "express";
import { metod as conceptoControler } from "../controller/concepto.controler";

const router = Router();

router.get("/", conceptoControler.getConcepto);
router.get("/insert", conceptoControler.addConcepto);
router.post("/update", conceptoControler.updateConcepto);
router.put("/delete", conceptoControler.deleteConcepto);

export default router;