import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./component/User/User";
import Admin from "./component/Admin/Admin";
import HomePage from "./component/Home/HomePage";
import ManageUser from "./component/Admin/Content/ManageUser";
import Dashboard from "./component/Admin/Content/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        {/* <React.StrictMode> */}
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    {/* Route đặc biệt khi không có Outlet nào đc render*/}
                    <Route index element={<HomePage />} />
                    <Route path="users" element={<User />} />
                </Route>
                <Route path="admins" element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route path="manage_users" element={<ManageUser />} />
                </Route>
            </Routes>
            <ToastContainer />
        </BrowserRouter>
        {/* </React.StrictMode> */}
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
