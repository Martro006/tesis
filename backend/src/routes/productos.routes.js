import { Router } from "express";
import { metod as prodControler } from "../controller/productos.controler";

const router = Router();

router.get("/", prodControler.getProductos);
router.post("/insert", prodControler.addProductos);
router.put("/update", prodControler.updateProductos);
router.put("/delete", prodControler.deletePeoductos);

export default router;
