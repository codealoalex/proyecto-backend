import { ResidenteController } from "../residente.controller.js";
import { AdministradorController } from "../administrador.controller.js";

export const loginUser = async (req, res) => {
  const { tipo } = req.body;
  if (tipo == "administrador") {
    const Administrador = new AdministradorController();
    Administrador.loginAdministrador(req, res);
  } else if (tipo == "residente") {
    const Residente = new ResidenteController();
    Residente.loginResidente(req, res);
  } else {
    return res.status(400).json({
      message: "El tipo de usuario no existe, seleccione uno válido",
    });
  };
};
