import express, { Response } from "express";
import cors from "cors"
import { connectDB } from "./config/database";
import authRoutes from "./routes/AuthRoutes";
import lessonRoutes from "./routes/LessonRoutes";
import wordRoutes from "./routes/WordRoutes";
import translationRoutes from "./routes/TranslationRoutes";
import { verifyToken } from "./middleware/AuthMiddleware";
import { errorHandler } from "./middleware/ErrorHandler";

// Init request.account = { ... } to handle middleware
declare global {
    namespace Express {
        interface Request {
            account: {
                _id: string,
                email: string
                // Add some variable later (role, time, etc ...)
            }
        }
    }
}

const bootStrap = async () => {
    const app = express();
    const port = process.env.PORT || 8000;

    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
        origin: 'http://localhost:5173',
        optionsSuccessStatus: 200,
    }));

    await connectDB();

    app.get("/", (_, res: Response) => {
        res.json({
            "message": "Flash Card API",
            "author": "namduongit",
            "contact": "github.com/namduongit"
        });
    });

    app.use("/api/auth", authRoutes);

    app.use("/api/translate", verifyToken, translationRoutes);
    app.use("/api/words", verifyToken, wordRoutes);

    app.use("/api/lessons", verifyToken, lessonRoutes);

    app.use(errorHandler);

    app.listen(port, () => {
        console.log("Express is running on port", port);
    });
}

bootStrap();