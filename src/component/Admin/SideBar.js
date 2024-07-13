import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

import {
    FaTachometerAlt,
    FaGithub,
    FaRegLaughWink,
    FaReact,
} from "react-icons/fa";
import img1 from "../../assets/image/4258.png";
import img2 from "../../assets/image/4300.png";
import img3 from "../../assets/image/bg2.jpg";
import { Link } from "react-router-dom";

const SideBar = (props) => {
    const { collapsed, toggled, handleToggleSidebar } = props;
    return (
        <>
            <Sidebar
                image={img1}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <>
                    <div
                        style={{
                            padding: "24px",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                            fontSize: 14,
                            letterSpacing: "1px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        <img
                            src={img2}
                            width={"16px"}
                            height={"auto"}
                            alt=""
                        ></img>
                        &nbsp; <span>Pro SideBar</span>
                        &nbsp; <FaReact size={"2em"} />
                    </div>
                </>

                <>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaTachometerAlt />}
                            suffix={<span className="badge-red">New</span>}
                            component={<Link to="/admins" />}
                        >
                            Dashboard
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu label="Quản lý" icon={<FaRegLaughWink />}>
                            <MenuItem
                                component={<Link to="/admins/manage_users" />}
                            >
                                Quản lý User
                            </MenuItem>
                            <MenuItem>Quản lý bài Quiz</MenuItem>
                            <MenuItem>Quản lý câu hỏi</MenuItem>
                        </SubMenu>
                    </Menu>
                </>

                <div style={{ textAlign: "center" }} className="footer">
                    <div className="sidebar-btn-wrapper">
                        <a
                            href="https://github.com/azouaoui-med/react-pro-sidebar"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span
                                style={{
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                }}
                            >
                                viewSource
                            </span>
                        </a>
                    </div>
                </div>
            </Sidebar>
        </>
    );
};

export default SideBar;
