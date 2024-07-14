import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddModal from "./AddModal";
import "./ManageUser.scss";
import { IoMdAddCircleOutline } from "react-icons/io";
import TableUser from "./TableUser";
import { getAllUser } from "../../../service/apiService";

const ManageUser = (props) => {
    const [show, setShow] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        let res = await getAllUser();
        if (res.EC === 0) {
            setUsers(res.DT);
        }
    };
    return (
        <div className="manage-user-container">
            <div className="title">Quản lý người dùng</div>
            <div className="content">
                <div className="btn-add">
                    <button
                        className="btn btn-primary border-rounded-1"
                        onClick={() => setShow(true)}
                    >
                        <IoMdAddCircleOutline /> Thêm người dùng
                    </button>
                </div>
                <div className="table-container">
                    <TableUser users={users} />
                </div>
                <AddModal show={show} setShow={setShow} loadUser={loadUser} />
            </div>
        </div>
    );
};

export default ManageUser;
