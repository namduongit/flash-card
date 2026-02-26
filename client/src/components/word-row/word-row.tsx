import { useState } from "react";
import { WordService, type WordType } from "../../services/WordService";
import { useExecute } from "../../hooks/execute";
import { useConfirm } from "../../hooks/confirm";
import { useNotification } from "../../hooks/notification";
import type { Word } from "../../common/types/word-type";

interface WordRowProps extends Word {
    onUpdate?: (updatedWord: Word) => void;
    onDelete?: (wordId: string) => void;
}

const WordRowComponent: React.FC<WordRowProps> = (props) => {
    const { _id, english: initialEnglish, wordType, vietnamese: initialVietnamese, example: initialExample, onUpdate, onDelete } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [english, setEnglish] = useState(initialEnglish);
    const [vietnamese, setVietnamese] = useState(initialVietnamese);
    const [example, setExample] = useState(initialExample);

    const { execute, isLoading } = useExecute();
    const { showConfirm } = useConfirm();
    const { showSuccess, showError } = useNotification();

    const handleSave = async () => {
        if (!english.trim() || !vietnamese.trim()) {
            showError("Từ tiếng Anh và tiếng Việt không được để trống");
            return;
        }

        const result = await execute<Word>(
            WordService.UpdateWord(_id, english, wordType as WordType, vietnamese, example)
        );

        if (result?.data) {
            showSuccess("Cập nhật từ thành công!");
            if (onUpdate) {
                onUpdate(result.data);
            }
            setIsEditing(false);
        } else {
            showError("Cập nhật từ thất bại. Vui lòng thử lại.");
        }
    };

    const handleCancel = () => {
        setEnglish(initialEnglish);
        setVietnamese(initialVietnamese);
        setExample(initialExample);
        setIsEditing(false);
    };

    const handleDelete = async () => {
        const confirm = await showConfirm("Xác nhận xóa?", `Bạn có chắc chắn muốn xóa từ "${initialEnglish}" không?`);
        if (!confirm) return;

        const result = await execute(WordService.DeleteWord(_id));
        if (result?.data) {
            showSuccess("Xóa từ thành công!");
            if (onDelete) {
                onDelete(_id);
            }
        } else {
            showError("Xóa từ thất bại. Vui lòng thử lại.");
        }
    };

    return (
        <tr className="hover:bg-gray-50 transition border-b border-gray-200">
            <td className="px-6 py-2 text-gray-700">
                {isEditing ? (
                    <div className="rounded w-36 border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500">
                        <input type="text" className="px-2 py-1 w-full" value={english} onChange={(e) => setEnglish(e.target.value)} disabled={isLoading} />
                    </div>
                ) : (
                    <span>{initialEnglish}</span>
                )}
            </td>
            <td className="px-6 py-4">
                <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {wordType}
                </span>
            </td>
            <td className="px-6 py-4 text-gray-700">
                {isEditing ? (
                    <div className="rounded w-36 border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500">
                        <input type="text" className="px-2 py-1 w-full" value={vietnamese} onChange={(e) => setVietnamese(e.target.value)} disabled={isLoading} />
                    </div>
                ) : (
                    <span>{initialVietnamese}</span>
                )}
            </td>
            <td className="px-6 py-4 text-gray-600 line-clamp-2">
                {isEditing ? (
                    <div className="rounded w-full border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500">
                        <input type="text" className="px-2 py-1 w-full" value={example} onChange={(e) => setExample(e.target.value)} disabled={isLoading} />
                    </div>
                ) : (
                    <span>{initialExample}</span>
                )}
            </td>
            <td className="px-6 py-4">
                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition disabled:bg-gray-400"
                                onClick={handleSave}
                                disabled={isLoading}
                            >
                                <i className="fa-solid fa-check"></i>
                            </button>
                            <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition disabled:bg-gray-400"
                                onClick={handleCancel}
                                disabled={isLoading}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-700 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition disabled:bg-gray-400"
                            disabled={isLoading}
                        >
                            <i className="fa-solid fa-edit"></i>
                        </button>
                    )}
                    {!isEditing && (
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition disabled:bg-gray-400"
                            disabled={isLoading}
                        >
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    )}
                </div>
            </td>
        </tr>
    )
}

export default WordRowComponent;