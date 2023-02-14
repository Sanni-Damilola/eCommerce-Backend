import joi from "joi";

//  Validation Schema for Product

export const productSchemaValidation = {
  PostProduct: joi.object({
    name: joi.string().required(),
    price: joi.string().required(),
    category: joi.string().required(),
  }),
} // requirement for posting product
