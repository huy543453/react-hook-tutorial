import React from "react";

const TableUser = (props) => {
    const { users, setShowModalUpdate, updateUser } = props;

    return (
        <div className="col-md-11 ms-5">
            <table className="table table-bordered table-hover border-black mt-4 me-4">
                <thead>
                    <tr className="text-center">
                        <th scope="col">STT</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Email</th>
                        <th scope="col">Vai trò</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length > 0 ? (
                        users.map((user, index) => {
                            return (
                                <tr key={user.id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td className="text-center">
                                        <button className="btn btn-info mx-1">
                                            Xem
                                        </button>
                                        <button
                                            className="btn btn-warning mx-1"
                                            onClick={() => {
                                                setShowModalUpdate(true);
                                                updateUser(user);
                                            }}
                                        >
                                            Cập nhật
                                        </button>
                                        <button className="btn btn-danger mx-1">
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr className="text-danger text-center">
                            <td className="text-danger text-center" colSpan="6">
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableUser;
