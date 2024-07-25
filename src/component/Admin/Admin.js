import React, { useState } from "react";
import SideBar from "./SideBar";
import "./Admin.scss";

import { FaBars } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";

import "react-perfect-scrollbar/dist/css/styles.css";
import ScrollBar from "react-perfect-scrollbar";

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            {/* react-perect-scrollbar: cuộn nhưng thanh sidebar ko đổi*/}

            <div className="admin-content">
                <div className="admin-header">
                    <FaBars onClick={() => setCollapsed(!collapsed)} />
                    <button
                        className="ms-auto me-2"
                        onClick={() => navigate("/")}
                    >
                        Quay lại trang chủ
                    </button>
                </div>
                <div className="admin-main">
                    <ScrollBar>
                        <Outlet />
                    </ScrollBar>
                </div>
            </div>
        </div>
    );
};

export default Admin;
