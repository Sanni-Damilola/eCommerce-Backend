import { Router } from "express";
import { login, RegisterUsers } from "../Controllers/user.controller";
import {
  LoginValidation,
  RegisterValidation,
} from "../Middlewares/Validation/UserValidation/UserValidation";

const route = Router();
route.route("/register").post(RegisterValidation, RegisterUsers);
route.route("/login").post(LoginValidation, login);


export default route