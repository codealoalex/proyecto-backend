import bcrypt from "bcrypt";
import { bd_pool } from "../../bd_connection/bdPool.js";
import { CustomError } from "../../helpers/customError.js";

export const loginModelAdministrador = async (username, password) => {
  try {
    const query_administrador =
      "SELECT id_administrador, nombre_administrador, paterno_administrador, materno_administrador, correo_administrador, clave_administrador FROM administrador WHERE id_administrador = $1";
    const parameters = [username];
    const administrador = await bd_pool.query(query_administrador, parameters);
    if (administrador.rowCount == 0)
      throw new CustomError(
        "El administrador no existe",
        "ERR_ADMIN_NOT_EXIST",
        ""
      );
    const administradorData = administrador.rows[0];
    const { clave_administrador } = administradorData;
    if (!(await bcrypt.compare(password, clave_administrador)))
      throw new CustomError(
        "Contraseña incorrecta",
        "FATAL_ADMIN_NOT_PASSWORD",
        ""
      );
    const administradorCopia = { ...administradorData };
    delete administradorCopia.clave_administrador;
    return administradorCopia;
  } catch (e) {
    throw e;
  }
};

export const loginModelResidente = async (username, password) => {
  try {
    const query_residente =
      "SELECT id_residente, nombre_residente, paterno_residente, materno_residente, correo_residente, clave_residente FROM residente WHERE id_residente = $1";
    const parameters = [username];
    const residente = await bd_pool.query(query_residente, parameters);
    if (residente.rowCount == 0)
      throw new CustomError("El residente no existe, revise su usuario", "ERR_RES_NOT_EXIST", "");
    const residenteData = residente.rows[0];
    const { clave_residente } = residenteData;
    if (!(await bcrypt.compare(password, clave_residente)))
      throw new CustomError(
        "Contraseña incorrecta",
        "FATAL_RES_NOT_PASSWORD",
        ""
      );
    const residenteCopia = { ...residenteData };
    delete residenteCopia.clave_residente;
    return residenteCopia;
  } catch (e) {
    throw e;
  }
};
