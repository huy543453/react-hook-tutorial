import React, { useEffect, useState } from "react";
import { getHistortyDoQuiz } from "../../service/apiService";

const History = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        let res = await getHistortyDoQuiz();
        // Do sự can thiệp của interceptors trong file axiosCustomize nên đã trả luôn về data, không cần ghi res.data
        if (res && res.EC === 0) {
            setQuizzes(res.DT.data);
        }
    };
    // console.log("quiz", quizzes);

    return (
        <>
            <div className="historty-container">
                <table className="table table-hover table-bordered">
                    <thead className="text-center">
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên quiz</th>
                            <th scope="col" className="w-25">
                                Mô tả
                            </th>
                            <th scope="col">Số câu hỏi</th>
                            <th scope="col">Số câu đúng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizzes &&
                            quizzes.length > 0 &&
                            quizzes.map((item, index) => {
                                return (
                                    <tr key={quizzes.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.quizHistory.name}</td>
                                        <td>{item.quizHistory.description}</td>
                                        <td>{item.total_questions}</td>
                                        <td>{item.total_correct}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default History;
