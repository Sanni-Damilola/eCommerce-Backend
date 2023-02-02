import { NextFunction, Request, Response, RequestHandler } from "express";
import { UserSchemaValidation } from "./UserSchema";
import { validator } from "../Validator";

export const RegisterValidation: RequestHandler = (
    req: Request, res: Response, next: NextFunction
) =>{
    validator(UserSchemaValidation.Register, req.body, next)
};

export const LoginValidation: RequestHandler = (
    req: Request, res: Response, next: NextFunction
) =>{
    validator(UserSchemaValidation.Login, req.body, next)
}