import React, { useContext, useState } from "react";
import { ModalContext } from "../../contexts/modal-context";
import { LessonService } from "../../services/LessonService";

const AddLessonModal: React.FC = () => {
    const modalContext = useContext(ModalContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!modalContext || modalContext.modalType !== "add-lesson") {
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!title.trim()) {
            setError("Tiêu đề không được để trống");
            return;
        }

        try {
            setLoading(true);
            await LessonService.CreateLesson(title, description);
            setTitle("");
            setDescription("");
            modalContext.closeModal();
            window.location.reload();
        } catch (err: any) {
            setError(err.response?.data?.message || "Tạo bài học thất bại");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setTitle("");
        setDescription("");
        setError("");
        modalContext.closeModal();
    };

    return (
        <div className="fixed inset-0 bg-gray-500/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
                <div className="flex justify-between items-center py-2 px-6 border-b border-gray-300">
                    <h2 className="text-xl font-bold text-blue-700">Tạo Bài Học Mới</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-2 pb-4 space-y-2">
                    {error && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

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
                            disabled={loading}
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
                            disabled={loading}
                        />
                    </div>

                    <div className="flex gap-3 justify-end pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                            disabled={loading}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium disabled:bg-indigo-400"
                            disabled={loading}
                        >
                            {loading ? "Đang tạo..." : "Tạo Bài Học"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLessonModal;
