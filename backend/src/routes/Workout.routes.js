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

const router = Router();

router.post("/CreateWorkout", upload.single("image"), CreateWorkout);
router.get("/GetAllWorkouts", GetAllWorkouts);
router.get("/GetWorkoutById/:id", GetWorkoutById);
router.get("/GetWorkoutsByCategory/:categoryId", GetWorkoutsByCategory);
router.put("/UpdateWorkout/:id", upload.single("image"), UpdateWorkout);
router.delete("/DeleteWorkout/:id", DeleteWorkout);

export default router;
