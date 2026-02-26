const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-linear-to-b from-indigo-50 to-white flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="mb-8">
                    <div className="text-8xl font-bold text-indigo-600 mb-4">404</div>
                    <i className="fa-solid fa-map text-6xl text-gray-300 block mb-4"></i>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-3">Trang Không Tìm Thấy</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Xin lỗi, trang bạn đang tìm không tồn tại hoặc đã bị di chuyển.
                </p>

                <div className="space-y-3">
                    <a
                        href="/"
                        className="inline-block w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition"
                    >
                        <i className="fa-solid fa-home mr-2"></i>
                        Quay Lại Trang Chủ
                    </a>
                    <a
                        href="/page/lesson"
                        className="inline-block w-full bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-300 transition"
                    >
                        <i className="fa-solid fa-book mr-2"></i>
                        Xem Các Bài Học
                    </a>
                </div>

                <div className="mt-12 text-gray-500 text-sm">
                    <p>Mã lỗi: 404</p>
                    <p>Nếu bạn tin đây là lỗi, vui lòng liên hệ với chúng tôi.</p>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
