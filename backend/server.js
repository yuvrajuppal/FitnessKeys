// src/server.js
import "dotenv/config";

// src/app.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import fs from "fs";

// src/routes/Category.routes.js
import { Router } from "express";

// src/controller/Category.controller.js
import { PrismaClient } from "#prisma";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
var prisma = new PrismaClient({
  adapter: new PrismaMariaDb(process.env.DATABASE_URL)
});
var CreateCategory = async (req, res) => {
  try {
    const { name, showindex } = req.body;
    const file = req.file;
    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "Category name is required" });
    }
    const imageUrl = file ? "uploads/" + file.filename : null;
    const category = await prisma.category.create({
      data: {
        name: name.trim(),
        imageUrl,
        Showindex: showindex ? parseInt(showindex, 10) : 0
      }
    });
    return res.status(201).json({ ...category, Showindex: Number(category.Showindex) });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Category with this name already exists" });
    }
    console.error("CreateCategory error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
var GetAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { Showindex: "asc" }
    });
    return res.status(200).json(categories.map((c) => ({ ...c, Showindex: Number(c.Showindex) })));
  } catch (error) {
    console.error("GetAllCategories error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
var UpdateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, showindex } = req.body;
    const file = req.file;
    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Category not found" });
    }
    const data = {};
    if (name && typeof name === "string" && name.trim()) {
      data.name = name.trim();
    }
    if (file) {
      data.imageUrl = "uploads/" + file.filename;
    }
    if (showindex !== void 0 && showindex !== "") {
      data.Showindex = parseInt(showindex, 10);
    }
    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }
    const category = await prisma.category.update({
      where: { id },
      data
    });
    return res.status(200).json({ ...category, Showindex: Number(category.Showindex) });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Category with this name already exists" });
    }
    console.error("UpdateCategory error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
var DeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Category not found" });
    }
    await prisma.category.delete({ where: { id } });
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("DeleteCategory error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
var getCategorybyid = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.status(200).json({ ...category, Showindex: Number(category.Showindex) });
  } catch (error) {
    console.error("getCategorybyid error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// src/config/multer.js
import multer from "multer";
import path from "path";
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
var upload = multer({ storage });

// src/middleware/adminmiddleware.js
import { PrismaClient as PrismaClient2 } from "#prisma";
import { PrismaMariaDb as PrismaMariaDb2 } from "@prisma/adapter-mariadb";
import jwt from "jsonwebtoken";
var prisma2 = new PrismaClient2({
  adapter: new PrismaMariaDb2(process.env.DATABASE_URL)
});
var adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.FitnessKeysAdminLogin;
    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await prisma2.adminUser.findUnique({
      where: { id: decoded.id }
    });
    if (!admin) {
      return res.status(401).json({ error: "Admin no longer exists" });
    }
    req.admin = { id: admin.id, admin_username: admin.admin_username, role: admin.role };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// src/routes/Category.routes.js
var router = Router();
router.post("/CreateCategory", adminAuth, upload.single("image"), CreateCategory);
router.put("/UpdateCategory/:id", adminAuth, upload.single("image"), UpdateCategory);
router.delete("/DeleteCategory/:id", adminAuth, DeleteCategory);
router.get("/GetAllCategories", GetAllCategories);
router.get("/GetCategoryById/:id", getCategorybyid);
var Category_routes_default = router;

// src/routes/Workout.routes.js
import { Router as Router2 } from "express";

// src/controller/Workout.controller.js
import { PrismaClient as PrismaClient3 } from "#prisma";
import { PrismaMariaDb as PrismaMariaDb3 } from "@prisma/adapter-mariadb";
var prisma3 = new PrismaClient3({
  adapter: new PrismaMariaDb3(process.env.DATABASE_URL)
});
var CreateWorkout = async (req, res) => {
  try {
    const { name, categoryId, videolink } = req.body;
    const file = req.file;
    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "Workout name is required" });
    }
    if (!categoryId) {
      return res.status(400).json({ error: "Category is required" });
    }
    const category = await prisma3.category.findUnique({
      where: { id: categoryId }
    });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    const imageUrl = file ? "uploads/" + file.filename : null;
    const workout = await prisma3.workout.create({
      data: {
        name: name.trim(),
        categoryId,
        imageUrl,
        videolink: videolink || ""
      }
    });
    return res.status(201).json(workout);
  } catch (error) {
    console.error("CreateWorkout error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
var GetAllWorkouts = async (req, res) => {
  try {
    const workouts = await prisma3.workout.findMany({
      orderBy: { createdAt: "desc" }
    });
    return res.status(200).json(workouts);
  } catch (error) {
    console.error("GetAllWorkouts error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
var GetWorkoutById = async (req, res) => {
  try {
    const { id } = req.params;
    const workout = await prisma3.workout.findUnique({ where: { id } });
    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }
    return res.status(200).json(workout);
  } catch (error) {
    console.error("GetWorkoutById error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
var GetWorkoutsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const workouts = await prisma3.workout.findMany({
      where: { categoryId },
      orderBy: { createdAt: "desc" }
    });
    return res.status(200).json(workouts);
  } catch (error) {
    console.error("GetWorkoutsByCategory error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
var UpdateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId, videolink } = req.body;
    const file = req.file;
    const existing = await prisma3.workout.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Workout not found" });
    }
    const data = {};
    if (name && typeof name === "string" && name.trim()) {
      data.name = name.trim();
    }
    if (categoryId) {
      const category = await prisma3.category.findUnique({
        where: { id: categoryId }
      });
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      data.categoryId = categoryId;
    }
    if (file) {
      data.imageUrl = "uploads/" + file.filename;
    }
    if (videolink !== void 0) {
      data.videolink = videolink;
    }
    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }
    const workout = await prisma3.workout.update({
      where: { id },
      data
    });
    return res.status(200).json(workout);
  } catch (error) {
    console.error("UpdateWorkout error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
var DeleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma3.workout.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Workout not found" });
    }
    await prisma3.workout.delete({ where: { id } });
    return res.status(200).json({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error("DeleteWorkout error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// src/routes/Workout.routes.js
var router2 = Router2();
router2.post("/CreateWorkout", adminAuth, upload.single("image"), CreateWorkout);
router2.put("/UpdateWorkout/:id", adminAuth, upload.single("image"), UpdateWorkout);
router2.delete("/DeleteWorkout/:id", adminAuth, DeleteWorkout);
router2.get("/GetAllWorkouts", GetAllWorkouts);
router2.get("/GetWorkoutById/:id", GetWorkoutById);
router2.get("/GetWorkoutsByCategory/:categoryId", GetWorkoutsByCategory);
var Workout_routes_default = router2;

// src/routes/AdminUser.routes.js
import { Router as Router3 } from "express";

// src/controller/adminuser.controller.js
import { PrismaClient as PrismaClient4 } from "#prisma";
import { PrismaMariaDb as PrismaMariaDb4 } from "@prisma/adapter-mariadb";
import bcrypt from "bcrypt";
import jwt2 from "jsonwebtoken";

// src/config/Prodmode.js
var Prodmode = true;

// src/controller/adminuser.controller.js
var prisma4 = new PrismaClient4({
  adapter: new PrismaMariaDb4(process.env.DATABASE_URL)
});
var CreateAdmin = async (req, res) => {
  try {
    const { admin_username, password, name, role } = req.body;
    if (!admin_username || typeof admin_username !== "string" || !admin_username.trim()) {
      return res.status(400).json({ error: "admin_username is required" });
    }
    if (!password || typeof password !== "string" || !password.trim()) {
      return res.status(400).json({ error: "password is required" });
    }
    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "name is required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await prisma4.adminUser.create({
      data: {
        admin_username: admin_username.trim(),
        password: hashedPassword,
        name: name.trim(),
        role: role || "admin"
      }
    });
    const { password: _, ...adminData } = admin;
    return res.status(201).json(adminData);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Admin username already exists" });
    }
    console.error("CreateAdmin error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
var AdminLogin = async (req, res) => {
  try {
    const { admin_username, password } = req.body;
    if (!admin_username || typeof admin_username !== "string" || !admin_username.trim()) {
      return res.status(400).json({ error: "admin_username is required" });
    }
    if (!password || typeof password !== "string" || !password.trim()) {
      return res.status(400).json({ error: "password is required" });
    }
    const admin = await prisma4.adminUser.findUnique({
      where: { admin_username: admin_username.trim() }
    });
    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt2.sign(
      { id: admin.id, admin_username: admin.admin_username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    const { password: _, ...adminData } = admin;
    res.cookie("FitnessKeysAdminLogin", token, {
      httpOnly: true,
      secure: Prodmode,
      sameSite: Prodmode ? "None" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1e3
    });
    return res.status(200).json({ ...adminData, token });
  } catch (error) {
    console.error("AdminLogin error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
var CheckAdminLogin = async (req, res) => {
  try {
    const { password: _, ...adminData } = await prisma4.adminUser.findUnique({
      where: { id: req.admin.id }
    });
    return res.status(200).json(adminData);
  } catch (error) {
    console.error("CheckUserLogin error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
var LogoutAdmin = async (req, res) => {
  try {
    res.cookie("FitnessKeysAdminLogin", "", {
      httpOnly: true,
      secure: Prodmode,
      sameSite: Prodmode ? "None" : "lax",
      maxAge: 0
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("LogoutAdmin error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// src/routes/AdminUser.routes.js
var router3 = Router3();
router3.post("/CreateAdmin", CreateAdmin);
router3.post("/AdminLogin", AdminLogin);
router3.get("/CheckUserLogin", adminAuth, CheckAdminLogin);
router3.get("/LogoutAdmin", adminAuth, LogoutAdmin);
var AdminUser_routes_default = router3;

// src/app.js
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      return callback(null, origin);
    },
    credentials: true
  })
);
var swaggerData = JSON.parse(
  fs.readFileSync("./swagger-output.json", "utf-8")
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerData));
app.use("/uploads", express.static("uploads"));
app.use("/categories", Category_routes_default);
app.use("/workouts", Workout_routes_default);
app.use("/admin", AdminUser_routes_default);
var app_default = app;

// src/server.js
app_default.get("/", (req, res) => {
  res.send("server Started");
});
var ServerPort = process.env.SERVERPORT;
app_default.listen(ServerPort, () => {
  console.log(`server started at ${ServerPort}`);
});
