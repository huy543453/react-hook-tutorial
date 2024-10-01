import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./ManageQA.scss";
import { LuPlusCircle } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import { getAllQuiz, getQuizQA } from "../../../service/apiService";
import { postUpsertQA } from "../../../service/apiService";
import { toast } from "react-toastify";

// const options = [
//     { value: "chocolate", label: "Chocolate" },
//     { value: "strawberry", label: "Strawberry" },
//     { value: "vanilla", label: "Vanilla" },
// ];
const ManageQA = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    // console.log("selectquiz", selectedQuiz);
    // console.log("listquiz", listQuiz);
    const initQuestions = [
        {
            id: uuidv4(),
            description: "",
            imageFile: "",
            imageName: "",
            answers: [{ id: uuidv4(), description: "", isCorrect: false }],
        },
    ];
    const [questions, setQuestions] = useState(initQuestions);
    // console.log("questions", questions);
    const [isPreviewImage, setIsPreviewimage] = useState(false);
    const [dataPreviewImage, setDataPreviewImage] = useState({
        url: "",
        title: "",
    });

    useEffect(() => {
        loadQuiz();
    }, [props.loadQuizAgain]);
    // console.log(listQuiz);

    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            loadQuizQA();
        }
    }, [selectedQuiz]);

    const loadQuiz = async () => {
        let res = await getAllQuiz();
        // Do sự can thiệp của interceptors trong file axiosCustomize nên đã trả luôn về data, không cần ghi res.data
        if (res && res.EC === 0) {
            let quiz = res.DT.map((item) => {
                return { value: item.id, label: `${item.id} - ${item.name}` };
            });
            setListQuiz(quiz);
        }
    };

    const loadQuizQA = async () => {
        let res = await getQuizQA(selectedQuiz.value);
        // Do sự can thiệp của interceptors trong file axiosCustomize nên đã trả luôn về data, không cần ghi res.data
        if (res && res.EC === 0) {
            // Convert base64 to file JavaScript
            let newQA = [];
            for (let i = 0; i < res.DT.qa.length; i++) {
                let q = res.DT.qa[i];
                if (q.imageFile) {
                    q.imageName = `Question-${q.id}.png`;
                    q.imageFile = await urltoFile(
                        `data:image/png;base64,${q.imageFile}`,
                        `Question-${q.id}.png`,
                        "image/png"
                    );
                }
                newQA.push(q);
            }
            setQuestions(res.DT.qa);
        }
    };
    // console.log("questions", questions);

    // Convert base64 to file JavaScript
    const urltoFile = async (url, filename, mimeType) => {
        return fetch(url)
            .then((res) => res.arrayBuffer())
            .then((buf) => new File([buf], filename, { type: mimeType }));
    };

    const handleOnchangeDescirption = (event, type, questionId, answerId) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex((item) => item.id === questionId);
        if (type === "QUESTION" && index > -1) {
            questionClone[index].description = event.target.value;
            setQuestions(questionClone);
        } else if (type === "ANSWER" && index > -1) {
            let indexAnswer = questionClone[index].answers.findIndex(
                (item) => item.id === answerId
            );
            if (indexAnswer > -1) {
                questionClone[index].answers[indexAnswer].description =
                    event.target.value;
                setQuestions(questionClone);
            }
        }
    };

    const handleOnchangeImage = (event, questionId) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex((item) => item.id === questionId);
        // console.log(event.target.files[0]);
        if (index > -1) {
            questionClone[index].imageFile = event.target.files[0];
            questionClone[index].imageName = event.target.files[0].name;
            setQuestions(questionClone);
        }
    };

    const handleCheckBoxAnswer = (event, questionId, answerId) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex((item) => item.id === questionId);
        if (index > -1) {
            let indexAnswer = questionClone[index].answers.findIndex(
                (item) => item.id === answerId
            );
            if (indexAnswer > -1) {
                questionClone[index].answers[indexAnswer].isCorrect =
                    event.target.checked;
                setQuestions(questionClone);
            }
        }
    };

    // Tổng hợp
    // const handleOnchange = (event, type, questionId, answerId) => {
    //     let questionClone = _.cloneDeep(questions);
    //     let index = questionClone.findIndex((item) => item.id === questionId);
    //     if (index > -1) {
    //         if (type === "QUESTION") {
    //             questionClone[index].description = event.target.value;
    //         } else if (type === "IMAGE") {
    //             questionClone[index].imageFile = event.target.files[0];
    //             questionClone[index].imageName = event.target.files[0].name;
    //         } else {
    //             let indexAnswer = questionClone[index].answers.findIndex(
    //                 (item) => item.id === answerId
    //             );
    //             if (indexAnswer > -1) {
    //                 if (type == "ANSWER") {
    //                     questionClone[index].answers[indexAnswer].description =
    //                         event.target.value;
    //                 } else if (type == "CHECKBOX") {
    //                     questionClone[index].answers[indexAnswer].isCorrect =
    //                         event.target.checked;
    //                 }
    //             }
    //         }
    //     }
    //     setQuestions(questionClone);
    // };

    const handleAddQuestion = () => {
        const newQuestion = {
            id: uuidv4(),
            description: "",
            imageFile: "",
            imageName: "",
            answers: [{ id: uuidv4(), description: "", isCorrect: false }],
        };
        setQuestions([...questions, newQuestion]);
    };

    const handleSubQuestion = (id) => {
        let questionClone = questions.filter((item) => item.id !== id);
        setQuestions(questionClone);
    };

    const handleAddAnswer = (questionId) => {
        let cloneQuestions = _.cloneDeep(questions);
        let newAnswer = { id: uuidv4(), description: "", isCorrect: false };
        let index = cloneQuestions.findIndex((item) => item.id === questionId);
        if (index > -1) {
            cloneQuestions[index].answers.push(newAnswer);
            setQuestions(cloneQuestions);
        }
    };

    const handleSubAnswer = (answerId, questionId) => {
        let cloneQuestions = _.cloneDeep(questions);
        let index = cloneQuestions.findIndex((item) => item.id === questionId);
        if (index > -1) {
            cloneQuestions[index].answers = cloneQuestions[
                index
            ].answers.filter((item) => item.id !== answerId);
            setQuestions(cloneQuestions);
        }
    };

    const handleSubmitQuiz = async () => {
        // console.log("questions", questions);
        // validate
        if (_.isEmpty(selectedQuiz)) {
            toast.error("Hãy chọn quiz");
            return;
        }

        let isValid = true;
        let indexQ = 0,
            indexA = 0;

        for (let q = 0; q < questions.length; q++) {
            indexQ = q;
            let countCorrect = 0;
            // kiểm tra câu hỏi không được để trống
            if (!questions[q].description) {
                toast.error(`Câu hỏi ${indexQ + 1} chưa điền`);
                isValid = false;
                break;
            }
            for (let a = 0; a < questions[q].answers.length; a++) {
                indexA = a;
                // kiểm tra câu trả lời không được để trống
                if (!questions[q].answers[a].description) {
                    isValid = false;
                    toast.error(
                        `Đáp án ${indexA + 1} của câu hỏi ${
                            indexQ + 1
                        } chưa điền`
                    );
                    break;
                }
                // Khi có câu trả lời đúng
                if (questions[q].answers[a].isCorrect === true) {
                    countCorrect += 1;
                }
            }
            // kiểm tra khi không có câu trả lời đúng của câu hỏi
            if (countCorrect === 0 && isValid === true) {
                isValid = false;
                toast.error(`Câu hỏi ${indexQ + 1} chưa có đáp án đúng`);
                break;
            }

            if (isValid === false) {
                break;
            }
        }

        if (isValid === false) {
            return;
        }
        let questionClone = _.cloneDeep(questions);
        for (let i = 0; i < questionClone.length; i++) {
            if (questionClone[i].imageFile) {
                questionClone[i].imageFile = await toBase64(
                    questionClone[i].imageFile
                );
            }
        }
        // console.log("questionClone", questionClone);

        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionClone,
        });
        // // Do sự can thiệp của interceptors trong file axiosCustomize nên đã trả luôn về data, không cần ghi res.data
        if (res && res.EC === 0) {
            toast.success("Sửa quiz thành công");
            loadQuizQA();
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    };
    // console.log("question", questions);

    // convert file to Base64
    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });

    return (
        <div className="question-container p-4">
            <div className="add-question">
                <div className="col-6 form-group mb-3">
                    {/* Lựa chọn quiz */}
                    <label className="mb-1 fw-medium">Lựa chọn bài quiz</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                        placeholder="Bài quiz"
                    />
                </div>

                <div className="mb-1 fw-medium">Thêm câu hỏi:</div>
                <hr />
                {questions &&
                    questions.length > 0 &&
                    questions.map((question, index) => {
                        return (
                            <div className="content mb-4" key={question.id}>
                                <div className="mb-1 fw-medium">
                                    Câu hỏi {index + 1}
                                </div>
                                {/* question */}
                                <div className="mb-3 question-content">
                                    {/* Mô tả câu hỏi */}
                                    <div className="form-floating col-6 z-0">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Mô tả"
                                            value={question.description}
                                            onChange={(event) =>
                                                handleOnchangeDescirption(
                                                    event,
                                                    "QUESTION",
                                                    question.id,
                                                    ""
                                                )
                                            }
                                        />
                                        <label>Mô tả</label>
                                    </div>
                                    {/* Ảnh */}
                                    <div className="upload-image">
                                        <label
                                            className="label-upload"
                                            htmlFor={`${question.id}-image`}
                                        >
                                            <RiImageAddFill size={"1.5em"} />
                                        </label>
                                        <input
                                            type="file"
                                            id={`${question.id}-image`}
                                            hidden
                                            onChange={(event) =>
                                                handleOnchangeImage(
                                                    event,
                                                    question.id
                                                )
                                            }
                                        />
                                        {/* Xem ảnh phóng to */}
                                        {question.imageName ? (
                                            <span
                                                className="preview-image"
                                                title="Nhấn để xem chi tiết"
                                                onClick={() => {
                                                    setIsPreviewimage(true);
                                                    setDataPreviewImage({
                                                        url: URL.createObjectURL(
                                                            question.imageFile
                                                        ),
                                                        title: question.imageName,
                                                    });
                                                }}
                                            >
                                                {question.imageName}
                                            </span>
                                        ) : (
                                            <span>Không có ảnh</span>
                                        )}
                                    </div>
                                    {/* Nút bấm */}
                                    <div className="btn-add">
                                        {/* Nút Thêm câu hỏi */}
                                        <span
                                            onClick={() => handleAddQuestion()}
                                        >
                                            <LuPlusCircle
                                                size={"1.5em"}
                                                className="icon-add"
                                            />
                                        </span>
                                        {/* Nút Xóa câu hỏi*/}
                                        {questions.length > 1 && (
                                            <span
                                                onClick={() =>
                                                    handleSubQuestion(
                                                        question.id
                                                    )
                                                }
                                            >
                                                <FaRegTrashAlt
                                                    size={"1.5em"}
                                                    className="icon-sub"
                                                />
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {question.answers &&
                                    question.answers.length > 0 &&
                                    question.answers.map((answer, index) => {
                                        return (
                                            // answer
                                            <div
                                                className="answer-content"
                                                key={answer.id}
                                            >
                                                {/* checkbox chọn câu trả lời */}
                                                <input
                                                    className="form-check-input border border-black check-box"
                                                    type="checkbox"
                                                    checked={answer.isCorrect}
                                                    onChange={(event) =>
                                                        handleCheckBoxAnswer(
                                                            event,
                                                            question.id,
                                                            answer.id
                                                        )
                                                    }
                                                />
                                                {/* Mô tả câu trả lời */}
                                                <div className="form-floating col-5 answer-name z-0">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Đáp án"
                                                        value={
                                                            answer.description
                                                        }
                                                        onChange={(event) =>
                                                            handleOnchangeDescirption(
                                                                event,
                                                                "ANSWER",
                                                                question.id,
                                                                answer.id
                                                            )
                                                        }
                                                    />
                                                    <label>
                                                        Đáp án {index + 1}
                                                    </label>
                                                </div>
                                                {/* Nút bấm */}
                                                <div className="btn-add">
                                                    {/* Nút thêm câu trả lời*/}
                                                    <span
                                                        onClick={() =>
                                                            handleAddAnswer(
                                                                question.id
                                                            )
                                                        }
                                                    >
                                                        <LuPlusCircle
                                                            size={"1.5em"}
                                                            className="icon-add"
                                                        />
                                                    </span>
                                                    {/* Nút xóa câu trả lời*/}
                                                    {question.answers.length >
                                                        1 && (
                                                        <span
                                                            onClick={() =>
                                                                handleSubAnswer(
                                                                    answer.id,
                                                                    question.id
                                                                )
                                                            }
                                                        >
                                                            <FaRegTrashAlt
                                                                size={"1.5em"}
                                                                className="icon-sub"
                                                            />
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                <hr />
                            </div>
                        );
                    })}

                <div>
                    <button
                        className="btn btn-warning"
                        onClick={() => handleSubmitQuiz()}
                    >
                        Lưu câu hỏi
                    </button>
                </div>
                {/* Xem ảnh được phóng to  react awesome lightbox*/}
                {isPreviewImage === true && (
                    <Lightbox
                        image={dataPreviewImage.url}
                        title={dataPreviewImage.title}
                        onClose={() => setIsPreviewimage(false)}
                    ></Lightbox>
                )}
            </div>
        </div>
    );
};

export default ManageQA;
