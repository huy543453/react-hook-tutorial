import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postLogOut } from "../../service/apiService";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import Language from "./Language";
import ModalUser from "./ModalUser";

const Header = () => {
    const navigate = useNavigate();
    const account = useSelector((state) => state.user.account);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    const [contentShow, setContentShow] = useState("");

    const handleLogin = () => {
        navigate("/login");
    };

    const handleRegister = () => {
        navigate("/register");
    };

    const handleLogOut = async () => {
        // console.log(account.email, account.refresh_token);
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
        <>
            <Navbar expand="lg" className="bg-body-secondary py-3">
                <Container>
                    <NavLink to={"/"} className="navbar-brand">
                        React Hook
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to={"/"} className="nav-link">
                                Home
                            </NavLink>
                            <NavLink to={"/admins"} className="nav-link">
                                Admin
                            </NavLink>
                            <NavLink to={"/users"} className="nav-link">
                                User
                            </NavLink>
                            {/* <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/users">User</Nav.Link>
                    <Nav.Link href="/admins">Admin</Nav.Link> */}
                        </Nav>
                        <Nav>
                            {!isAuthenticated ? (
                                <>
                                    <button
                                        className="mx-2 px-2 border-2 rounded-2 btn btn-outline-primary"
                                        onClick={() => handleLogin()}
                                    >
                                        Đăng nhập
                                    </button>
                                    <button
                                        className="mx-2 px-2 border-2 rounded-2 btn btn-outline-secondary"
                                        onClick={() => handleRegister()}
                                    >
                                        Đăng ký
                                    </button>
                                </>
                            ) : (
                                <NavDropdown
                                    title="Thiết lập"
                                    id="basic-nav-dropdown"
                                >
                                    <NavDropdown.Item>
                                        <span
                                            onClick={() => {
                                                setShowModal(true);
                                                setContentShow("profile");
                                            }}
                                        >
                                            Thông tin cá nhân
                                        </span>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item>
                                        <span
                                            onClick={() => {
                                                setShowModal(true);
                                                setContentShow(
                                                    "change-password"
                                                );
                                            }}
                                        >
                                            Đổi mật khẩu
                                        </span>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item>
                                        <span
                                            onClick={() => {
                                                setShowModal(true);
                                                setContentShow("history");
                                            }}
                                        >
                                            Lịch sử làm bài
                                        </span>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item
                                        onClick={() => handleLogOut()}
                                    >
                                        Đăng xuất
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )}
                            <Language />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <ModalUser
                show={showModal}
                setShow={setShowModal}
                contentShow={contentShow}
            />
        </>
    );
};

export default Header;
