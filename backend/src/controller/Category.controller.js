import { PrismaClient } from "#prisma";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
const prisma = new PrismaClient({
  adapter: new PrismaMariaDb(process.env.DATABASE_URL),
});

export const CreateCategory = async (req, res) => {
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
        Showindex: showindex ? parseInt(showindex, 10) : 0,
      },
    });

    return res
      .status(201)
      .json({ ...category, Showindex: Number(category.Showindex) });
  } catch (error) {
    if (error.code === "P2002") {
      return res
        .status(409)
        .json({ error: "Category with this name already exists" });
    }
    console.error("CreateCategory error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const GetAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { Showindex: "asc" },
    });
    return res
      .status(200)
      .json(categories.map((c) => ({ ...c, Showindex: Number(c.Showindex) })));
  } catch (error) {
    console.error("GetAllCategories error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const UpdateCategory = async (req, res) => {
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
    if (showindex !== undefined && showindex !== "") {
      data.Showindex = parseInt(showindex, 10);
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    const category = await prisma.category.update({
      where: { id },
      data,
    });

    return res
      .status(200)
      .json({ ...category, Showindex: Number(category.Showindex) });
  } catch (error) {
    if (error.code === "P2002") {
      return res
        .status(409)
        .json({ error: "Category with this name already exists" });
    }
    console.error("UpdateCategory error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const DeleteCategory = async (req, res) => {
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

export const getCategorybyid = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res
      .status(200)
      .json({ ...category, Showindex: Number(category.Showindex) });
  } catch (error) {
    console.error("getCategorybyid error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
