import { useLocation, useNavigate } from 'react-router';

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
                    className={`flex items-center gap-3 px-5 py-3 rounded-lg cursor-pointer transition-all duration-300 group ${
                    isActive('/') 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'hover:bg-blue-100 hover:translate-x-1 text-gray-700'
                }`}>
                    <i className={`fa-solid fa-house text-lg ${isActive('/') ? 'text-white' : 'text-blue-700 group-hover:text-blue-700'}`}></i>
                    <span className={`font-medium ${isActive('/') ? 'text-white' : 'group-hover:text-blue-700'}`}>Trang Chủ</span>
                </div>

                <div 
                    onClick={() => navigate('/page/lesson')}
                    className={`flex items-center gap-3 px-5 py-3 rounded-lg cursor-pointer transition-all duration-300 group ${
                    isActive('/page/lesson') 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'hover:bg-blue-100 hover:translate-x-1 text-gray-700'
                }`}>
                    <i className={`fa-solid fa-book text-lg ${isActive('/page/lesson') ? 'text-white' : 'text-blue-700 group-hover:text-blue-700'}`}></i>
                    <span className={`font-medium ${isActive('/page/lesson') ? 'text-white' : 'group-hover:text-blue-700'}`}>Bài Học</span>
                </div>
                
                <div 
                    onClick={() => navigate('/page/examing')}
                    className={`flex items-center gap-3 px-5 py-3 rounded-lg cursor-pointer transition-all duration-300 group ${
                    isActive('/page/examing') 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'hover:bg-blue-100 hover:translate-x-1 text-gray-700'
                }`}>
                    <i className={`fa-solid fa-file-circle-check text-lg ${isActive('/page/examing') ? 'text-white' : 'text-blue-700 group-hover:text-blue-700'}`}></i>
                    <span className={`font-medium ${isActive('/page/examing') ? 'text-white' : 'group-hover:text-blue-700'}`}>Bài Thi</span>
                </div>
            </div>

            <div className="flex-1"></div>

            <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center gap-3 px-5 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-100 hover:translate-x-1 group">
                    <i className="fa-solid fa-gear text-lg text-gray-600 group-hover:text-gray-800"></i>
                    <span className="font-medium text-gray-700 group-hover:text-gray-800">Cài Đặt</span>
                </div>
            </div>
        </div>
    )
}

export default SidebarComponent;