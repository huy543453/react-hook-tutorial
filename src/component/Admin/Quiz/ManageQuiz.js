import React, { useEffect, useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
import { getAllQuiz, postAddQuiz } from "../../../service/apiService";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import ModalUpdate from "./ModalUpdate";
import ModalView from "./ModalView";
import ModalDelete from "./ModalDelete";
import ManageQA from "./ManageQA";
import AssignQuiz from "./AssignQuiz";

const options = [
    { value: "EASY", label: "Dễ" },
    { value: "MEDIUM", label: "Trung bình" },
    { value: "HARD", label: "Khó" },
];

const ManageQuiz = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState(null);
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const [quizzes, setQuizzes] = useState([]);

    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    const [quizUpdate, setQuizUpdate] = useState("");
    const [quizDelete, setQuizDelete] = useState("");

    const [isLoadQuizAssign, setIsloadQuizAssign] = useState(false);

    useEffect(() => {
        loadQuiz();
    }, []);

    const loadQuiz = async () => {
        let res = await getAllQuiz();
        // Do sự can thiệp của interceptors trong file axiosCustomize nên đã trả luôn về data, không cần ghi res.data
        if (res && res.EC === 0) {
            setQuizzes(res.DT);
        }
    };

    const handleUploadImage = (event) => {
        console.log(event);
        if (event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
            event.target.value = null;
            event.target.files = null;
        } else {
            return;
        }
    };

    const handleSubmitQuiz = async () => {
        if (!name) {
            toast.error("Tên không được để trống");
            return;
        } else if (!description) {
            toast.error("Mô tả không được để trống");
            return;
        } else if (!type) {
            toast.error("Độ khó không được để trống");
            return;
        } else if (!image) {
            toast.error("Ảnh không được để trống");
            return;
        }

        let difficulty = "";
        if (type && type.value) {
            difficulty = type.value;
        }
        let res = await postAddQuiz(name, description, difficulty, image);
        // Do sự can thiệp của interceptors trong file axiosCustomize nên đã trả luôn về data, không cần ghi res.data
        if (res && res.EC === 0) {
            toast.success("Thêm bài quiz thành công");
            setName("");
            setDescription("");
            setType("");
            setImage(null);
            setPreviewImage("");
            loadQuiz();
            setIsloadQuizAssign(true);
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    };

    const updateQuiz = (quiz) => {
        setQuizUpdate(quiz);
    };

    const deleteQuiz = (quiz) => {
        setQuizDelete(quiz);
    };
    return (
        <div className="quiz-container p-4">
            <div className="title mb-3 fs-3 fw-medium text-center">
                Quản lý quiz
            </div>
            {/* Accordion react-bootstrap: ẩn hiện bảng thêm quiz */}
            <Accordion defaultActiveKey="-1">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <div className="fw-medium fs-5">Quản lý quiz</div>
                    </Accordion.Header>
                    <Accordion.Body>
                        {/* thêm quiz */}
                        <div className="add">
                            {/* lengend w3school */}
                            <fieldset className="border p-2">
                                <legend className="float-none w-auto">
                                    Thêm Quiz:
                                </legend>
                                {/* floating label bootstrap: ẩn hiện tên nhãn khi nhập */}
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tên"
                                        value={name}
                                        onChange={(event) =>
                                            setName(event.target.value)
                                        }
                                    />
                                    <label>Tên</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Mô tả"
                                        value={description}
                                        onChange={(event) =>
                                            setDescription(event.target.value)
                                        }
                                    />
                                    <label>Mô tả</label>
                                </div>
                                <div className="form-floating mt-3">
                                    {/* react-select */}
                                    <Select
                                        value={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder="Độ khó"
                                    />
                                </div>
                                <div className="mt-3 mb-1 form-group label-upload">
                                    <label htmlFor="image-upload">
                                        Tải ảnh
                                    </label>
                                    <input
                                        type="file"
                                        hidden
                                        className="form-control"
                                        id="image-upload"
                                        onChange={(event) =>
                                            handleUploadImage(event)
                                        }
                                    />
                                </div>
                                <div className="col-md-12 image-preview">
                                    {previewImage !== "" ? (
                                        <img src={previewImage} alt=""></img>
                                    ) : (
                                        <div>Ảnh xem trước</div>
                                    )}
                                </div>
                                <div className="mt-3">
                                    <button
                                        className="btn btn-primary float-end"
                                        onClick={() => handleSubmitQuiz()}
                                    >
                                        Lưu
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                        {/* table quiz */}
                        <div className="mt-5 fs-5 fw-medium">
                            Danh sách các quiz
                        </div>
                        <div className="list-quiz">
                            <TableQuiz
                                quizzes={quizzes}
                                setQuizzes={setQuizzes}
                                setShowModalUpdate={setShowModalUpdate}
                                updateQuiz={updateQuiz}
                                setShowModalView={setShowModalView}
                                setShowModalDelete={setShowModalDelete}
                                deleteQuiz={deleteQuiz}
                            />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <div className="fw-medium fs-5">
                            Quản lý câu hỏi, câu trả lời của quiz
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <ManageQA loadQuizAgain={loadQuiz} />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        <div className="fw-medium fs-5">
                            Thiết lập quiz cho người dùng
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz loadQuizAgain={loadQuiz} />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <ModalUpdate
                show={showModalUpdate}
                setShow={setShowModalUpdate}
                quizUpdate={quizUpdate}
                setQuizUpdate={setQuizUpdate}
                loadQuiz={loadQuiz}
            />

            <ModalView
                show={showModalView}
                setShow={setShowModalView}
                quizUpdate={quizUpdate}
                setQuizUpdate={setQuizUpdate}
            />

            <ModalDelete
                show={showModalDelete}
                setShow={setShowModalDelete}
                quizDelete={quizDelete}
                loadQuiz={loadQuiz}
            />
        </div>
    );
};

export default ManageQuiz;
