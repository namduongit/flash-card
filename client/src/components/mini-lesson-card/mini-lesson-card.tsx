import { useNavigate } from "react-router";
import type { Lesson } from "../../common/types/lesson-type";

const MiniLessonCardComponent: React.FC<Lesson> = (lesson: Lesson) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-row items-center gap-3 bg-white px-4 py-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:ring-2 hover:ring-blue-500 transition-all duration-200 cursor-pointer group"
            onClick={() => navigate(`/page/lesson/${lesson._id}`)}
        >
            <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-lg text-blue-700 flex items-center justify-center group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-200">
                <i className="fa-regular fa-file-powerpoint text-lg mini-lesson-card_icon"></i>
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-gray-800 truncate group-hover:text-blue-700 transition-colors duration-200">
                    {lesson.title}
                </h3>
                <p className="text-sm text-gray-500 truncate group-hover:text-gray-600 transition-colors duration-200">
                    {lesson.description}
                </p>
            </div>
        </div>
    )
}

export default MiniLessonCardComponent;