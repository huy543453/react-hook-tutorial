import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../service/apiService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispastch = useDispatch();

    const handleLogin = async () => {
        let res = await postLogin(email, password);

        // Trong backend có sẵn EC (encode) = 0 là thành công, != 0 là thất bại
        // Do sự can thiệp của interceptors trong file axiosCustomize nên đã trả luôn về data, không cần ghi res.data
        if (res && res.EC === 0) {
            toast.success("Đăng nhập thành công");
            navigate("/");

            dispastch(doLogin(res));
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
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
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label className="form-label fw-medium float-start">
                            Passwword
                        </label>
                        <input
                            className="form-control"
                            type="password"
                            name="current-password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            autoComplete="current-password"
                        />
                    </div>

                    <button
                        className="btn btn-primary w-100 mb-3"
                        onClick={() => handleLogin()}
                    >
                        Đăng nhập
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
