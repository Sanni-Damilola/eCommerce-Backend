import { Router } from "express";
import { getAllProduct, postProduct } from "../Controllers/productController";
import { postProductValidation } from "../Middlewares/Validation/ProductsValidation/producValidation";

const route = Router();
route.route("/getAllProduct").get(getAllProduct);
route.route("/createProduct").post(postProductValidation, postProduct);

export default route;
