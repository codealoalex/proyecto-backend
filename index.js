import express from "express";
import cookieParser from "cookie-parser";

//Variables
import { PORT } from "./helpers/config.js";

//Rutas
import { router as usuarioRouter } from "./routes/usuario.route.js";
import { router as administradorRouter } from "./routes/administrador.route.js";
import { router as notFoundPages } from "./routes/notFound.router.js";
import { router as residenteRouter } from "./routes/residente.route.js";

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Llamada a rutas
app.get('/', (req, res) => {
  return res.status(200).json({
    message: "Bienvenido a la aplicacion"
  })
});
app.use("/api/usuario", usuarioRouter);
app.use("/api/admin", administradorRouter);
app.use("/api/residente", residenteRouter);
app.use(notFoundPages);

//Iniciar servidor
app.listen(PORT, () => {
  console.log("Escuchando en el puerto: ", PORT);
});
