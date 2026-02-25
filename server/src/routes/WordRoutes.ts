import { Router } from "express";
import { WordController } from "../controllers/WordController";

const router = Router();
const wordController = new WordController();

router.post("/", (req, res) => wordController.addWord(req, res));
router.get("/:id", (req, res) => wordController.getWord(req, res));
router.get("/lesson/:lessonId", (req, res) => wordController.getWordsByLesson(req, res));
router.put("/:id", (req, res) => wordController.updateWord(req, res));
router.delete("/:id", (req, res) => wordController.deleteWord(req, res));

export default router;
