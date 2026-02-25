import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts/auth-context";
import { ModalContext } from "../../contexts/modal-context";
import { LessonService } from "../../services/LessonService";
import { useExecute } from "../../hooks/execute";
import type { Lesson } from "../../common/types/lesson-type";
import MiniLessonCardComponent from "../../components/mini-lesson-card/mini-lesson-card";

const LessonPage: React.FC = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);

    const navigate = useNavigate();
    const { authState, isAuthenticated } = useContext(AuthContext);
    const modalContext = useContext(ModalContext);
    const { execute, isLoading } = useExecute();

    useEffect(() => {
        fetchLessons();
    }, [isAuthenticated, authState, navigate]);

    const fetchLessons = async () => {
        const result = await execute<Lesson[]>(LessonService.GetMyLessons());
        if (result?.data && Array.isArray(result.data)) {
            setLessons(result.data);
        }
    }

    return (
        <div className="flex-1 px-8 py-5">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">
                        Bài Học Của Tôi
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Chào mừng, {(authState as any)?.account?.email}
                    </p>
                </div>
                <button
                    onClick={() => modalContext?.openModal("add-lesson")}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center gap-2"
                >
                    <i className="fa-solid fa-plus"></i>
                    Tạo Bài Học Mới
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <i className="fa-solid fa-spinner animate-spin text-4xl text-indigo-600"></i>
                </div>
            ) : lessons.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg shadow">
                    <i className="fa-solid fa-book text-6xl text-gray-300 mb-4"></i>
                    <p className="text-gray-500 text-xl mb-4">Bạn chưa có bài học nào</p>
                    <button
                        onClick={() => modalContext?.openModal("add-lesson")}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                    >
                        Tạo Bài Học Đầu Tiên
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-5">
                    {lessons.map((lesson, idx) => (
                        <MiniLessonCardComponent key={idx} {...lesson} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default LessonPage;