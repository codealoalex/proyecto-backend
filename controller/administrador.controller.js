import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_ADMIN } from "../helpers/config.js";
import { AdministradorModel } from "../model/administrador.model.js";
import { CustomError } from "../helpers/customError.js";

const Administrador = new AdministradorModel();

export class AdministradorController {
  constructor() {}
  async loginAdministrador(req, res) {
    const { usuario, clave } = req.body;
    try {
      const data_usuario = await Administrador.loginAdministrador(
        usuario,
        clave
      );
      const token = jwt.sign(
        {
          id_usuario: data_usuario.correo_administrador,
          tipo_usuario: "administrador",
        },
        JWT_SECRET_ADMIN
      );
      return res
        .cookie("cookie_logina", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 15,
        })
        .json({
          message: "El administrador fue iniciado correctamente",
          user: data_usuario,
          token: token,
        });
    } catch (e) {
      if (e.code == "ERR_ADMIN_NOT_EXIST")
        return res.status(404).json({ message: e.message });
      if (e.code == "FATAL_ADMIN_NOT_PASSWORD")
        return res.status(404).json({
          message: e.message,
        });
      return res.status(500).json({
        message: "Error en el servidor",
      });
    }
  }

  async registrarUsuarioAdministrador(req, res) {
    const { id, nombre, paterno, materno, fecha, correo, contacto, clave } =
      req.body;
    const claveHasheada = await bcrypt.hash(clave, 10);
    try {
      const response = await Administrador.registroAdministrador(
        id,
        nombre,
        paterno,
        materno,
        fecha,
        correo,
        contacto,
        claveHasheada
      );
      return res.status(201).json({
        message: "El administrador fue creado de manera exitosa",
      });
    } catch (e) {
      if (e.code == "ERR_ADMIN_ALREADY_EXIST")
        return res.status(400).json({
          message: e.message,
        });
      return res.status(400).json({
        message: "Error al ingresar un nuevo administrador",
      });
    }
  }

  async registrarUsuarioResidente(req, res) {
    const {
      id,
      nombre,
      paterno,
      materno,
      fecha,
      correo,
      contacto,
      clave,
      departamento,
    } = req.body;
    const claveHasheada = await bcrypt.hash(clave, 10);
    try {
      const response = await Administrador.registroResidente(
        id,
        nombre,
        paterno,
        materno,
        fecha,
        correo,
        contacto,
        claveHasheada,
        departamento
      );
      return res.status(201).json({
        message: "El residente fue creado de manera exitosa",
      });
    } catch (e) {
      if (e.code == "ERR_RES_ALREADY_EXIST")
        return res.status(400).json({
          message: e.message,
        });
      if (e.code == "ERR_DPTO_NOT_EXIST")
        return res.status(400).json({
          message: e.message,
        });
      return res.status(400).json({
        message: "Error al ingresar un nuevo residente",
      });
    }
  }

  async registrarUsuario(req, res) {
    const TIPO_USUARIO = ["administrador", "residente"];
    const { tipo } = req.body;
    if (tipo == TIPO_USUARIO[0]) {
      this.registrarUsuarioAdministrador(req, res);
    } else if (tipo == TIPO_USUARIO[1]) {
      this.registrarUsuarioResidente(req, res);
    } else {
      return res.status(400).json({
        message: "No existe este tipo de usuario",
      });
    }
  }

  async obtenerUsuariosResidentes(req, res) {
    try {
      const residentes = await Administrador.obtenerResidentes();
      return res.status(200).json({
        message: "Residentes obtenidos de forma correcta",
        datos: residentes,
      });
    } catch (e) {
      if (e.code == "ERR_NOT_FOUND_RES")
        return res.status(404).json({
          message: e.message,
        });
    }
  }

  async obtenerUsuarioResidente(req, res) {
    const { id } = req.body;
    if (!id)
      return res.status(400).json({
        message: "Debe ingresar el identificador del usuario",
      });
    try {
      const residente = await Administrador.obtenerResidente(id);
      return res.status(200).json({
        message: "Datos obtenidos del residente de forma exitosa",
        datos_residente: residente,
      });
    } catch (e) {
      if (e.code == "ERR_NOT_FOUND_RESU")
        return res.status(404).json({
          message: e.message,
        });
      return res.status(500).json({
        message: "Error en el servidor",
      });
    }
  }

  async actualizarUsuarioResidente(req, res) {
    const { id, fecha, correo, contacto } = req.body;
    if (!id)
      return res.status(400).json({
        message: "Ingrese el idenfitificador del residente",
      });
    try {
      const response = await Administrador.actualizarResidente(
        id,
        correo,
        fecha,
        contacto
      );
      if (response)
        return res.status(201).json({
          message: "Residente actualizado de forma correcta",
        });
    } catch (e) {
      if (e.code == "ERR_PUT_RES")
        return res.status(400).json({
          message: e.message,
        });
      return res.status(500).json({
        message: e.message,
      });
    }
  }

  async eliminarUsuarioResidente(req, res) {
    const { id } = req.body;
    if (!id)
      return res.status(400).json({
        message: "Ingrese el idenfitificador del residente",
      });
    try {
      const response = await Administrador.eliminarResidente(id);
      if (response) return res.status(200).json({
        message: "Usuario eliminado"
      });
    } catch (e) {
      if (e.code == "ERR_DEL_RES") return res.status(400).json({
        message: e.message
      });
      return res.status(500).json({
        message: e.message,
      });
    }
  }
}
