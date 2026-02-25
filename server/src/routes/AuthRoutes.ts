import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();
const authController = new AuthController();

router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));
router.get("/valid-state", (req, res) => authController.checkToken(req, res));

router.post("/refresh", (req, res) => authController.refreshToken(req, res));

export default router;