import { Outlet } from "react-router"
import HeaderComponent from "../components/header/header"
import SidebarComponent from "../components/sidebar/sidebar"
import FooterComponent from "../components/footer/footer"
import AddLessonModal from "../components/add-modal/add-lesson"
import AddWordModal from "../components/add-modal/add-word"

const MainLayout: React.FC = () => {
    return (
        <div>
             <HeaderComponent />
            <div className="flex">
                <SidebarComponent />
                <Outlet />
            </div>
            <FooterComponent />
            <AddLessonModal />
            <AddWordModal />
        </div>
    )
}

export default MainLayout;