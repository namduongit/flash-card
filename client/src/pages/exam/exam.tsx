const ExamPage: React.FC = () => {
    return (
        <div className="flex-1 px-8 py-5 space-y-10">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold text-gray-900">Bài Thi</h1>
                <span className="block mt-2 text-gray-600">Các bài thi sẽ đem đến cho bạn lượng kiến thức phong phú</span>
            </div>
            <div className="flex-1 flex gap-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-900">Bài Thi {item}</h2>=
                            </div>
                            <p className="text-gray-600 mb-4">Kiểm tra kiến thức của bạn qua các câu hỏi đa dạng</p>
                            <button
                                disabled
                                className="w-full bg-gray-400 text-white font-semibold py-2 rounded-lg cursor-not-allowed"
                            >
                                Tính năng đang phát triển
                            </button>
                        </div>
                    ))}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 w-fit h-fit">
                    <div className="flex items-start gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <i className="fa-solid fa-tools text-yellow-600 text-2xl"></i>
                                <h3 className="text-lg font-semibold text-yellow-900">Đang Phát Triển</h3>
                            </div>
                            <p className="text-yellow-800 mb-3">
                                Tính năng Bài Thi hiện đang được phát triển.
                            </p>
                            <p className="text-sm text-yellow-700">
                                Vui lòng quay lại sau để kiểm tra các tính năng mới!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamPage;
