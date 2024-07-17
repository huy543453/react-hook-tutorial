import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import img1 from "../../../assets/image/4258.png";
import { AiOutlinePlusCircle } from "react-icons/ai";

import _ from "lodash";

const ModalView = (props) => {
    const { show, setShow, userView, setUserView } = props;

    useEffect(() => {
        if (!_.isEmpty(userView)) {
            setEmail(userView.email);
            setUsername(userView.username);
            setRole(userView.role);
            if (userView.image !== "") {
                setImage(userView.image);
                setPreviewImage(`data:image/jpeg;base64,${userView.image}`);
            }
        }
    }, [userView]);

    const handleClose = () => {
        setShow(false);
        setUsername("");
        setPassword("");
        setEmail("");
        setRole("USER");
        setImage("");
        setPreviewImage("");
        setUserView({});
    };
    // const handleShow = () => setShow(true);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("USER");
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
                    <Modal.Title>Cập nhật người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                disabled
                                value={email}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Mật khẩu</label>
                            <input
                                type="current-password"
                                className="form-control"
                                disabled
                                value={password}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Tên đăng nhập</label>
                            <input
                                type="text"
                                className="form-control"
                                disabled
                                name="username"
                                value={username}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Vai trò</label>
                            <select
                                className="form-select"
                                disabled
                                value={role}
                                name="role"
                            >
                                <option value="">----</option>
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
                                disabled
                                className="form-control"
                                id="image-upload"
                            />
                        </div>
                        <div className="col-md-12 imgage-preview">
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

export default ModalView;
