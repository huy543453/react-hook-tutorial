import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { getQuestionByQuiz, postSubmitQuiz } from "../../service/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResultQuiz from "./ModalResultQuiz";
import RightContent from "./Content/RightContent";
import { Breadcrumb } from "react-bootstrap";
import "react-perfect-scrollbar/dist/css/styles.css";
import ScrollBar from "react-perfect-scrollbar";

const DetailQuiz = (props) => {
    // nhận tham số từ url
    const param = useParams();
    const quizId = param.id;
    // nhận state từ navigate parent compnent ListQuiz
    const location = useLocation();
    // console.log(location.state);
    const [dataQuiz, setDataQuiz] = useState([]);
    const [currentQues, setCurrentQues] = useState(0);

    const [showResult, setShowResult] = useState(false);
    const [countTotal, setCountTotal] = useState(0);
    const [countCorrect, setCountCorrect] = useState(0);
    const [quizData, setQuizData] = useState([]);

    useEffect(() => {
        const loadQuestion = async () => {
            let res = await getQuestionByQuiz(quizId);
            // Do sự can thiệp của interceptors trong file axiosCustomize nên đã trả luôn về data, không cần ghi res.data
            if (res && res.EC === 0) {
                let raw = res.DT;
                console.log("raw", raw);
                // lodash group by question id
                let data = _.chain(raw)
                    // Group the elements of Array based on `color` property
                    .groupBy("id")
                    // `key` is group's name (color), `value` is the array of objects
                    .map((value, key) => {
                        let answer = [];
                        let questionDescrption,
                            image = null;
                        value.forEach((item, index) => {
                            // do trùng lặp nên chỉ lấy 1 lần
                            if (index === 0) {
                                questionDescrption = item.description;
                                image = item.image;
                            }
                            // thêm biến isSelected
                            item.answers.isSelected = false;
                            answer.push(item.answers);
                            // console.log(item.answers);
                        });
                        answer = _.orderBy(answer, ["id"], ["asc"]);
                        return {
                            questionsId: key,
                            // answer : value
                            answer,
                            questionDescrption,
                            image,
                        };
                    })
                    .value();

                console.log("data", data);
                setDataQuiz(data);
            }
        };
        loadQuestion();
    }, [quizId]);

    // console.log(dataQuiz);
    const handleNext = () => {
        setCurrentQues(currentQues + 1);
    };
    const handlePrev = () => {
        setCurrentQues(currentQues - 1);
    };

    const handleCheckBox = (questionId, answerId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(
            (item) => +item.questionsId === +questionId
        );
        // console.log('question',question);
        if (question && question.answer) {
            let isl = question.answer.map((item, index) => {
                if (+item.id === answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            });
            question = { ...question, answer: isl };
        }
        let index = dataQuiz.findIndex(
            (item) => +item.questionsId === +questionId
        );
        // console.log("dqci", dataQuizClone[index]);
        dataQuizClone[index] = question;
        setDataQuiz(dataQuizClone);
    };

    const handleFinish = async () => {
        // console.log("data trước finish:", dataQuiz);
        let payload = {
            quizId: +quizId,
            answers: [],
        };
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach((item) => {
                let userAnswerId = [];
                item.answer.forEach((userAnswer) => {
                    if (userAnswer.isSelected === true) {
                        userAnswerId.push(userAnswer.id);
                    }
                });
                payload.answers.push({
                    questionId: +item.questionsId,
                    userAnswerId: userAnswerId,
                });
            });
        }
        // console.log("payload", payload);

        let res = await postSubmitQuiz(payload);
        // console.log('res',res);
        // Do sự can thiệp của interceptors trong file axiosCustomize nên đã trả luôn về data, không cần ghi res.data
        if (res && res.EC === 0) {
            setShowResult(true);
            setCountTotal(res.DT.countTotal);
            setCountCorrect(res.DT.countCorrect);
            setQuizData(res.DT.quizData);
        } else {
            alert("something wrong");
        }
        // data cần để submit
        // {
        //     "quizId": 1,
        //     "answers": [
        //         {
        //             "questionId": 1,
        //             "userAnswerId": [3]
        //         },
        //         {
        //             "questionId": 2,
        //             "userAnswerId": [6]
        //         }
        //     ]
        // }
    };

    return (
        <>
            <div className="breadcrumb-container">
                <Breadcrumb>
                    <NavLink active="false" to="/" className="breadcrumb-item">
                        Trang chủ
                    </NavLink>
                    <NavLink
                        active="false"
                        to="/users"
                        className="breadcrumb-item"
                    >
                        Người dùng
                    </NavLink>
                    <NavLink active="true" className="breadcrumb-item">
                        Data
                    </NavLink>
                </Breadcrumb>
            </div>

            <ScrollBar>
                <div className="detail-quiz-container">
                    <div className="left-content">
                        <div className="title">
                            Quiz {quizId} : {location?.state?.quizTitle}
                        </div>
                        <hr />
                        <div className="content">
                            <Question
                                currentQues={currentQues}
                                data={
                                    dataQuiz && dataQuiz.length > 0
                                        ? dataQuiz[currentQues]
                                        : []
                                }
                                handleCheckBox={handleCheckBox}
                            />
                        </div>
                        <div className="text-center">
                            {currentQues > 0 && (
                                <button
                                    className="btn btn-primary me-3"
                                    onClick={() => handlePrev()}
                                >
                                    Trước
                                </button>
                            )}
                            {currentQues < dataQuiz.length - 1 && (
                                <button
                                    className="btn btn-primary me-3"
                                    onClick={() => handleNext()}
                                >
                                    Sau
                                </button>
                            )}
                            <button
                                className="btn btn-warning float-end"
                                onClick={() => handleFinish()}
                            >
                                Kết thúc
                            </button>
                        </div>
                    </div>
                    <div className="right-content">
                        <RightContent
                            dataQuiz={dataQuiz}
                            handleFinish={handleFinish}
                            setCurrentQues={setCurrentQues}
                        />
                    </div>
                    <ModalResultQuiz
                        show={showResult}
                        setShow={setShowResult}
                        countTotal={countTotal}
                        countCorrect={countCorrect}
                        quizData={quizData}
                    />
                </div>
            </ScrollBar>
        </>
    );
};

export default DetailQuiz;
