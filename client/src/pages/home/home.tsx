import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts/auth-context";
import { LessonService } from "../../services/LessonService";
import { useExecute } from "../../hooks/execute";
import type { LessonDetail } from "../../common/types/lesson-type";

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);
    const { execute, isLoading } = useExecute();
    const [lessons, setLessons] = useState<LessonDetail[]>([]);
    const [recentLessons, setRecentLessons] = useState<LessonDetail[]>([]);

    useEffect(() => {
        fetchLessons();
    }, []);

    const fetchLessons = async () => {
        const result = await execute<LessonDetail[]>(LessonService.GetMyLessons());
        if (result?.data) {
            setLessons(result.data);
            setRecentLessons(result.data.slice(0, 3));
        }
    };

    const totalWords = lessons.reduce((sum, lesson) => sum + (lesson.words?.length || 0), 0);

    return (
        <div className="flex-1 px-8 py-5 space-y-8">
            <div className="flex items-center gap-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-4 rounded">
                <i className="fa-solid fa-exclamation-triangle text-yellow-500"></i>
                <p>Trang chủ đang được phát triển, chúng tôi sẽ sớm hoàn thiện!</p>
            </div>
            <div className="bg-linear-to-r from-indigo-600 to-indigo-800 rounded-lg shadow-lg p-8 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">
                            Xin chào, {authState?.account.email?.split("@")[0]}!
                        </h1>
                        <p className="text-indigo-100 text-lg">
                            Hôm nay là ngày tốt lành để học tiếng Anh. Hãy bắt đầu nào!
                        </p>
                    </div>
                    <div className="text-6xl ">
                        <i className="fa-solid fa-book-bookmark"></i>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-semibold mb-1">Tổng Bài Học</p>
                            <p className="text-4xl font-bold text-indigo-600">{lessons.length}</p>
                        </div>
                        <div className="text-5xl text-blue-700">
                            <i className="fa-solid fa-book"></i>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-semibold mb-1">Tổng Từ Vựng</p>
                            <p className="text-4xl font-bold text-green-600">{totalWords}</p>
                        </div>
                        <div className="text-5xl text-green-700">
                            <i className="fa-solid fa-explosion"></i>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-semibold mb-1">Độ Tiến Độ</p>
                            <p className="text-4xl font-bold text-orange-600">0%</p>
                        </div>
                        <div className="text-5xl text-orange-700">
                            <i className="fa-solid fa-chart-simple"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Bắt Đầu Nào</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                        onClick={() => navigate("/page/lesson")}
                        className="bg-linear-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 hover:shadow-lg transition text-left group"
                    >
                        <i className="fa-solid fa-book text-3xl mb-3 block group-hover:scale-110 transition"></i>
                        <h3 className="font-bold text-lg mb-1">Học Từ Mới</h3>
                        <p className="text-sm text-blue-100">Xem tất cả bài học của bạn</p>
                    </button>

                    <button
                        onClick={() => navigate("/page/quiz")}
                        className="bg-linear-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 hover:shadow-lg transition text-left group"
                    >
                        <i className="fa-solid fa-brain text-3xl mb-3 block group-hover:scale-110 transition"></i>
                        <h3 className="font-bold text-lg mb-1">Làm Bài Thi</h3>
                        <p className="text-sm text-purple-100">Kiểm tra kiến thức của bạn</p>
                    </button>

                    <button
                        onClick={() => navigate("/page/profile")}
                        className="bg-linear-to-br from-pink-500 to-pink-600 text-white rounded-lg p-6 hover:shadow-lg transition text-left group"
                    >
                        <i className="fa-solid fa-user text-3xl mb-3 block group-hover:scale-110 transition"></i>
                        <h3 className="font-bold text-lg mb-1">Hồ Sơ</h3>
                        <p className="text-sm text-pink-100">Quản lý thông tin cá nhân</p>
                    </button>
                </div>
            </div>

            {recentLessons.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Bài Học Gần Đây</h2>
                        <button
                            onClick={() => navigate("/page/lesson")}
                            className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm"
                        >
                            Xem tất cả →
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recentLessons.map((lesson) => (
                            <div
                                key={lesson._id}
                                onClick={() => navigate(`/page/lesson/${lesson._id}`)}
                                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="text-3xl group-hover:scale-110 transition">
                                            <i className="fa-solid fa-book text-blue-700"></i>
                                        </div>
                                        <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
                                            {lesson.words?.length || 0} từ
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
                                        {lesson.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {lesson.description}
                                    </p>
                                </div>
                                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium text-sm">
                                    Học Ngay
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {lessons.length === 0 && !isLoading && (
                <div className="bg-gray-50 rounded-lg p-12 text-center">
                    <i className="fa-solid fa-inbox text-6xl text-gray-300 mb-4 block"></i>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Chưa có bài học nào</h3>
                    <p className="text-gray-600 mb-6">Hãy tạo bài học đầu tiên để bắt đầu học tập</p>
                    <button
                        onClick={() => navigate("/page/lesson")}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
                    >
                        Tạo Bài Học
                    </button>
                </div>
            )}

            <div className="bg-linear-to-r from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
                <div className="flex items-start gap-4">
                    <i className="fa-solid fa-lightbulb text-3xl text-amber-600 mt-1"></i>
                    <div>
                        <h3 className="text-lg font-bold text-amber-900 mb-2">Mẹo Học Hiệu Quả</h3>
                        <ul className="text-amber-800 text-sm space-y-1">
                            <li>✓ Học 15-20 từ mới mỗi ngày</li>
                            <li>✓ Ôn tập lại các từ cũ thường xuyên</li>
                            <li>✓ Sử dụng các ví dụ để ghi nhớ tốt hơn</li>
                            <li>✓ Làm bài thi để kiểm tra tiến độ</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;