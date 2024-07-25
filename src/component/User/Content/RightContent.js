import React, { useRef } from "react";
import CountDown from "./CountDown";

const RightContent = (props) => {
    const { dataQuiz, handleFinish, setCurrentQues } = props;
    // console.log("dataQuiz", dataQuiz);
    const revDiv = useRef(null);
    const timeUp = () => {
        handleFinish();
    };

    const getClassQuestion = (question) => {
        if (question && question.answer.length > 0) {
            let isAnswered = question.answer.some((a) => a.isSelected === true);
            if (isAnswered === true) {
                return "number selected";
            } else {
                return "number";
            }
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
                                onClick={() => setCurrentQues(index)}
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
