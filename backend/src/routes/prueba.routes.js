import {Router} from "express";
import { methods as loginController } from "../controller/login.controller";

const router = Router();

router.get("/", loginController.getLogins);
router.get("/:id", loginController.getLogin);
router.post("/", loginController.addLogin);
router.put("/:log_id", loginController.updateLogin);
router.delete("/:id", loginController.deleteLogin);

export default router;