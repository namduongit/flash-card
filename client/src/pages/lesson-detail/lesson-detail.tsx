import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { AuthContext } from "../../contexts/auth-context";
import { LessonService } from "../../services/LessonService";
import { useExecute } from "../../hooks/execute";
import type { LessonDetail } from "../../common/types/lesson-type";
import type { Word } from "../../common/types/word-type";
import WordRowComponent from "../../components/word-row/word-row";
import AddWordModal from "../../components/add-modal/add-word";

const LessonDetailPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    const { execute, isLoading } = useExecute();

    const [lesson, setLesson] = useState<LessonDetail | null>(null);
    const [words, setWords] = useState<Word[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isShowCreateWord, setIsShowCreateWord] = useState(false);

    useEffect(() => {
        if (!id) {
            navigate("/");
            return;
        }

        fetchLessonDetail();
    }, [id, isAuthenticated, navigate]);

    const fetchLessonDetail = async () => {
        const result = await execute<LessonDetail>(LessonService.GetLessonById(id!));
        if (result?.data) {
            setLesson(result.data);
            setWords(result.data.words || []);
        }
    }

    const filteredWords = words.filter(word =>
        word.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.vietnamese.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex-1 px-8 py-5">
                <i className="fa-solid fa-spinner animate-spin text-4xl text-indigo-600"></i>
            </div>
        )
    }

    if (!lesson) {
        return (
            <div className="flex-1 px-8 py-5">
                <div className="text-center">
                    <p className="text-xl text-gray-600 mb-4">Bài học không tồn tại</p>
                    <Link to="/" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                        Quay lại trang chủ
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 px-8 py-5 space-y-5">
            <div>
                <Link to="/page/lesson" className="text-indigo-600 hover:text-indigo-700 font-semibold mb-2 inline-block">
                    <i className="fa-solid fa-arrow-left mr-2"></i>
                    Quay lại
                </Link>
                <h1 className="text-4xl font-bold text-gray-900">{lesson.title}</h1>
                <p className="text-gray-600 mt-2">{lesson.description}</p>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center rounded w-80 border border-gray-300">
                        <i className="fa-solid fa-magnifying-glass ps-2 text-sm text-gray-500 font-semibold"></i>
                        <input 
                            type="text" 
                            className="ps-4 py-1 w-full" 
                            placeholder="Tìm từ vựng..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>


                <div>
                    <button 
                        onClick={() => setIsShowCreateWord(true)}
                        className="bg-blue-700 text-white px-3 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center gap-2"
                    >
                        Thêm Từ
                    </button>
                </div>
            </div>

            <div>
                {words.length === 0 ? (
                    <div className="text-center py-16">
                        <i className="fa-solid fa-book-open text-6xl text-gray-300 mb-4"></i>
                        <p className="text-gray-500 text-xl mb-4">Bài học chưa có từ vựng nào</p>
                        <button
                            onClick={() => setIsShowCreateWord(true)}
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                        >
                            Thêm Từ Đầu Tiên
                        </button>
                    </div>
                ) : filteredWords.length === 0 ? (
                    <div className="text-center py-16">
                        <i className="fa-solid fa-search text-6xl text-gray-300 mb-4"></i>
                        <p className="text-gray-500 text-xl">Không tìm thấy từ vựng nào phù hợp</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto border rounded-lg border-gray-300">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-300">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Từ Tiếng Anh</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Loại Từ</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tiếng Việt</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Ví Dụ</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredWords.map((word, idx) => (
                                    <WordRowComponent 
                                        key={idx} 
                                        {...word}
                                        onUpdate={(updatedWord) => {
                                            setWords(words.map(w => w._id === updatedWord._id ? updatedWord : w));
                                        }}
                                        onDelete={(wordId) => {
                                            setWords(words.filter(w => w._id !== wordId));
                                        }}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <AddWordModal 
                isOpen={isShowCreateWord}
                lessonId={id || ""}
                onSuccess={(newWord) => {
                    setWords([...words, newWord]);
                }}
                onClose={() => setIsShowCreateWord(false)}
            />
        </div>
    )
}


export default LessonDetailPage;
