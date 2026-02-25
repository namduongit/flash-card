import React, { useContext, useState } from "react";
import { ModalContext } from "../../contexts/modal-context";
import { WordService, type WordType } from "../../services/WordService";

const wordTypes: WordType[] = ["noun", "verb", "adjective", "adverb", "pronoun", "preposition", "conjunction", "interjection"];

const AddWordModal: React.FC = () => {
    const modalContext = useContext(ModalContext);
    const [english, setEnglish] = useState("");
    const [wordType, setWordType] = useState<WordType>("noun");
    const [vietnamese, setVietnamese] = useState("");
    const [example, setExample] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!modalContext || modalContext.modalType !== "add-word") {
        return null;
    }

    const lessonId = modalContext.modalData?.lessonId;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!english.trim() || !vietnamese.trim()) {
            setError("Từ tiếng Anh và tiếng Việt không được để trống");
            return;
        }

        try {
            setLoading(true);
            await WordService.AddWord(lessonId, english, wordType, vietnamese, example);
            setEnglish("");
            setVietnamese("");
            setExample("");
            setWordType("noun");
            modalContext.closeModal();
            // Trigger refresh
            window.location.reload();
        } catch (err: any) {
            setError(err.response?.data?.message || "Thêm từ thất bại");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setEnglish("");
        setVietnamese("");
        setExample("");
        setWordType("noun");
        setError("");
        modalContext.closeModal();
    };

    return (
        <div className="fixed inset-0 bg-gray-500/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
                <div className="flex justify-between items-center py-2 px-6 border-b border-gray-300">
                    <h2 className="text-xl font-bold text-blue-700">Thêm Từ Mới</h2>
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
                            Từ Tiếng Anh <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={english}
                            onChange={(e) => setEnglish(e.target.value)}
                            placeholder="Nhập từ tiếng Anh"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Loại Từ
                        </label>
                        <select
                            value={wordType}
                            onChange={(e) => setWordType(e.target.value as WordType)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            disabled={loading}
                        >
                            {wordTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nghĩa Tiếng Việt <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={vietnamese}
                            onChange={(e) => setVietnamese(e.target.value)}
                            placeholder="Nhập nghĩa tiếng Việt"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ví Dụ
                        </label>
                        <textarea
                            value={example}
                            onChange={(e) => setExample(e.target.value)}
                            placeholder="Nhập ví dụ (tuỳ chọn)"
                            rows={2}
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
                            {loading ? "Đang thêm..." : "Thêm Từ"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddWordModal;
