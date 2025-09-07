import express from "express";
import cors from "cors";
import { FRONT_PORT } from "../helpers/config.js";

export const router = express.Router();

const corsOptions = {
  origin: `http://localhost:${FRONT_PORT}`,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

router.use(cors(corsOptions));

const notFound = (req, res) => {
  res.status(404).json({
    message: "La pagina con el servicio no existe",
  });
};

router.post("/{*ruta}", notFound);
router.get("/{*ruta}", notFound);
router.delete("/{*ruta}", notFound);
router.put("/{*ruta}", notFound);
router.patch("/{*ruta}", notFound);
