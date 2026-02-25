import { Router } from "express";
import { LessonController } from "../controllers/LessonController";

const router = Router();
const lessonController = new LessonController();

router.get("/", (req, res) => lessonController.getMyLessons(req, res));
router.post("/", (req, res) => lessonController.createLesson(req, res));
router.get("/:id", (req, res) => lessonController.getLessonWithWords(req, res));
router.put("/:id", (req, res) => lessonController.updateLesson(req, res));
router.delete("/:id", (req, res) => lessonController.deleteLesson(req, res));

export default router;
