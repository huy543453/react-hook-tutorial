import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import img1 from "../../../assets/image/4258.png";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { putUpdateQuiz } from "../../../service/apiService";
import _ from "lodash";

const ModalUpdate = (props) => {
    const { show, setShow, quizUpdate, setQuizUpdate } = props;

    useEffect(() => {
        if (!_.isEmpty(quizUpdate)) {
            setName(quizUpdate.name);
            setDescription(quizUpdate.description);
            setDifficulty(quizUpdate.difficulty);
            if (quizUpdate.image !== "") {
                setImage(quizUpdate.image);
                setPreviewImage(`data:image/jpeg;base64,${quizUpdate.image}`);
            }
        }
    }, [quizUpdate]);

    const handleClose = () => {
        setShow(false);
        setDescription("");
        setName("");
        setDifficulty("");
        setImage("");
        setPreviewImage("");
        // Phải set quizUpdate = rỗng để khác với quizUpdate trước,
        // Mới có thể thực hiện hàm useEffect dựa trên quizUpdate
        // Vì chỉ khi quizUpdate thay đổi thì userEffect mới thực hiện
        // fix lỗi click 2 lần update vào 1 hàng nhưng ko hiện thông tin ở lần 2
        setQuizUpdate({});
    };
    // const handleShow = () => setShow(true);

    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                backdrop="static"
                className="modal-add"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3 modal-update">
                        <div className="col-md-6">
                            <label className="form-label">Tên quiz</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                disabled
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Mô tả</label>
                            <input
                                type="text"
                                className="form-control"
                                name="description"
                                value={description}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                                disabled
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Độ khó</label>
                            <select
                                className="form-select"
                                value={difficulty}
                                name="difficulty"
                                onChange={(event) =>
                                    setDifficulty(event.target.value)
                                }
                                disabled
                            >
                                <option value="">----</option>
                                <option value="EASY">Dễ</option>
                                <option value="MEDIUM">Trung bình</option>
                                <option value="HARD">Khó</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label
                                className="form-label m-1 label-upload"
                                htmlFor="image-upload-quiz"
                            >
                                Ảnh
                            </label>
                        </div>
                        <div className="col-md-12 image-preview">
                            {previewImage !== "" ? (
                                <img src={previewImage} alt=""></img>
                            ) : (
                                <div>Ảnh xem trước</div>
                            )}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUpdate;
