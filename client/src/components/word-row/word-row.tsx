import { useState } from "react";
import type { Word } from "../../common/types/word-type";

const WordRowComponent: React.FC<Word> = (word: Word) => {
    const [isEditing, setIsEditing] = useState(false);

    const [english, setEnglish] = useState(word.english);
    const [vietnamese, setVietnamese] = useState(word.vietnamese);
    const [example, setExample] = useState(word.example);

    return (
        <tr className="hover:bg-gray-50 transition border-b border-gray-200">
            <td className="px-6 py-2 text-gray-700">
                {isEditing ? (
                    <div className="rounded w-36 border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500">
                        <input type="text" className="px-2 py-1 w-full" value={english} onChange={(e) => setEnglish(e.target.value)} />
                    </div>
                ) : (
                    <span>{word.english}</span>
                )}
            </td>
            <td className="px-6 py-4">
                <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {word.wordType}
                </span>
            </td>
            <td className="px-6 py-4 text-gray-700">
                {isEditing ? (
                    <div className="rounded w-36 border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500">
                        <input type="text" className="px-2 py-1 w-full" value={vietnamese} onChange={(e) => setVietnamese(e.target.value)} />
                    </div>
                ) : (
                    <span>{word.vietnamese}</span>
                )}
            </td>
            <td className="px-6 py-4 text-gray-600 line-clamp-2">
                {isEditing ? (
                    <div className="rounded w-full border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500">
                        <input type="text" className="px-2 py-1 w-full" value={example} onChange={(e) => setExample(e.target.value)} />
                    </div>
                ) : (
                    <span>{word.example}</span>
                )}
            </td>
            <td className="px-6 py-4">
                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition"
                                onClick={() => setIsEditing(false)}
                            >
                                <i className="fa-solid fa-check"></i>
                            </button>
                            <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition"
                                onClick={() => setIsEditing(false)}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                        >
                            <i className="fa-solid fa-edit"></i>
                        </button>
                    )}
                    {!isEditing && (
                        <button
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition"
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