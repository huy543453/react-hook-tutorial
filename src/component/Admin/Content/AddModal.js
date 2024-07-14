import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import img1 from "../../../assets/image/4258.png";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { postAddUser } from "../../../service/apiService";

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
    // const handleShow = () => setShow(true);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const [isValidEmail, setIsValidEmail] = useState(false);
    const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
        if (email === "") {
            toast.error("Email không hợp được để trống");
            return;
        }
        if (!isValidEmail) {
            toast.error("Email không hợp lệ");
            return;
        }

        if (password === "") {
            toast.error("Password không được để trống");
            return;
        }

        let res = await postAddUser(username, password, email, role, image);
        console.log(res);
        // Trong backend có sẵn EC (encode) = 0 là thành công, 1 là thất bại
        // Do sự can thiệp của interceptors trong file axiosCustomize nên đã trả luôn về data, không cần ghi res.data
        if (res && res.EC === 0) {
            toast.success("Thêm người dùng thành công");
            handleClose();
            await props.loadUser();
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
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
                                <div
                                    className="text-danger pt-2"
                                    style={{ fontSize: 12 }}
                                >
                                    Email không hợp lệ
                                </div>
                            ) : (
                                <></>
                            )}
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
                                <img src={previewImage} alt=""></img>
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
