import express from 'express';
import cookieParser from "cookie-parser";

//Variables
import { PORT } from './helpers/config.js';

//Rutas
import { router as usuarioRouter } from './routes/usuario.route.js';

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Llamada a rutas
app.use('/api/usuario', usuarioRouter);

//Iniciar servidor
app.listen(PORT, () => {
  console.log('Escuchando en el puerto: ', PORT);
})