import jwt from "jsonwebtoken";
import { JWT_SECRET_RESIDENTE } from "../helpers/config.js";
import { ResidenteModel } from "../model/residente.model.js";

const Residente = new ResidenteModel();

export class ResidenteController {
  constructor() {}
  async loginResidente(req, res) {
    const { usuario, clave } = req.body;
    try {
      const data_usuario = await Residente.loginResidente(usuario, clave);
      const token = jwt.sign(
        {
          id_usuario: data_usuario.id_residente,
          tipo_usuario: "residente",
        },
        JWT_SECRET_RESIDENTE
      );
      return res
        .cookie("cookie_loginr", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 15,
        })
        .json({
          message: "El residente fue iniciado correctamente",
          user: data_usuario,
          token: token,
        });
    } catch (e) {
      if (e.code == "ERR_RES_NOT_EXIST")
        return res.status(404).json({ message: e.message });
      if (e.code == "FATAL_RES_NOT_PASSWORD")
        return res.status(404).json({
          message: e.message,
        });
      return res.status(500).json({
        message: "Error en el servidor",
      });
    }
  }

  async obtenerDatosResidente(req, res) {
    try {
      const token = req.cookies.cookie_loginr;
      const { id_usuario } = jwt.verify(token, JWT_SECRET_RESIDENTE);
      const response = await Residente.obtenerDatosResidente(id_usuario);
      return res.status(200).json({
        message: 'Datos obtenidos de forma correcta',
        datos: response
      })
    } catch (e) {
      if (e.code == "ERR_RES_NOT_EXIST") return res.status(404).json({
        message: e.message
      })
      return res.status(500).json({
        message: "Error en el servidor"
      })
    }
  }
}
