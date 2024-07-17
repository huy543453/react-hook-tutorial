import "./Layout.scss";
import Header from "./component/Header/Header";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import { Outlet } from "react-router-dom";
const Layout = (props) => {
    return (
        <div className="app-container">
            <div className="header-container">
                <Header />
            </div>
            <div className="main-container">
                <div className="sidenav-container"></div>
                <div className="app-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
