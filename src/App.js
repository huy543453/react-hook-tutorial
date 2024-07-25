import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./component/User/User";
import Admin from "./component/Admin/Admin";
import HomePage from "./component/Home/HomePage";
import ManageUser from "./component/Admin/User/ManageUser";
import Dashboard from "./component/Admin/User/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./component/Auth/Login";
import Layout from "./Layout";
import Register from "./component/Auth/Register";
import ListQuiz from "./component/User/ListQuiz";
import DetailQuiz from "./component/User/DetailQuiz";
import ManageQuiz from "./component/Admin/Quiz/ManageQuiz";
import ManageQuestion from "./component/Admin/Question/ManageQuestion";
const App = (props) => {
    const ErrorPage = () => {
        return (
            <div className="fs-3 alert alert-danger">404. Not found data</div>
        );
    };
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Route đặc biệt khi không có Outlet nào đc render*/}
                    <Route index element={<HomePage />} />
                    <Route path="users" element={<ListQuiz />} />
                </Route>
                <Route path="quiz/:id" element={<DetailQuiz />} />

                <Route path="admins" element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route path="manage_users" element={<ManageUser />} />
                    <Route path="manage_quizzes" element={<ManageQuiz />} />
                    <Route
                        path="manage_questions"
                        element={<ManageQuestion />}
                    />
                </Route>

                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    );
};

export default App;
