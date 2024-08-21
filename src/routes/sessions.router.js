import { Router } from "express";
import { UserModel } from "../models/user.model.js";
const app = Router();
app.post("/register", async (req, res) => {
  const { nombre, apellido, email, edad, password } = req.body;
  try {
    await UserModel.create({
      nombre,
      apellido,
      email,
      edad,
      password,
    });
    res.status(201).json({ message: "usuario creado" });
  } catch (e) {
    res.status(500).json({ message: "Error al crear el recurso" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email, password }).lean();
    if (user) {
      req.session.isLog = true;
      req.session.user = {
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        edad: user.edad,
        _id: user._id,
      };
      return res.json({ message: "login correcto" });
    }
    return res.status(401).json({ message: "credenciales invalidas" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error al iniciar sesion", error: error.message });
  }
});

app.get("/getSession", (req, res) => {
  if (req.session.isLog) {
    return res.json({
      message: "sesion iniciada",
      user: req.session.user,
      cookie: req.session.cookie,
    });
  }
  return res.status(401).json({ message: "sesion no iniciada" });
});

export default app;
