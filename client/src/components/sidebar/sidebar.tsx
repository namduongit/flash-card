import { useLocation, useNavigate } from 'react-router';
import SettingButtonComponent from '../setting-button/setting-button';

const SidebarComponent: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path: string) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.includes(path);
    };

    return (
        <div className="h-[95vh] flex flex-col space-y-6 py-5 px-4 border-r border-gray-300">
            <div className="space-y-3">
                <div
                    onClick={() => navigate('/')}
                    className={`flex items-center gap-3 px-5 py-3 rounded-lg cursor-pointer transition-all duration-300 group ${isActive('/')
                        ? 'bg-blue-700 text-white shadow-md'
                        : 'hover:bg-blue-100 hover:translate-x-1 text-gray-700'
                        }`}>
                    <i className={`fa-solid fa-house text-lg ${isActive('/') ? 'text-white' : 'text-blue-700 group-hover:text-blue-700'}`}></i>
                    <span className={`font-medium ${isActive('/') ? 'text-white' : 'group-hover:text-blue-700'}`}>Trang Chủ</span>
                </div>

                <div
                    onClick={() => navigate('/page/lesson')}
                    className={`flex items-center gap-3 px-5 py-3 rounded-lg cursor-pointer transition-all duration-300 group ${isActive('/page/lesson')
                        ? 'bg-blue-700 text-white shadow-md'
                        : 'hover:bg-blue-100 hover:translate-x-1 text-gray-700'
                        }`}>
                    <i className={`fa-solid fa-book text-lg ${isActive('/page/lesson') ? 'text-white' : 'text-blue-700 group-hover:text-blue-700'}`}></i>
                    <span className={`font-medium ${isActive('/page/lesson') ? 'text-white' : 'group-hover:text-blue-700'}`}>Bài Học</span>
                </div>

                <div
                    onClick={() => navigate('/page/exam')}
                    className={`flex items-center gap-3 px-5 py-3 rounded-lg cursor-pointer transition-all duration-300 group ${isActive('/page/exam')
                        ? 'bg-blue-700 text-white shadow-md'
                        : 'hover:bg-blue-100 hover:translate-x-1 text-gray-700'
                        }`}>
                    <i className={`fa-solid fa-file-circle-check text-lg ${isActive('/page/exam') ? 'text-white' : 'text-blue-700 group-hover:text-blue-700'}`}></i>
                    <span className={`font-medium ${isActive('/page/exam') ? 'text-white' : 'group-hover:text-blue-700'}`}>Bài Thi</span>
                </div>

                <div
                    onClick={() => navigate('/page/donation')}
                    className={`flex items-center gap-3 px-5 py-3 rounded-lg cursor-pointer transition-all duration-300 group ${isActive('/page/donation')
                        ? 'bg-blue-700 text-white shadow-md'
                        : 'hover:bg-blue-100 hover:translate-x-1 text-gray-700'
                        }`}>
                    <i className={`fa-solid fa-circle-dollar-to-slot text-lg ${isActive('/page/donation') ? 'text-white' : 'text-blue-700 group-hover:text-blue-700'}`}></i>
                    <span className={`font-medium ${isActive('/page/donation') ? 'text-white' : 'group-hover:text-blue-700'}`}>Quyên Góp</span>
                </div>
            </div>

            <div className="flex-1"></div>

            <div className="border-t border-gray-200 pt-4">
                <SettingButtonComponent />
            </div>
        </div>
    )
}

export default SidebarComponent;