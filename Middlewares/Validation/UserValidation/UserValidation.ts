import { NextFunction, Request, Response, RequestHandler } from "express";
import { UserSchemaValidation } from "./UserSchema";
import { validation } from "../Validator";

export const RegisterValidation: RequestHandler = (
    req: Request, res: Response, next: NextFunction
) =>{
    validation(UserSchemaValidation.Register, req.body, next)
};

export const LoginValidation: RequestHandler = (
    req: Request, res: Response, next: NextFunction
) =>{
    validation(UserSchemaValidation.Login, req.body, next)
}