import bcrypt from "bcrypt";
import { registroModelAdmin, registroModelResidente } from "../model/administrador.model.js";

export const registroControladorAdmin = async (req, res) => {
  const TIPO_USUARIO = ["administrador", "residente"];
  const { id, nombre, paterno, materno, fecha, correo, contacto, clave, tipo, departamento} = req.body;
  const claveHasheada = await bcrypt.hash(clave, 10);
  if (tipo == TIPO_USUARIO[0]) {
    try {
      const response = await registroModelAdmin(
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
      console.log(e);
      return res.status(400).json({
        message: "Error al ingresar un nuevo administrador",
      });
    }
  } else if (tipo == TIPO_USUARIO[1]) {
    try {
      const response = await registroModelResidente(
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
      if (e.code == "ERR_DPTO_NOT_EXIST") return res.status(400).json({
        message: e.message
      });
        return res.status(400).json({
          message: "Error al ingresar un nuevo residente",
        });
    }
  } else {
    return res.status(400).json({
      message: "No existe este tipo de usuario",
    });
  }
};
