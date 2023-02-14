import Joi from "joi";

// VALIDATION SCHEMA OBJECT

export const UserSchemaValidation = {
  Register: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).alphanum().required(),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
  }),
  Login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
}; // requirement for signing Up
