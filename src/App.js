import "./App.scss";
import Header from "./component/Header/Header";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import { Outlet } from "react-router-dom";
const App = () => {
    return (
        <div className="">
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

export default App;
