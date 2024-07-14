import React from "react";
import { getAllUser } from "../../../service/apiService";

const TableUser = (props) => {
    const { users } = props;

    return (
        <>
            <table className="table table-bordered table-hover border-black mt-4">
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
                                    <td scope="row" className="text-center">
                                        {index + 1}
                                    </td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td className="text-center">
                                        <button className="btn btn-info mx-1">
                                            Xem
                                        </button>
                                        <button className="btn btn-warning mx-1">
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
        </>
    );
};

export default TableUser;
