import React, { useEffect, useState } from "react";
import { getQuizByUser } from "../../service/apiService";
import "./ListQuiz.scss";
import { useNavigate } from "react-router-dom";

const ListQuiz = (props) => {
    const [arrQuiz, setArrQuiz] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        loadQuiz();
    }, []);

    const loadQuiz = async () => {
        // Do sự can thiệp của interceptors trong file axiosCustomize nên đã trả luôn về data, không cần ghi res.data
        const res = await getQuizByUser();
        if (res && res.EC === 0) {
            setArrQuiz(res.DT);
        }
    };

    return (
        // bootstrap card
        <div className="list-quiz-container">
            {arrQuiz &&
                arrQuiz.length > 0 &&
                arrQuiz.map((quiz, index) => {
                    return (
                        <div key={quiz.id}>
                            <div className="card">
                                <img
                                    src={`data:image/jpeg;base64,${quiz.image}`}
                                    className="card-img-top"
                                    alt="..."
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{index + 1}</h5>
                                    <p className="card-text">
                                        {quiz.description}
                                    </p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                            // truyền state trong navigate (dùng useLocation ở child component DetailQuiz)
                                            navigate(`/quiz/${quiz.id}`, {
                                                state: {
                                                    quizTitle: quiz.description,
                                                },
                                            })
                                        }
                                    >
                                        Start now
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}

            {arrQuiz && arrQuiz.length === 0 && (
                <div className="text-danger fs-4 mx-auto">
                    Bạn không có bài thi nào
                </div>
            )}
        </div>
    );
};

export default ListQuiz;
