import React from "react";
import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";

const Question = (props) => {
    const { data, currentQues } = props;
    // console.log("data", data);
    const answers = data.answer;
    // console.log('answer',answers);

    const [isPreviewImage, setIsPreviewimage] = useState(false);

    if (_.isEmpty(data)) {
        return <></>;
    }

    const handleCheckBox2 = (idQuestion, idAnswer) => {
        props.handleCheckBox(idQuestion, idAnswer);
    };

    return (
        <>
            <div className="image">
                {data.image !== "" ? (
                    <img
                        src={`data:image/jpeg;base64,${data.image}`}
                        alt=""
                        onClick={() => {
                            setIsPreviewimage(true);
                        }}
                    />
                ) : (
                    <img alt="" />
                )}
            </div>

            <div className="question">
                Question {currentQues + 1}: {data.questionDescrption}?
            </div>
            <div className="answer">
                {answers &&
                    answers.length > 0 &&
                    // câu hỏi
                    answers.map((answer, index) => {
                        return (
                            // bootstrap checkbox
                            <div key={`answer-${index}`}>
                                <div className="form-check">
                                    <input
                                        className="form-check-input border border-black"
                                        type="checkbox"
                                        // click vào text vẫn tick vào ô
                                        id={`answer-${index}`}
                                        checked={answer.isSelected}
                                        onChange={() =>
                                            handleCheckBox2(
                                                data.questionsId,
                                                answer.id
                                            )
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={`answer-${index}`}
                                    >
                                        {answer.description}
                                    </label>
                                </div>
                            </div>
                        );
                    })}
            </div>
            {/* Xem ảnh được phóng to  react awesome lightbox*/}
            {isPreviewImage === true && (
                <Lightbox
                    image={`data:image/jpeg;base64,${data.image}`}
                    onClose={() => setIsPreviewimage(false)}
                ></Lightbox>
            )}
        </>
    );
};

export default Question;
