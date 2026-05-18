import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import cookieParser from "cookie-parser";
import cors from "cors";

app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      return callback(null, origin);
    },
    credentials: true,
  }),
);

import swaggerUi from "swagger-ui-express";
import fs from "fs";
import categoryRoutes from "./routes/Category.routes.js";
import workoutRoutes from "./routes/Workout.routes.js";

const swaggerData = JSON.parse(
  fs.readFileSync("./swagger-output.json", "utf-8"),
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerData));

app.use("/uploads", express.static("uploads"));

app.use("/api/categories", categoryRoutes);
app.use("/api/workouts", workoutRoutes);

export default app;
