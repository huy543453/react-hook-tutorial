import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../service/apiService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { FaSpinner } from "react-icons/fa";
import "./Login.scss";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [isValidEmail, setIsValidEmail] = useState(false);
    const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const dispastch = useDispatch(); // redux truyền
    const [isLoading, setIsLoading] = useState(false); // chờ api

    const validateEmail = (event) => {
        if (event.target.value.match(regex)) {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false);
        }
    };

    const handleLogin = async () => {
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
        setIsLoading(true);

        let res = await postLogin(email, password, 3000);

        // Trong backend có sẵn EC (encode) = 0 là thành công, != 0 là thất bại
        // Do sự can thiệp của interceptors trong file axiosCustomize nên đã trả luôn về data, không cần ghi res.data
        if (res && res.EC === 0) {
            setIsLoading(false);
            toast.success("Đăng nhập thành công");
            navigate("/");

            dispastch(doLogin(res));
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-body-secondary vh-100">
            <div className="text-end mb-5 py-2 pe-5 border-bottom border-top border-black ">
                <span>Bạn chưa có tài khoản?</span>
                <button
                    className="btn btn-primary ms-2"
                    onClick={() => navigate("/register")}
                >
                    Đăng ký
                </button>
            </div>

            <div className="col-4 mx-auto p-4 text-center border rounded border-black border-2">
                <div className="title mb-4 fs-3 fw-bold">Sephiroth</div>
                <div className="welcome mb-4">Xin chào, Bạn là ai?</div>

                <div className="content-form">
                    <div className="form-group mb-3">
                        <label className="form-label fw-medium float-start">
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

                    <div className="form-group mb-3">
                        <label className="form-label fw-medium float-start">
                            Passwword
                        </label>
                        <input
                            className="form-control"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                    </div>

                    <button
                        className="btn btn-primary w-100 mb-3 button-login"
                        onClick={() => handleLogin()}
                        disabled={isLoading}
                    >
                        {isLoading && <FaSpinner className="loaderIcon" />}

                        <span>Đăng nhập</span>
                    </button>

                    <div className="d-flex gap-5 justify-content-center small fw-light">
                        <u>Quên mật khẩu?</u>
                        <span onClick={() => navigate("/")}>
                            <u>Quay về trang chủ</u>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
