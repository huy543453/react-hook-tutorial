import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

import {
    FaTachometerAlt,
    FaRegLaughWink,
    FaReact,
    FaRegUser,
    FaRegQuestionCircle,
} from "react-icons/fa";
import { MdOutlineQuiz } from "react-icons/md";

import img2 from "../../assets/image/bg2.jpg";

import { Link, useNavigate } from "react-router-dom";
const SideBar = (props) => {
    const { collapsed, toggled, setToggled, setBroken } = props;
    const navigate = useNavigate();
    const menuItemStyles = {
        subMenuContent: () => ({
            backgroundColor: "rgb(12 41 72)",
        }),
        button: {
            "&:hover, &:active, &:focus": {
                backgroundColor: "#00458b",
                color: "#b6c8d9",
                border: "1px solid black",
            },
            onBlur: (e) => {
                if (!e.relatedTarget) {
                    e.target.focus();
                }
            },
        },
    };
    return (
        <div
            style={{
                display: "flex",
                height: "100%",
                color: "rgb(139, 161, 183)",
            }}
        >
            <Sidebar
                collapsed={collapsed}
                width="300px"
                backgroundColor="rgb(12 41 72)"
                toggled={toggled}
                onBreakPoint={setBroken}
                onBackdropClick={() => setToggled(false)}
                breakPoint="md"
            >
                <div
                    style={{
                        textAlign: "center",
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
                    <img src={img2} width={"16px"} height={"auto"} alt=""></img>
                    &nbsp;{" "}
                    <span onClick={() => navigate("/")}>Pro SideBar</span>
                    &nbsp; <FaReact size={"2em"} />
                </div>

                <Menu menuItemStyles={menuItemStyles}>
                    <MenuItem
                        icon={<FaTachometerAlt />}
                        suffix={<span className="badge-red">New</span>}
                        component={<Link to="/admins" />}
                    >
                        Dashboard
                    </MenuItem>

                    <SubMenu label="Quản lý" icon={<FaRegLaughWink />}>
                        <MenuItem
                            icon={<FaRegUser />}
                            component={<Link to="/admins/manage_users" />}
                        >
                            Quản lý User
                        </MenuItem>
                        <MenuItem
                            icon={<MdOutlineQuiz />}
                            component={<Link to="/admins/manage_quizzes" />}
                        >
                            Quản lý bài Quiz
                        </MenuItem>
                        <MenuItem
                            icon={<FaRegQuestionCircle />}
                            component={<Link to="/admins/manage_questions" />}
                        >
                            Quản lý câu hỏi
                        </MenuItem>
                    </SubMenu>
                </Menu>
            </Sidebar>
        </div>
    );
};

export default SideBar;
