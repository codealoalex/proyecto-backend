import { bd_pool } from "../bd_connection/bdPool.js";
import { CustomError } from "../helpers/CustomError.js";

export const registroModelAdmin = async (
  id,
  nombre,
  paterno,
  materno,
  nacimiento,
  correo,
  contacto,
  clave
) => {
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
    throw e;
  }
};

export const registroModelResidente = async (
  id,
  nombre,
  paterno,
  materno,
  nacimiento,
  correo,
  contacto,
  clave,
  id_dpto
) => {
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
    if (e.code == 23503)
      throw new CustomError(
        "El departamento relacionado no esta registrado",
        "ERR_DPTO_NOT_EXIST",
        ""
      );
    throw e;
  }
};
