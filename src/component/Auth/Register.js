import React, { useState } from "react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../service/apiService";
import { toast } from "react-toastify";
import Language from "../Header/Language";

const Register = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(<LuEyeOff />);

    const navigate = useNavigate();

    const validateEmail = (event) => {
        if (event.target.value.match(regex)) {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false);
        }
    };

    const handleToggle = () => {
        if (type === "password") {
            setIcon(<LuEye />);
            setType("text");
        } else {
            setIcon(<LuEyeOff />);
            setType("password");
        }
    };

    const handleRegister = async (e) => {
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
        const res = await postRegister(email, username, password);

        // Trong backend có sẵn EC (encode) = 0 là thành công, 1 là thất bại
        // Do sự can thiệp của interceptors trong file axiosCustomize nên đã trả luôn về data, không cần ghi res.data
        if (res && res.EC === 0) {
            toast.success("Đăng ký thành công");
            navigate("/");
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    };

    return (
        <div className="bg-body-secondary vh-100">
            <div className="py-2 pe-5 mb-5 border-top border-bottom border-black d-flex align-items-center justify-content-end">
                <span>Đã có tài khoản?</span>
                <button
                    className="btn btn-primary mx-2"
                    onClick={() => navigate("/login")}
                >
                    {" "}
                    Đăng nhập
                </button>
                <div className="me-4">
                    <Language />
                </div>
            </div>

            <div className="col-4 p-4 mx-auto text-center border rounded border-black border-2">
                <div className="mb-4 fs-3 fw-bold">Sephiroth</div>
                <div className="mb-4">Bạn chưa có tài khoản?</div>

                <div className="form-group mb-3">
                    <label className="form-label float-start fw-medium">
                        Email
                    </label>
                    <input
                        className="form-control"
                        type="email"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                            validateEmail(event);
                        }}
                    />
                    {email !== "" && isValidEmail === false && (
                        <div
                            className="text-danger pt-2 text-start"
                            style={{ fontSize: 12 }}
                        >
                            Email không hợp lệ
                        </div>
                    )}
                </div>

                <div className="form-group mb-3 position-relative">
                    <label className="form-label float-start fw-medium">
                        Password
                    </label>
                    <input
                        className="form-control"
                        type={type}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <span
                        className="position-absolute top-50 end-0 me-2"
                        onClick={handleToggle}
                    >
                        {icon}
                    </span>
                </div>

                <div className="form-group mb-3">
                    <label className="form-label float-start fw-medium">
                        Tên
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <button
                    className="btn btn-primary w-100 mb-4"
                    onClick={(e) => handleRegister(e)}
                >
                    Đăng ký
                </button>
                <div onClick={() => navigate("/")}>
                    &lt; &lt; Quay lại trang chủ
                </div>
            </div>
        </div>
    );
};

export default Register;
