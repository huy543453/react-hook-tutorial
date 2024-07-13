import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddModal from "./AddModal";
import "./ManageUser.scss";
import { IoMdAddCircleOutline } from "react-icons/io";

const ManageUser = (props) => {
    const [show, setShow] = useState(false);
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
                <div className="table-container">Table</div>
                <AddModal show={show} setShow={setShow} />
            </div>
        </div>
    );
};

export default ManageUser;
