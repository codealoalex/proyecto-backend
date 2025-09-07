import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { loginUser } from "../controller/login-controller/login.controller.js";
import { FRONT_PORT } from "../helpers/config.js";
import { noToken, verificarTokenAdmin } from "../helpers/verificarTokenAdmin.js";
import { registroControladorAdmin } from "../controller/administrador.controller.js";

export const router = express.Router();

const corsOptions = {
  origin: `http://localhost:${FRONT_PORT}`,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

router.use(cookieParser());
router.use(cors(corsOptions));


router.post("/login", loginUser); //Seria interesante añadir un middleware que valide la existencia de token con noToken
router.post("/registrar", verificarTokenAdmin, registroControladorAdmin);
