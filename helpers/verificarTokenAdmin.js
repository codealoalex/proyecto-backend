import jwt from "jsonwebtoken";
import { JWT_SECRET_ADMIN, JWT_SECRET_RESIDENTE } from "./config.js";

export const noToken = (req, res, next) => {
  const cookie = req.cookies.cookie_logina || req.cookies.cookie_loginr;
  if (!cookie) {
    next();
  } else {
    res.send("<h1>Usted ya se encuentra logueado, no joda</h1>");
  }
};

export const verificarTokenAdmin = (req, res, next) => {
  const cookie = req.cookies.cookie_logina;
  if (!cookie)
    return res.status(401).json({
      message:"Acceso denegado, inicie sesión y si no es admin, no vuelva a llamar a este servicio"
    });
  try {
    jwt.verify(cookie, JWT_SECRET_ADMIN);
    next();
  } catch (e) {
    return res.status(401).json({
      message: "Usted no puede acceder a este servicio",
    });
  }
};

export const verificarTokenResidente = (req, res, next) => {
  const cookie = req.cookies.cookie_loginr;
  if (!cookie) return res.status(401).json({
    message:"Acceso denegado, usted no inició sesión de la manera correcta. Corrupto"
  })
  try {
    jwt.verify(cookie, JWT_SECRET_RESIDENTE);
    next();
  } catch (e) {
    return res.status(401).json({
      message:"Usted no puede acceder a este servicio. Corrupto"
    })
  }
}