import express, { Express } from 'express';
import {engine} from 'express-handlebars'
import MongoStore from 'connect-mongo';
import session from 'express-session';
import passport from 'passport';
import Mongoose from 'mongoose';
import { cpus } from 'os'
import cluster from 'cluster'
import swaggerUi from "swagger-ui-express";

import { routerCart, routerProducts, routerUser, routerAuth} from './router'
import { dbConnection } from './database/configMongo';
import { logger } from './utils';
import jsonSwagger from './docs/swaggerConfig.json'
import config from './utils/config';
import { Authorized } from './middlewares/authorized';

Mongoose.set("strictQuery", true);
const advancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const app: Express = express();

const PORT = config.PORT || 8080;
console.log(PORT)



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.DB_CNN,
      ttl: 10,
      collectionName: "session",
      autoRemove: "native",
    }),
    name: "cookie.id",
    secret: 'OXIDO.RISA.PASTEL' || config.SECRET_KEY,
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
app.use("/api/products", Authorized,routerProducts); 
app.use("/api/cart", Authorized, routerCart); 
app.use("/api/auth", routerAuth); 
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(jsonSwagger)
);

if (config.MODO == "CLUSTER" && cluster.isPrimary) {
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