import React, { useEffect } from "react";
import { useState } from "react";
import ModalAdd from "./ModalAdd";
import "./ManageUser.scss";
import { IoMdAddCircleOutline } from "react-icons/io";
// import TableUser from "./TableUser";
import { getAllUser } from "../../../service/apiService";
import ModalUpdate from "./ModalUpdate";
import ModalView from "./ModalView";
import ModalDelete from "./ModalDelete";
import TableUserPaginate from "./TableUserPaginate";
import { getUserWithPaginate } from "../../../service/apiService";
import { IoMdSearch } from "react-icons/io";

const ManageUser = (props) => {
    const [limitUser, setLimitUser] = useState(5);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    const [users, setUsers] = useState([]);
    const [userUpdate, setUserUpdate] = useState({});
    const [userDelete, setUserDelete] = useState({});
    const [userFindName, setUserFindName] = useState();

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
        let res = await getUserWithPaginate(page, limitUser);
        if (res.EC === 0) {
            let usersClone = res.DT.users;
            // userClone = _.orderBy(userClone, ["username"], ["ASC"]);
            setUsers(usersClone);
            setPageCount(res.DT.totalPages);
        }
    };

    const updateUser = (user) => {
        setUserUpdate(user);
    };

    const deleteUser = (user) => {
        setUserDelete(user);
    };

    const handleFindUser = async () => {
        let res = await getUserWithPaginate(1, limitUser);
        if (res.EC === 0) {
            let usersClone = res.DT.users;
            usersClone = usersClone.filter((item) =>
                item.username.includes(userFindName)
            );
            // userClone = _.orderBy(userClone, ["username"], ["ASC"]);
            setUsers(usersClone);
            setPageCount(res.DT.totalPages);
        }
    };
    // console.log("users", users);
    // console.log("limitUser", limitUser);

    return (
        <div className="manage-user-container">
            <div className="title">Quản lý người dùng</div>
            <div className="content">
                <div className="btn-add">
                    <button
                        className="btn btn-primary border-rounded-1"
                        onClick={() => setShowModalAdd(true)}
                    >
                        <IoMdAddCircleOutline /> Thêm người dùng
                    </button>
                </div>
                {/* Thanh tìm kiếm */}
                <div className="d-flex justify-content-between">
                    <div className="input-group w-25 ">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập tên"
                            onChange={(event) =>
                                setUserFindName(event.target.value)
                            }
                        />
                        <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={() => handleFindUser()}
                        >
                            <IoMdSearch />
                        </button>
                    </div>
                    <div className="input-group w-25 ">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập số giới hạn user"
                            onChange={(event) =>
                                setLimitUser(event.target.value)
                            }
                        />
                        <button
                            className="btn btn-outline-primary"
                            type="button"
                        >
                            <IoMdSearch onClick={() => loadUserPaginate(1)} />
                        </button>
                    </div>
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
