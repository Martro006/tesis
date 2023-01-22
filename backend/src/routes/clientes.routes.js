import { Router } from "express";
import { metod as clientesControler } from "../controller/clientes.controler";

const router = Router();

router.get("/", clientesControler.getClientes);
router.get("/buscarCli", clientesControler.buscarClientes);
router.post("/insert", clientesControler.addClientes);
router.put("/update", clientesControler.updateClientes);
router.put("/delete", clientesControler.deleteClientes);

export default router;
