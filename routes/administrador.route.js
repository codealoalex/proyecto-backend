import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { FRONT_PORT } from "../helpers/config.js";
import { verificarTokenAdmin } from "../helpers/verificarTokenAdmin.js";
import { AdministradorController } from "../controller/administrador.controller.js";

export const router = express.Router();

const corsOptions = {
  origin: `http://localhost:${FRONT_PORT}`,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

const Administrador = new AdministradorController();

router.use(cookieParser());
router.use(cors(corsOptions));


router.get('/obtener-residentes', verificarTokenAdmin, Administrador.obtenerUsuariosResidentes);
router.get('/obtener-residente', verificarTokenAdmin, Administrador.obtenerUsuarioResidente);
router.post("/registrar-residente", verificarTokenAdmin, (req, res) =>
  Administrador.registrarUsuario(req, res)
);
router.put('/actualizar-residente', verificarTokenAdmin, Administrador.actualizarUsuarioResidente);
router.delete('/eliminar-residente', verificarTokenAdmin, Administrador.eliminarUsuarioResidente);

