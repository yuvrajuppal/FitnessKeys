import { Router } from "express";
import { CreateAdmin, AdminLogin, CheckAdminLogin, LogoutAdmin } from "../controller/adminuser.controller.js";
import { adminAuth } from "../middleware/adminmiddleware.js";

const router = Router();

router.post("/CreateAdmin", CreateAdmin);
router.post("/AdminLogin", AdminLogin);
router.get("/CheckUserLogin", adminAuth, CheckAdminLogin);
router.get("/LogoutAdmin", adminAuth, LogoutAdmin);

export default router;
