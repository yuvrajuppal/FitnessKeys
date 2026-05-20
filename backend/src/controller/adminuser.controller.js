import { PrismaClient } from "#prisma";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Prodmode } from "../config/Prodmode.js";
const prisma = new PrismaClient({
  adapter: new PrismaMariaDb(process.env.DATABASE_URL),
});

export const CreateAdmin = async (req, res) => {
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

    const admin = await prisma.adminUser.create({
      data: {
        admin_username: admin_username.trim(),
        password: hashedPassword,
        name: name.trim(),
        role: role || "admin",
      },
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

export const AdminLogin = async (req, res) => {
  try {
    const { admin_username, password } = req.body;

    if (!admin_username || typeof admin_username !== "string" || !admin_username.trim()) {
      return res.status(400).json({ error: "admin_username is required" });
    }
    if (!password || typeof password !== "string" || !password.trim()) {
      return res.status(400).json({ error: "password is required" });
    }

    const admin = await prisma.adminUser.findUnique({
      where: { admin_username: admin_username.trim() },
    });
    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, admin_username: admin.admin_username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    const { password: _, ...adminData } = admin;

    res.cookie("FitnessKeysAdminLogin", token, {
      httpOnly: true,
      secure: Prodmode,
      sameSite: Prodmode ? "None" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ ...adminData, token });
  } catch (error) {
    console.error("AdminLogin error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const CheckAdminLogin = async (req, res) => {
  try {
    const { password: _, ...adminData } = await prisma.adminUser.findUnique({
      where: { id: req.admin.id },
    });
    return res.status(200).json(adminData);
  } catch (error) {
    console.error("CheckUserLogin error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const LogoutAdmin = async (req, res) => {
  try {
    res.cookie("FitnessKeysAdminLogin", "", {
      httpOnly: true,
      secure: Prodmode,
      sameSite: Prodmode ? "None" : "lax",
      maxAge: 0,
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("LogoutAdmin error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};