import React from "react";
import ReactPaginate from "react-paginate";

const TableUserPaginate = (props) => {
    const {
        users,
        setShowModalUpdate,
        updateUser,
        setShowModalView,
        setShowModalDelete,
        deleteUser,
        pageCount,
    } = props;

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        props.loadUserPaginate(+event.selected + 1);
        props.setCurrentPage(+event.selected + 1);
    };

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
                                    <td className="text-center">{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-info mx-1"
                                            onClick={() => {
                                                setShowModalView(true);
                                                updateUser(user);
                                            }}
                                        >
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
                                        <button
                                            className="btn btn-danger mx-1"
                                            onClick={() => {
                                                setShowModalDelete(true);
                                                deleteUser(user);
                                            }}
                                        >
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
            <div className="d-flex justify-content-center">
                <ReactPaginate
                    nextLabel="Sau >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Trước"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    // khi thay đổi thì sẽ quay lại trang 1
                    forcePage={props.currentPage - 1}
                />
            </div>
        </div>
    );
};

export default TableUserPaginate;
