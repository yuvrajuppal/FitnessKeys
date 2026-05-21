import { Router } from "express";
import {
  CreateWorkout,
  GetAllWorkouts,
  GetWorkoutById,
  GetWorkoutsByCategory,
  UpdateWorkout,
  DeleteWorkout,
} from "../controller/Workout.controller.js";
import { upload } from "../config/multer.js";
import { adminAuth } from "../middleware/adminmiddleware.js";

const router = Router();

//admin
router.post("/CreateWorkout",adminAuth, upload.single("image"), CreateWorkout);
router.put("/UpdateWorkout/:id",adminAuth, upload.single("image"), UpdateWorkout);
router.delete("/DeleteWorkout/:id",adminAuth, DeleteWorkout);



router.get("/GetAllWorkouts", GetAllWorkouts);
router.get("/GetWorkoutById/:id", GetWorkoutById);
router.get("/GetWorkoutsByCategory/:categoryId", GetWorkoutsByCategory);


export default router;
