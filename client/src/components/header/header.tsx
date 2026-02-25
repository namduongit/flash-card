import { useContext } from "react";
import { Link, useLocation } from "react-router";
import { AuthContext } from "../../contexts/auth-context";

const HeaderComponent: React.FC = () => {
    const { isAuthenticated, authState } = useContext(AuthContext);
    const location = useLocation();

    const isAuthPage = location.pathname === "/auth/login" || location.pathname === "/auth/register";

    return (
        <header className="bg-white shadow flex h-[5vh]">
            <div className="w-full flex justify-between items-center px-5">
                <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
                    <i className="fa-solid fa-book text-2xl text-indigo-600"></i>
                    <span className="font-bold text-xl text-gray-900">FlashCard</span>
                </Link>

                <div className="flex items-center gap-4">
                    {isAuthenticated && !isAuthPage ? (
                        <span>
                            Good {new Date().getHours() < 12 ? "Morning" : "Afternoon"}, {(authState as any)?.account?.email?.split("@")[0] || "User"}!
                        </span>
                    ) : isAuthPage ? null : (
                        <div className="flex gap-2">
                            <Link
                                to="/auth/login"
                                className="px-4 py-2 text-indigo-600 font-semibold hover:text-indigo-700 transition"
                            >
                                Đăng Nhập
                            </Link>
                            <Link
                                to="/auth/register"
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                            >
                                Đăng Ký
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default HeaderComponent;