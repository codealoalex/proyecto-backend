import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { FRONT_PORT } from "../helpers/config.js";
import { verificarTokenResidente } from "../helpers/verificarTokenAdmin.js";
import { ResidenteController } from "../controller/residente.controller.js";

const Residente = new ResidenteController();
export const router = express.Router();

const corsOptions = {
  origin: `http://localhost:${FRONT_PORT}`,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

router.use(cookieParser());
router.use(cors(corsOptions));

router.get("/datos-residente", verificarTokenResidente, Residente.obtenerDatosResidente);
