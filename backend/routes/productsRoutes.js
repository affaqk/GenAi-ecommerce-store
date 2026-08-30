import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProductDetail, updateProduct } from "../controllers/productsController.js";
import { isAdmin, isAuthenticatedUser } from "../utils/userAuth.js";
const productRouter = express.Router();

productRouter.post("/create-product", isAuthenticatedUser, isAdmin("admin"), createProduct)
productRouter.get("/get-all-products", getAllProducts)
productRouter.get("/product-detail/:id", getProductDetail);
productRouter.patch("/update-product/:id", isAuthenticatedUser,isAdmin("admin"), updateProduct);
productRouter.delete("/delete-product/:id",isAdmin("admin"), isAuthenticatedUser, deleteProduct)

export default productRouter;