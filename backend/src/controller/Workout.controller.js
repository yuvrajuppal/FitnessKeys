import { PrismaClient } from "#prisma";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
const prisma = new PrismaClient({
  adapter: new PrismaMariaDb(process.env.DATABASE_URL),
});

export const CreateWorkout = async (req, res) => {
  try {
    const { name, categoryId, videolink } = req.body;
    const file = req.file;

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "Workout name is required" });
    }
    if (!categoryId) {
      return res.status(400).json({ error: "Category is required" });
    }

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const imageUrl = file ? "uploads/" + file.filename : null;

    const workout = await prisma.workout.create({
      data: {
        name: name.trim(),
        categoryId,
        imageUrl,
        videolink: videolink || "",
      },
    });

    return res.status(201).json(workout);
  } catch (error) {
    console.error("CreateWorkout error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const GetAllWorkouts = async (req, res) => {
  try {
    const workouts = await prisma.workout.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(workouts);
  } catch (error) {
    console.error("GetAllWorkouts error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const GetWorkoutById = async (req, res) => {
  try {
    const { id } = req.params;

    const workout = await prisma.workout.findUnique({ where: { id } });
    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    return res.status(200).json(workout);
  } catch (error) {
    console.error("GetWorkoutById error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const GetWorkoutsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const workouts = await prisma.workout.findMany({
      where: { categoryId },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(workouts);
  } catch (error) {
    console.error("GetWorkoutsByCategory error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const UpdateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId, videolink } = req.body;
    const file = req.file;

    const existing = await prisma.workout.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Workout not found" });
    }

    const data = {};
    if (name && typeof name === "string" && name.trim()) {
      data.name = name.trim();
    }
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      data.categoryId = categoryId;
    }
    if (file) {
      data.imageUrl = "uploads/" + file.filename;
    }
    if (videolink !== undefined) {
      data.videolink = videolink;
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    const workout = await prisma.workout.update({
      where: { id },
      data,
    });

    return res.status(200).json(workout);
  } catch (error) {
    console.error("UpdateWorkout error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const DeleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.workout.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Workout not found" });
    }

    await prisma.workout.delete({ where: { id } });
    return res.status(200).json({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error("DeleteWorkout error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
