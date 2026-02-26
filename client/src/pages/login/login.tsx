import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthService } from '../../services/AuthService';
import { useNotification } from '../../hooks/notification';
import { useExecute } from '../../hooks/execute';
import { AuthContext } from '../../contexts/auth-context';
import type { LoginRes } from '../../common/types/auth-type';
import { MessageContext } from '../../contexts/message-context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { saveStateAuth } = useContext(AuthContext);

  const { execute, isLoading } = useExecute();

  const { showError } = useNotification();
  const useMessage = useContext(MessageContext);

  const handleSubmit = async (e: React.FormEvent) => {
  
    e.preventDefault();

    if (!email || !password) {
      showError("Vui lòng nhập email và mật khẩu");
      return;
    }
    const result = await execute<LoginRes>(AuthService.Login(email, password));
    if (result?.data) {
      saveStateAuth(result.data);
      setTimeout(() => {
        navigate("/");
      }, 500);
    } else {
      useMessage?.addMessage({
        type: "error",
        title: "Đăng nhập thất bại",
        content: "Tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại."
      });
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Đăng Nhập
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Chào mừng bạn quay lại
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mật Khẩu
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {showPassword ? 'Ẩn' : 'Xem'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading && <i className="fa-solid fa-spinner animate-spin mr-2"></i>}
            {isLoading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Chưa có tài khoản?{' '}
          <Link to="/auth/register" className="text-indigo-600 hover:text-indigo-700 font-semibold">
            Đăng Ký Ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
