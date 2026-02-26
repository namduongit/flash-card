import React, { useState, useRef, useEffect } from "react";
import { WordService, type WordType } from "../../services/WordService";
import { TranslateService } from "../../services/TranslateService";
import { useExecute } from "../../hooks/execute";
import { useConfirm } from "../../hooks/confirm";
import { useNotification } from "../../hooks/notification";
import type { Word } from "../../common/types/word-type";

const wordTypes: WordType[] = ["noun", "verb", "adjective", "adverb", "pronoun", "preposition", "conjunction", "interjection"];

interface SearchResult {
    word: string;
    type: string;
    phonetic: string;
    meaning: string[];
}

interface AddWordModalProps {
    isOpen: boolean;
    lessonId: string;
    onSuccess: (word: Word) => void;
    onClose: () => void;
}

const AddWordModal: React.FC<AddWordModalProps> = ({ isOpen, lessonId, onSuccess, onClose }) => {
    const [english, setEnglish] = useState("");
    const [wordType, setWordType] = useState<WordType>("noun");
    const [meaning, setMeaning] = useState("");
    const [example, setExample] = useState("");

    const [vietnameseMeanings, setVietnameseMeanings] = useState<string[]>([]);

    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const { execute, isLoading } = useExecute();
    const { showConfirm } = useConfirm();
    const { showSuccess, showError } = useNotification();

    const handleEnglishChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEnglish(value);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (value.trim().length > 0) {
            setSearchLoading(true);
            setShowSuggestions(false);

            searchTimeoutRef.current = setTimeout(async () => {
                const result = await execute<SearchResult[]>(TranslateService.SearchDictionary(value));
                console.log("Search results:", result);
                if (result?.data && result.data.length > 0) {
                    setSearchResults(result.data);
                    setShowSuggestions(true);
                } else {
                    setSearchResults([]);
                    setShowSuggestions(false);
                }
                setSearchLoading(false);
            }, 500);
        } else {
            setSearchResults([]);
            setShowSuggestions(false);
            setSearchLoading(false);
        }
    }

    const handleSelectSuggestion = async (result: SearchResult) => {
        setEnglish(result.word);
        setWordType(result.type as WordType);
        setVietnameseMeanings(getTopShortestMeanings(result.meaning));
        setShowSuggestions(false);
        setSearchResults([]);
    }

    const getTopShortestMeanings = (meanings: string[]): string[] => {
        return meanings
            .sort((a, b) => a.length - b.length)
            .slice(0, 2);
    }

    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    if (!isOpen) {
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!english.trim() || !meaning.trim()) {
            showError("Từ tiếng Anh và nghĩa tiếng Việt không được để trống");
            return;
        }

        const confirm = await showConfirm("Xác nhận thêm từ mới?", `Bạn có chắc chắn muốn thêm từ "${english}" không?`);
        if (!confirm) return;

        const result = await execute<Word>(WordService.AddWord(lessonId, english, wordType, meaning, example || "No example"));
        if (result?.data) {
            showSuccess("Thêm từ thành công!");
            setEnglish("");
            setWordType("noun");
            setMeaning("");
            setExample("");
            onSuccess(result.data);
            onClose();
        } else {
            showError("Thêm từ thất bại. Vui lòng thử lại.");
        }
    }

    const handleClose = () => {
        setEnglish("");
        setMeaning("");
        setExample("");
        setWordType("noun");
        setSearchResults([]);
        setShowSuggestions(false);
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-gray-500/40 flex items-center justify-center z-90">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
                <div className="flex justify-between items-center py-2 px-6 border-b border-gray-300">
                    <h2 className="text-xl font-bold text-blue-700">Thêm Từ Mới</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        x
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-2 pb-4 space-y-2">
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Từ Tiếng Anh <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={english}
                            onChange={handleEnglishChange}
                            placeholder="Nhập từ tiếng Anh"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            autoComplete="off"
                        />

                        {showSuggestions && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                                {searchLoading && (
                                    <div className="px-3 py-2 text-gray-500 text-sm">Đang tìm kiếm...</div>
                                )}
                                {!searchLoading && searchResults.length === 0 && english.trim().length > 0 && (
                                    <div className="px-3 py-2 text-gray-500 text-sm">Không tìm thấy kết quả</div>
                                )}
                                {searchResults.map((result, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleSelectSuggestion(result)}
                                        className="w-full text-left px-3 py-2 hover:bg-indigo-50 border-b border-gray-200 last:border-b-0 transition-colors"
                                    >
                                        <div className="font-medium text-gray-900">{result.word}</div>
                                        <div className="text-xs text-gray-500">{result.phonetic} • {result.type}</div>
                                        <div className="text-xs text-gray-700 mt-1">{result.meaning.join(", ")}</div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Loại Từ
                        </label>
                        <select
                            value={wordType}
                            onChange={(e) => setWordType(e.target.value as WordType)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            disabled={isLoading}
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
                            placeholder="Nhập hoặc chọn nghĩa tiếng Việt"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                            value={meaning}
                            onChange={(e) => setMeaning(e.target.value)}
                            disabled={isLoading}
                        />

                        {vietnameseMeanings.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {vietnameseMeanings.map((meaning, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setMeaning(meaning)}
                                        className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded text-sm hover:bg-indigo-200 transition-colors cursor-pointer"
                                    >
                                        {meaning}
                                    </button>
                                ))}
                            </div>
                        )}
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
                            {isLoading ? "Đang thêm..." : "Thêm Từ"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddWordModal;
