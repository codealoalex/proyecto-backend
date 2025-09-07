import bcrypt from "bcrypt";
import { bd_pool } from "../bd_connection/bdPool.js";
import { CustomError } from "../helpers/customError.js";

export class ResidenteModel {
  constructor() {}
  async loginResidente(usuario, clave) {
    try {
      const query_residente =
        "SELECT id_residente, nombre_residente, paterno_residente, materno_residente, correo_residente, clave_residente FROM residente WHERE id_residente = $1";
      const parameters = [usuario];
      const residente = await bd_pool.query(query_residente, parameters);
      if (residente.rowCount == 0)
        throw new CustomError(
          "El residente no existe, revise su usuario",
          "ERR_RES_NOT_EXIST",
          ""
        );
      const residenteData = residente.rows[0];
      const { clave_residente } = residenteData;
      if (!(await bcrypt.compare(clave, clave_residente)))
        throw new CustomError(
          "Contraseña incorrecta",
          "FATAL_RES_NOT_PASSWORD",
        );
      const residenteCopia = { ...residenteData };
      delete residenteCopia.clave_residente;
      return residenteCopia;
    } catch (e) {
      throw e;
    }
  }

  async obtenerDatosResidente(id) {
    try {
      const query = 'SELECT * FROM datos_residente ($1)';
      const parametes = [id];
      const response = await bd_pool.query(query, parametes);
      if (!response.rowCount) throw new CustomError(
          "El residente no existe. En caso de tratarse de un error, comuniquese con un administrador",
          "ERR_RES_NOT_EXIST",
        );
      const datosResidente = response.rows[0];
      return datosResidente;
    } catch (e) {
      throw e;
    }
  }
}
