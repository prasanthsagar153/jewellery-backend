import { Router } from "express";
import * as productController from "../../controllers/v1/product.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const productRouter = Router();

// Public routes
productRouter.post("/", verifyJWT, productController.createProduct);
productRouter.get("/", productController.getAllProducts);
productRouter.get("/:id", productController.getProductById);

// Protected routes (can be used for admin or authorized users)
productRouter.put("/:id", verifyJWT, productController.updateProduct);
productRouter.delete("/:id", verifyJWT, productController.deleteProduct);

export default productRouter;