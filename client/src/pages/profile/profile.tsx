import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth-context";

const ProfilePage: React.FC = () => {
    const { authState } = useContext(AuthContext);
    const [showAvatarInput, setShowAvatarInput] = useState(false);

    return (
        <div className="flex-1 px-8 py-5">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Thông Tin Cá Nhân</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
                            <div className="bg-blue-100 rounded-lg p-8 relative flex gap-8 items-center">
                                <div className="flex items-center justify-center mb-4 relative">
                                    <div className="relative">
                                        {false ? (
                                            <img
                                                src={undefined}
                                                alt="Avatar"
                                                className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center shadow-lg object-cover border-4 border-white"
                                            />
                                        ) : (
                                            <div className="w-24 h-24 bg-blue-700 rounded-full flex items-center justify-center shadow-lg">
                                                <i className="fa-solid fa-user text-6xl text-white"></i>
                                            </div>
                                        )}
                                        <button
                                            onClick={() => setShowAvatarInput(!showAvatarInput)}
                                            className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition shadow-lg"
                                        >
                                            <i className="fa-solid fa-camera text-lg"></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {authState?.account.email?.split("@")[0] || "Người Dùng"}
                                    </h2>
                                    <p className="text-sm text-gray-600">{authState?.account.email}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                                        <span className="text-sm text-green-700 font-medium">Tài khoản đang hoạt động</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="border-b pb-4">
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">Email</label>
                                    <p className="text-sm text-gray-900">{authState?.account.email}</p>
                                </div>

                                <div className="border-b pb-4">
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">Họ Tên</label>
                                    <p className="text-sm text-gray-900">---</p>
                                </div>

                                <div className="border-b pb-4">
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">Ngày Sinh</label>
                                    <p className="text-sm text-gray-900">---</p>
                                </div>

                                <div className="border-b pb-4">
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">Địa Chỉ</label>
                                    <p className="text-sm text-gray-900">---</p>
                                </div>

                                <div className="border-b pb-4">
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">Số Điện Thoại</label>
                                    <p className="text-sm text-gray-900">---</p>
                                </div>

                                <div className="border-b pb-4">
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">Giới Tính</label>
                                    <p className="text-sm text-gray-900">---</p>
                                </div>
                            </div>

                            <div className="border-b pb-4">
                                <label className="block text-sm font-semibold text-gray-600 mb-2">Tiểu Sử</label>
                                <p className="text-sm text-gray-900">---</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sticky top-20">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <i className="fa-solid fa-info-circle text-blue-600"></i>
                                    <h3 className="font-semibold text-blue-900">Đang Phát Triển</h3>
                                </div>
                                <p className="text-blue-800 text-sm">
                                    Các tính năng chỉnh sửa thông tin cá nhân đang được phát triển.
                                    <br />
                                    Vui lòng chờ thêm trong các phiên bản sắp tới.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProfilePage;
