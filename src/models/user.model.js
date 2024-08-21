import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  edad: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const UserModel = mongoose.model("users", userSchema);
