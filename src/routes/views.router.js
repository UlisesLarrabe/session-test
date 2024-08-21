import { Router } from "express";
const app = Router();

app.get("/", (req, res) => {
  res.render("home", {});
});
app.get("/register", (req, res) => {
  res.render("register", {});
});

export default app;
