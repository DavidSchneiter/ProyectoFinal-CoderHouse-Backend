import express, { Express } from 'express';
import dotenv from 'dotenv';
import {engine} from 'express-handlebars'
import MongoStore from 'connect-mongo';
import session from 'express-session';
import passport from 'passport';
import Mongoose from 'mongoose';
import { cpus } from 'os'
import cluster from 'cluster'

import { routerCart, routerLogin, routerProducts } from './router'
import { dbConnection } from './database/configMongo';
import { logger } from './utils';
import { routerUser } from './router/userRouter';

Mongoose.set("strictQuery", true);
const advancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
dotenv.config();
const app: Express = express();

const PORT = process.env.PORT || 8080;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.DB_CNN,
      ttl: 10,
      collectionName: "session",
      autoRemove: "native",
    }),
    secret: 'OXIDO.RISA.PASTEL' || process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600 * 24 * 60,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
  })
);

app.set("view engine", "hbs");
app.set("views", "src/views");

app.use("/api/user", routerUser); 
app.use("/api/productos", routerProducts); 
app.use("/api/carrito", routerCart); 
app.use("/api/registro", routerLogin); 


if (process.env.MODO == "CLUSTER" && cluster.isPrimary) {
  const lengthCpu = cpus.length;
  for (let index = 0; index < lengthCpu; index++) {
    cluster.fork();
  }
} else {
  const server = app.listen(PORT, async () => {
    logger.info(`Servidor de exprees ejecutandose en el puerto ${PORT}`);
    dbConnection()
  });

  server.on("error", (error) => logger.error(`Erorr en el servidor ${error}`));
}