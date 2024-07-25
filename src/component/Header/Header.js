import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const navigate = useNavigate();
    const account = useSelector((state) => state.user.account);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    const handleLogin = () => {
        navigate("/login");
    };

    const handleRegister = () => {
        navigate("/register");
    };

    return (
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
                                title="Setting"
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item>Log in</NavDropdown.Item>
                                <NavDropdown.Item>Log out</NavDropdown.Item>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
