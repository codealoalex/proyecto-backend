import jwt from "jsonwebtoken";
import {
  loginModelAdministrador,
  loginModelResidente,
} from "../../model/login-model/login.model.js";

import {
  JWT_SECRET_ADMIN,
  JWT_SECRET_RESIDENTE,
} from "../../helpers/config.js";

export const loginUser = async (req, res) => {
  const { usuario, clave, tipo } = req.body;
  if (tipo == "administrador") {
    try {
      const data_usuario = await loginModelAdministrador(usuario, clave);
      const token = jwt.sign(
        data_usuario.correo_administrador,
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
        return res
          .status(404)
          .json({ message: e.message });
      if (e.code == "FATAL_ADMIN_NOT_PASSWORD") return res.status(404).json({
        message: e.message
      })
      return res.status(500).json({
        message: "Error en el servidor",
      });
    }
  } else if (tipo == "residente") {
    try {
      const data_usuario = await loginModelResidente(usuario, clave);
      const token = jwt.sign(
        data_usuario.correo_residente,
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
        return res
          .status(404)
          .json({ message: e.message});
      if (e.code == "FATAL_RES_NOT_PASSWORD")
        return res.status(404).json({
          message: e.message,
        });
      return res.status(500).json({
        message: "Error en el servidor",
      });
    }
  } else {
    return res.status(400).json({
      message: "El tipo de usuario no existe, seleccione uno válido",
    });
  }
};
