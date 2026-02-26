import { Outlet } from "react-router"
import HeaderComponent from "../components/header/header"
import SidebarComponent from "../components/sidebar/sidebar"
import FooterComponent from "../components/footer/footer"

const MainLayout: React.FC = () => {
    return (
        <div>
             <HeaderComponent />
            <div className="flex">
                <SidebarComponent />
                <Outlet />
            </div>
            <FooterComponent />
        </div>
    )
}

export default MainLayout;