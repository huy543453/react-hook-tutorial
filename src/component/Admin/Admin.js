import React, { useState } from "react";
import SideBar from "./SideBar";
import "./Admin.scss";

import { FaBars } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";

import "react-perfect-scrollbar/dist/css/styles.css";
import ScrollBar from "react-perfect-scrollbar";
import { NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postLogOut } from "../../service/apiService";
import { doLogout } from "../../redux/action/userAction";
import { toast } from "react-toastify";
import Language from "../Header/Language";

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [toggled, setToggled] = useState(false);
    const [broken, setBroken] = useState(false);
    const navigate = useNavigate();
    const account = useSelector((state) => state.user.account);
    const dispatch = useDispatch();

    const handleLogOut = async () => {
        console.log(account.email, account.refresh_token);
        let res = await postLogOut(account.email, account.refresh_token);
        // Do sự can thiệp của interceptors trong file axiosCustomize nên đã trả luôn về data, không cần ghi res.data
        if (res && res.EC === 0) {
            toast.success("Đăng xuất thành công");
            dispatch(doLogout());
            navigate("/login");
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    };
    return (
        <div className="admin-container">
            <div>
                <SideBar
                    collapsed={collapsed}
                    toggled={toggled}
                    setToggled={setToggled}
                    setBroken={setBroken}
                />
            </div>
            {/* react-perect-scrollbar: cuộn nhưng thanh sidebar ko đổi*/}

            <div className="admin-content">
                <div className="admin-header">
                    <div className="leftside">
                        {broken ? (
                            <div
                                onClick={() => setToggled(!toggled)}
                                className="btn btn-primary"
                            >
                                Toggle
                            </div>
                        ) : (
                            <FaBars onClick={() => setCollapsed(!collapsed)} />
                        )}
                    </div>

                    <div className="rigthside">
                        <button onClick={() => navigate("/")}>
                            Quay lại trang chủ
                        </button>
                        <NavDropdown title="Thiết lập" id="basic-nav-dropdown">
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleLogOut()}>
                                Đăng xuất
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Language />
                    </div>
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
