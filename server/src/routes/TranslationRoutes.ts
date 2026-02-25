import { Router } from "express";
import { TranslationController } from "../controllers/TranslationController";

const router = Router();
const translationController = new TranslationController();

router.post("/", (req, res) => translationController.translate(req, res));
router.get("/search", (req, res) => translationController.searchWords(req, res));
router.get("/dictionary", (req, res) => translationController.getDictionary(req, res));

export default router;
