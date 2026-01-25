import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllProducts, getProductById } from "../controllers/product.controller.js";

const router = Router();

// Rutas públicas - no requieren autenticación
router.get("/", getAllProducts);
router.get("/:id", getProductById);

export default router;