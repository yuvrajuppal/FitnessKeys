import { Router } from "express";
import {
  CreateCategory,
  GetAllCategories,
  getCategorybyid,
  UpdateCategory,
  DeleteCategory,
} from "../controller/Category.controller.js";
import { upload } from "../config/multer.js";
import { adminAuth } from "../middleware/adminmiddleware.js";
const router = Router();

router.post("/CreateCategory",adminAuth, upload.single("image"), CreateCategory);
router.put("/UpdateCategory/:id",adminAuth, upload.single("image"), UpdateCategory);
router.delete("/DeleteCategory/:id",adminAuth, DeleteCategory);


router.get("/GetAllCategories", GetAllCategories);
router.get("/GetCategoryById/:id", getCategorybyid);


export default router;
