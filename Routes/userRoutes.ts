import { Router } from "express";
import { getAll, login, RegisterUsers } from "../Controllers/user.controller";
import { userAuth } from "../Middlewares/authorization/authorization";
import {
  LoginValidation,
  RegisterValidation,
} from "../Middlewares/Validation/UserValidation/UserValidation";

const route = Router();
route.route("/register").post(RegisterValidation, RegisterUsers);
route.route("/login").post(LoginValidation, login);
route.route("/").get(userAuth, getAll)

export default route