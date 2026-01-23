import { Router } from "express";
import {addAddresses, getAddresses, updateAddresses, deleteAddresses,
addToWishlist,removeFromToWishlist, getWishlist
} from "../controllers/user.controller.js"
import {  protectRoute } from "../middleware/auth.middleware";

const router = Router();

router.use(protectRoute);
//rutas de direccion
router.post("/addresses",   addAddresses);
router.get("/addresses",   getAddresses);
router.put("/addresses/:addressId",  updateAddresses);
router.delete("/addresses/:addressId",   deleteAddresses);

//wishlist route

router.post("/wishlish", addToWishlist);
router.delete("/wishlish/:productionId", removeFromToWishlist);
router.get("/wishlish/:productionId", getWishlist);
export default router