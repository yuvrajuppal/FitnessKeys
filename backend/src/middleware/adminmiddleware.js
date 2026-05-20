import { PrismaClient } from "#prisma";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient({
  adapter: new PrismaMariaDb(process.env.DATABASE_URL),
});

export const adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.FitnessKeysAdminLogin;
    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await prisma.adminUser.findUnique({
      where: { id: decoded.id },
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
