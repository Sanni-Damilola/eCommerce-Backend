import { Router } from "express";
import {
  LoginValidation,
  RegisterValidation,
} from "../Middlewares/Validation/UserValidation/UserValidation";

const route = Router();
route.route("/register").post(RegisterValidation);
route.route("login").post(LoginValidation);
