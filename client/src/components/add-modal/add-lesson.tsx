import React, { useState } from "react";
import { LessonService } from "../../services/LessonService";
import type { Lesson } from "../../common/types/lesson-type";
import { requireContext } from "../../utils/require-context";
import { ExecuteContext, type ExecuteContextType } from "../../contexts/execute/execute-context";

interface AddLessonModalProps {
    isOpen: boolean;
    onSuccess: (lesson: Lesson) => void;
    onClose: () => void;
}

const AddLessonModal: React.FC<AddLessonModalProps> = ({ isOpen, onSuccess, onClose }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const { execute, isLoading } = requireContext<ExecuteContextType>(ExecuteContext).ExecuteQuery();

    if (!isOpen) {
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await execute<Lesson>(LessonService.CreateLesson(title, description), {
            error: {
                toast: "Tạo bài học thất bại. Vui lòng thử lại."
            },
            success: {
                toast: "Tạo bài học thành công!",
                onSuccess: (result) => {
                    if (result && result.data) {
                        setTitle("");
                        setDescription("");
                        onSuccess(result.data);
                        onClose();
                    }
                }
            }
        });

    }

    const handleClose = () => {
        setTitle("");
        setDescription("");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-500/40 flex items-center justify-center z-90">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
                <div className="flex justify-between items-center py-2 px-6 border-b border-gray-300">
                    <h2 className="text-xl font-bold text-blue-700">Tạo Bài Học Mới</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        x
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-2 pb-4 space-y-2">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tiêu đề <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Nhập tiêu đề bài học"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mô tả
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Nhập mô tả (tuỳ chọn)"
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="flex gap-3 justify-end pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                            disabled={isLoading}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium disabled:bg-indigo-400"
                            disabled={isLoading}
                        >
                            {isLoading ? "Đang tạo..." : "Tạo Bài Học"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLessonModal;
