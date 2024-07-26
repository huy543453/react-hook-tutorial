import React, { createRef, useRef } from "react";
import CountDown from "./CountDown";

const RightContent = (props) => {
    const { dataQuiz, handleFinish, setCurrentQues } = props;
    // console.log("dataQuiz", dataQuiz);
    const refDiv = useRef([]);
    refDiv.current =
        dataQuiz &&
        dataQuiz.length > 0 &&
        dataQuiz.map((question, i) => refDiv.current[i] ?? createRef());

    const timeUp = () => {
        handleFinish();
    };

    const getClassQuestion = (question) => {
        if (question && question.answer.length > 0) {
            // chỉ cần 1 phần tử t/m điều kiện thì trả về true
            let isAnswered = question.answer.some((a) => a.isSelected === true);
            if (isAnswered === true) {
                return "number selected";
            } else {
                return "number";
            }
        }
    };

    const handleClickQuestion = (ref) => {
        refDiv.current.map((item) => {
            if (item.current.className === "number clicked") {
                item.current.className = "number";
            }
            if (item.current.className === "number selected clicked") {
                item.current.className = "number selected";
            }
        });
        // console.log(refDiv);
        if (ref.current.className === "number") {
            ref.current.className = "number clicked";
        }
        if (ref.current.className === "number selected") {
            ref.current.className = "number selected clicked";
        }
    };

    return (
        <>
            <div className="timer">
                <CountDown timeUp={timeUp} />
            </div>
            <div className="question-number">
                {dataQuiz &&
                    dataQuiz.length > 0 &&
                    dataQuiz.map((question, index) => {
                        return (
                            <div
                                className={getClassQuestion(question)}
                                key={index}
                                onClick={() => {
                                    setCurrentQues(index);
                                    handleClickQuestion(refDiv.current[index]);
                                }}
                                ref={refDiv.current[index]}
                            >
                                {index + 1}
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default RightContent;
