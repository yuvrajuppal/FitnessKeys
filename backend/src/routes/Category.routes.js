import { Router } from "express";
import {
  CreateCategory,
  GetAllCategories,
  getCategorybyid,
  UpdateCategory,
  DeleteCategory,
} from "../controller/Category.controller.js";
import { upload } from "../config/multer.js";

const router = Router();

router.post("/CreateCategory", upload.single("image"), CreateCategory);
router.get("/GetAllCategories", GetAllCategories);
router.get("/GetCategoryById/:id", getCategorybyid);
router.put("/UpdateCategory/:id", upload.single("image"), UpdateCategory);
router.delete("/DeleteCategory/:id", DeleteCategory);

export default router;
