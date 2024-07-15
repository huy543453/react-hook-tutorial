import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalAdd from "./ModalAdd";
import "./ManageUser.scss";
import { IoMdAddCircleOutline } from "react-icons/io";
import TableUser from "./TableUser";
import { getAllUser } from "../../../service/apiService";
import ModalUpdate from "./ModalUpdate";

const ManageUser = (props) => {
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);

    const [users, setUsers] = useState([]);
    const [userUpdate, setUserUpdate] = useState({});

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        let res = await getAllUser();
        if (res.EC === 0) {
            setUsers(res.DT);
        }
    };

    const updateUser = (user) => {
        setUserUpdate(user);
    };

    return (
        <div className="manage-user-container">
            <div className="title">Quản lý người dùng</div>
            <div className="content">
                <div className="btn-add me-5">
                    <button
                        className="btn btn-primary border-rounded-1"
                        onClick={() => setShowModalAdd(true)}
                    >
                        <IoMdAddCircleOutline /> Thêm người dùng
                    </button>
                </div>
                <div className="table-container">
                    <TableUser
                        users={users}
                        setShowModalUpdate={setShowModalUpdate}
                        updateUser={updateUser}
                    />
                </div>
                <ModalAdd
                    show={showModalAdd}
                    setShow={setShowModalAdd}
                    loadUser={loadUser}
                />

                <ModalUpdate
                    show={showModalUpdate}
                    setShow={setShowModalUpdate}
                    userUpdate={userUpdate}
                    setUserUpdate={setUserUpdate}
                    loadUser={loadUser}
                />
            </div>
        </div>
    );
};

export default ManageUser;
