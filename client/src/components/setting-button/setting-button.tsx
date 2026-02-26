import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts/auth-context";
import { useConfirm } from "../../hooks/confirm";

const SettingButtonComponent: React.FC = () => {
    const navigate = useNavigate();
    const { clearAuth } = useContext(AuthContext);
    const { showConfirm } = useConfirm();

    const [isClicked, setIsClicked] = useState(false);

    const handleLogout = async () => {
        const result = await showConfirm("Xác nhận đăng xuất", "Bạn có chắc chắn muốn đăng xuất không?", { confirmText: "Đăng Xuất", cancelText: "Hủy" });
        if (!result) return;
        clearAuth();
        navigate("/auth/login");
    };

    return (
        <div className="relative px-5 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-100 group"
            onClick={() => {
                setIsClicked(!isClicked);
            }}>
            <button className="flex items-center gap-3">
                <i className="fa-solid fa-gear text-lg text-gray-600 group-hover:text-gray-800"></i>
                <span className="font-medium text-gray-700 group-hover:text-gray-800">Cài Đặt</span>
            </button>

            {isClicked && (
                <div className="absolute w-50 -top-[400%] left-0 rounded-lg shadow-lg bg-white p-2 z-50 flex flex-col space-y-2 text-gray-800">
                    <button 
                        onClick={() => {
                            navigate("/page/profile");
                            setIsClicked(false);
                        }}
                        className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 hover:translate-x-1 transition-all duration-200 hover:font-semibold"
                    >
                        <i className="fa-solid fa-circle-user"></i>
                        <span>Thông tin cá nhân</span>
                    </button>
                    <button 
                        onClick={() => {
                            navigate("/page/change-password");
                            setIsClicked(false);
                        }}
                        className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 hover:translate-x-1 transition-all duration-200 hover:font-semibold"
                    >
                        <i className="fa-solid fa-key"></i>
                        <span>Đổi mật khẩu</span>
                    </button>
                  
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 p-2 rounded hover:bg-red-50 hover:translate-x-1 transition-all duration-200 hover:font-semibold text-red-600"
                    >
                        <i className="fa-solid fa-sign-out-alt"></i>
                        <span>Đăng Xuất</span>
                    </button>
                </div>
            )}
        </div>
    )
}

export default SettingButtonComponent;