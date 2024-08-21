import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import expbhs from "express-handlebars";
import { __dirname } from "./utils.js";
import ViewsRouter from "./routes/views.router.js";
import mongoose from "mongoose";
import SessionsRouter from "./routes/sessions.router.js";

const hbs = expbhs.create();
const app = express();

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

//Middlewares
app.use(cookieParser("PALABRASECRETA"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: "url",
      dbName: "nombre",
      ttl: 360,
    }),
    secret: "PALABRASECRETA",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
      httpOnly: true,
    },
  })
);

app.use("/", ViewsRouter);
app.use("/api/sessions/", SessionsRouter);

app.get("/session", (req, res) => {});

app.post("/login", (req, res) => {});

app.get("/deleteSession", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.send(error);
    } else {
      res.send("Sesion destruida");
    }
  });
});

app.listen(8080, () => {
  console.log("Server on");
});

mongoose.connect("url", { dbName: "nombre" }).then(
  () => {
    console.log("Conectado a la base de datos");
  },
  (error) => {
    console.log("Error al conectar a la base de datos", error);
  }
);
