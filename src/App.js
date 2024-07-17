import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./component/User/User";
import Admin from "./component/Admin/Admin";
import HomePage from "./component/Home/HomePage";
import ManageUser from "./component/Admin/Content/ManageUser";
import Dashboard from "./component/Admin/Content/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./component/Auth/Login";
import Layout from "./Layout";
import Register from "./component/Auth/Register";
const App = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Route đặc biệt khi không có Outlet nào đc render*/}
                    <Route index element={<HomePage />} />
                    <Route path="users" element={<User />} />
                </Route>

                <Route path="admins" element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route path="manage_users" element={<ManageUser />} />
                </Route>

                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    );
};

export default App;
