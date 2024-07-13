import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import img1 from "../../../assets/image/4258.png";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const AddModal = (props) => {
    const { show, setShow } = props;

    const handleClose = () => {
        setShow(false);
        setUsername("");
        setPassword("");
        setEmail("");
        setRole("");
        setImage("");
        setPreviewImage("");
    };
    const handleShow = () => setShow(true);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const [isValidEmail, setIsValidEmail] = useState(false);
    const regex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validateEmail = (event) => {
        if (event.target.value.match(regex)) {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false);
        }
    };

    const handleUploadImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        } else {
            setImage("");
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        if (!isValidEmail) {
            toast.error("Email không hợp lệ");
            return;
        }

        const data = new FormData();
        data.append("username", username);
        data.append("password", password);
        data.append("email", email);
        data.append("role", role);
        data.append("userImage", image);

        let res = await axios.post(
            "http://localhost:8081/api/v1/participant",
            data
        );
        // Trong backend có sẵn EC (encode) = 0 là thành công, 1 là thất bại
        if (res.data && res.data.EC === 0) {
            toast.success("Thêm người dùng thành công");
            handleClose();
        }
        if (res.data && res.data.EC !== 0) {
            toast.error(res.data.EM);
        }
    };
    console.log(image);

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
                    <Modal.Title>Thêm mới người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Tên đăng nhập</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                value={username}
                                onChange={(event) =>
                                    setUsername(event.target.value)
                                }
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Mật khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                    validateEmail(event);
                                }}
                            />
                            {email !== "" && isValidEmail === false ? (
                                <div className="text-danger pt-2">
                                    Email không hợp lệ
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Vai trò</label>
                            <select
                                className="form-select"
                                value={role}
                                name="role"
                                onChange={(event) =>
                                    setRole(event.target.value)
                                }
                            >
                                <option value="USER">Người dùng</option>
                                <option value="ADMIN">Administrator</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label
                                className="form-label m-1 label-upload"
                                htmlFor="image-upload"
                            >
                                <AiOutlinePlusCircle /> Tải ảnh
                            </label>
                            <input
                                type="file"
                                hidden
                                className="form-control"
                                id="image-upload"
                                onChange={(event) => handleUploadImage(event)}
                            />
                        </div>
                        <div className="col-md-12 imgage-preview">
                            {previewImage !== "" ? (
                                <img src={previewImage}></img>
                            ) : (
                                <div>Ảnh xem trước</div>
                            )}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={(event) => handleAddUser(event)}
                    >
                        Save
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddModal;
