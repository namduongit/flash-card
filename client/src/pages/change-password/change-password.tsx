import { useState } from "react";
import { AuthService } from "../../services/AuthService";
import { useExecute } from "../../hooks/execute";
import { useNotification } from "../../hooks/notification";
import type { ChangePasswordRes } from "../../common/types/auth-type";

const ChangePasswordPage: React.FC = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { execute, isLoading } = useExecute();
    const { showSuccess, showError } = useNotification();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!oldPassword.trim()) {
            showError("Vui lòng nhập mật khẩu hiện tại");
            return;
        }

        if (!newPassword.trim()) {
            showError("Vui lòng nhập mật khẩu mới");
            return;
        }

        if (newPassword.length < 6) {
            showError("Mật khẩu mới phải có ít nhất 6 ký tự");
            return;
        }

        if (newPassword !== confirmPassword) {
            showError("Mật khẩu xác nhận không khớp");
            return;
        }

        if (oldPassword === newPassword) {
            showError("Mật khẩu mới phải khác mật khẩu hiện tại");
            return;
        }

        const result = await execute<ChangePasswordRes>(
            AuthService.ChangePassword(oldPassword, newPassword)
        );

        if (result?.data) {
            showSuccess("Đổi mật khẩu thành công!");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } else {
            if (result?.data?.message?.includes("Incorrect")) {
                showError("Mật khẩu hiện tại không chính xác");
            } else if (result?.data?.message?.includes("different")) {
                showError("Mật khẩu mới phải khác mật khẩu hiện tại");
            } else {
                showError("Đổi mật khẩu thất bại. Vui lòng thử lại.");
            }
        }
    };

    return (
        <div className="flex-1 px-8 py-5 bg-gray-50">
            <div className="w-fit mx-auto bg-white rounded-lg shadow-md p-5 flex gap-10">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Đổi Mật Khẩu</h1>
                    <p className="text-gray-600 mb-8">Cập nhật mật khẩu của bạn để giữ tài khoản an toàn</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Mật Khẩu Hiện Tại <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showOldPassword ? "text" : "password"}
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    placeholder="Nhập mật khẩu hiện tại"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    <i className={`fa-solid ${showOldPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                </button>
                            </div>
                        </div>


                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Mật Khẩu Mới <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Nhập mật khẩu mới"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    <i className={`fa-solid ${showNewPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Ít nhất 6 ký tự</p>
                        </div>


                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Xác Nhận Mật Khẩu <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Nhập lại mật khẩu mới"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    <i className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                </button>
                            </div>
                        </div>


                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
                            >
                                {isLoading ? (
                                    <>
                                        <i className="fa-solid fa-spinner animate-spin mr-2"></i>
                                        Đang cập nhật...
                                    </>
                                ) : (
                                    "Đổi Mật Khẩu"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8 h-fit">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <i className="fa-solid fa-shield text-blue-600"></i>
                            <h3 className="font-semibold text-blue-900">Mẹo Bảo Mật</h3>
                        </div>
                        <ul className="text-blue-800 text-sm space-y-1">
                            <li className="">• Sử dụng mật khẩu mạnh (kết hợp chữ, số, ký tự đặc biệt)</li>
                            <li>• Không chia sẻ mật khẩu với người khác</li>
                            <li>• Thay đổi mật khẩu định kỳ</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
