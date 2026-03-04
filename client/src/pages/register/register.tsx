import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthService } from '../../services/AuthService';
import type { RegisterRes } from '../../common/types/auth-type';
import { requireContext } from '../../utils/require-context';
import { ExecuteContext, type ExecuteContextType } from '../../contexts/execute/execute-context';
import { AuthContext, type AuthContextType } from '../../contexts/providers/authentication-context';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const navigate = useNavigate();

  const { execute, isLoading } = requireContext<ExecuteContextType>(ExecuteContext).ExecuteQuery();
  const { saveAuthState } = requireContext<AuthContextType>(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await execute<RegisterRes>(AuthService.Register(email, password), {
      isConfirm: true,
      success: {
        isWait: true,
        message: {
          type: "success",
          title: "Đăng ký thành công",
          content: "Bạn đã đăng ký thành công. Chuyển hướng đến trang đăng nhập..."
        },
        onSuccess: (result) => {
          if (result && result.data) {
            saveAuthState(result.data);
            setTimeout(() => {
              navigate("/");
            }, 500);
          }
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Đăng Ký
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Tạo tài khoản mới của bạn
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Xác Nhận Mật Khẩu
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {showConfirmPassword ? 'Ẩn' : 'Xem'}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-2">
            <input
              id="terms"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              disabled={isLoading}
              className="w-4 h-4 mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              Tôi đồng ý với{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                Điều khoản sử dụng
              </a>{' '}
              và{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                Chính sách bảo mật
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading || !agreeTerms}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed mt-6 flex items-center justify-center"
          >
            {isLoading && <i className="fa-solid fa-spinner animate-spin mr-2"></i>}
            {isLoading ? 'Đang đăng ký...' : 'Đăng Ký'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Đã có tài khoản?{' '}
          <Link to="/auth/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">
            Đăng Nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
