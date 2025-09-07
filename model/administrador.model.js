import bcrypt from "bcrypt";
import { bd_pool } from "../bd_connection/bdPool.js";
import { CustomError } from "../helpers/customError.js";

export class AdministradorModel {
  constructor() {}
  async loginAdministrador (usuario, clave){
    try {
      const query_administrador =
        "SELECT id_administrador, nombre_administrador, paterno_administrador, materno_administrador, correo_administrador, clave_administrador FROM administrador WHERE id_administrador = $1";
      const parameters = [usuario];
      const administrador = await bd_pool.query(
        query_administrador,
        parameters
      );
      if (administrador.rowCount == 0)
        throw new CustomError(
          "El administrador no existe",
          "ERR_ADMIN_NOT_EXIST",
          ""
        );
      const administradorData = administrador.rows[0];
      const { clave_administrador } = administradorData;
      if (!(await bcrypt.compare(clave, clave_administrador)))
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

  async registroAdministrador (
    id,
    nombre,
    paterno,
    materno,
    nacimiento,
    correo,
    contacto,
    clave
  ){
    const query =
      "INSERT INTO administrador VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())";
    const parameters = [
      id,
      nombre,
      paterno,
      materno,
      nacimiento,
      correo,
      contacto,
      clave,
    ];
    try {
      const response = await bd_pool.query(query, parameters);
      return response;
    } catch (e) {
      if (e.code == 23505)
        throw new CustomError(
          "El administrador ya existe",
          "ERR_ADMIN_ALREADY_EXIST"
        );
      throw e;
    }
  };

  async registroResidente(
    id,
    nombre,
    paterno,
    materno,
    nacimiento,
    correo,
    contacto,
    clave,
    id_dpto
  ) {
    const query =
      "INSERT INTO residente VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW(), $9)";
    const parameters = [
      id,
      nombre,
      paterno,
      materno,
      nacimiento,
      correo,
      contacto,
      clave,
      id_dpto,
    ];
    try {
      const response = await bd_pool.query(query, parameters);
      return response;
    } catch (e) {
      if (e.code == 23505)
        throw new CustomError(
          "El residente ya existe",
          "ERR_RES_ALREADY_EXIST"
        );
      if (e.code == 23503)
        throw new CustomError(
          "El departamento relacionado no esta registrado",
          "ERR_DPTO_NOT_EXIST",
          ""
        );
      throw e;
    }
  }

  async obtenerResidentes() {
    try {
      const query = 'SELECT id_residente, nombre_residente, paterno_residente, materno_residente, correo_residente, contacto_residente FROM residente'
      const response = await bd_pool.query(query);
      if (!response.rowCount) throw new CustomError('No hay residentes', 'ERR_NOT_FOUND_RES');
      const residentes = response.rows;
      return residentes;
    } catch (e) {
      throw e;
    }
  }

  async obtenerResidente(id) {
    try {
      const query = "SELECT nombre_residente, paterno_residente, materno_residente, fecha_nacimiento, correo_residente, contacto_residente FROM residente WHERE id_residente = $1";
      const parameters = [id];
      const response = await bd_pool.query(query, parameters);
      if (!response.rowCount) throw new CustomError('Residente no encontrado', 'ERR_NOT_FOUND_RESU');
      return response.rows[0];
    } catch (e) {
      throw e;
    }
  }

  async actualizarResidente(id, correo, fecha, contacto,) {
    try {
      const query = 'UPDATE residente SET correo_residente = $1, fecha_nacimiento = $2, contacto_residente = $3, fecha_actualizacion = NOW() WHERE id_residente = $4';
      const parameters = [correo, fecha, contacto, id];
      const response = await bd_pool.query(query, parameters);
      if (!response.rowCount) throw new CustomError("Error al actualizar datos del residente", "ERR_PUT_RES");
      return true;
    } catch (e) {
      throw e;
    }
  }

  async eliminarResidente(id) {
    try {
      const query = "DELETE FROM residente WHERE id_residente = $1";
      const parameters = [id];
      const response = await bd_pool.query(query, parameters);
      if (!response.rowCount) throw new CustomError("Error al eliminar residente", "ERR_DEL_RES");
      return true;
    } catch (e) {
      throw e;
    }
  }
}
