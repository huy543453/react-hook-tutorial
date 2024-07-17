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
import ModalView from "./ModalView";
import ModalDelete from "./ModalDelete";
import TableUserPaginate from "./TableUserPaginate";
import { getUserWithPaginate } from "../../../service/apiService";

const ManageUser = (props) => {
    const limit_user = 5;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    const [users, setUsers] = useState([]);
    const [userUpdate, setUserUpdate] = useState({});
    const [userDelete, setUserDelete] = useState({});

    useEffect(() => {
        // loadUser();
        loadUserPaginate(1);
    }, []);

    const loadUser = async () => {
        let res = await getAllUser();
        if (res.EC === 0) {
            setUsers(res.DT);
        }
    };

    const loadUserPaginate = async (page) => {
        let res = await getUserWithPaginate(page, limit_user);
        if (res.EC === 0) {
            setUsers(res.DT.users);
            setPageCount(res.DT.totalPages);
        }
    };

    const updateUser = (user) => {
        setUserUpdate(user);
    };

    const deleteUser = (user) => {
        setUserDelete(user);
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
                    {/* <TableUser
                        users={users}
                        setShowModalUpdate={setShowModalUpdate}
                        updateUser={updateUser}
                        setShowModalView={setShowModalView}
                        setShowModalDelete={setShowModalDelete}
                        deleteUser={deleteUser}
                    /> */}

                    <TableUserPaginate
                        users={users}
                        setShowModalUpdate={setShowModalUpdate}
                        updateUser={updateUser}
                        setShowModalView={setShowModalView}
                        setShowModalDelete={setShowModalDelete}
                        deleteUser={deleteUser}
                        loadUserPaginate={loadUserPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalAdd
                    show={showModalAdd}
                    setShow={setShowModalAdd}
                    loadUser={loadUser}
                    loadUserPaginate={loadUserPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <ModalUpdate
                    show={showModalUpdate}
                    setShow={setShowModalUpdate}
                    userUpdate={userUpdate}
                    setUserUpdate={setUserUpdate}
                    loadUser={loadUser}
                    loadUserPaginate={loadUserPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <ModalView
                    show={showModalView}
                    setShow={setShowModalView}
                    userView={userUpdate}
                    setUserView={setUserUpdate}
                />

                <ModalDelete
                    show={showModalDelete}
                    setShow={setShowModalDelete}
                    userDelete={userDelete}
                    loadUser={loadUser}
                    loadUserPaginate={loadUserPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default ManageUser;
