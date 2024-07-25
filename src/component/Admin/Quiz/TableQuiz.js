import React from "react";

const TableQuiz = (props) => {
    const {
        quizzes,
        setShowModalUpdate,
        updateQuiz,
        setShowModalView,
        setShowModalDelete,
        deleteQuiz,
    } = props;

    return (
        <div className="col-md-12">
            <table className="table table-bordered table-hover border-black my-2">
                <thead>
                    <tr className="text-center">
                        <th scope="col">STT</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">Độ khó</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {quizzes && quizzes.length > 0 ? (
                        quizzes.map((quiz, index) => {
                            return (
                                <tr key={quiz.id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td>{quiz.name}</td>
                                    <td>{quiz.description}</td>
                                    <td>{quiz.difficulty}</td>
                                    <td className="text-center td-action w-25">
                                        <button
                                            className="btn btn-info mx-1"
                                            onClick={() => {
                                                setShowModalView(true);
                                                updateQuiz(quiz);
                                            }}
                                        >
                                            Xem
                                        </button>
                                        <button
                                            className="btn btn-warning mx-1"
                                            onClick={() => {
                                                setShowModalUpdate(true);
                                                updateQuiz(quiz);
                                            }}
                                        >
                                            Cập nhật
                                        </button>
                                        <button
                                            className="btn btn-danger mx-1"
                                            onClick={() => {
                                                setShowModalDelete(true);
                                                deleteQuiz(quiz);
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
        </div>
    );
};

export default TableQuiz;
