import React, { useState } from "react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { postChangePassword } from "../../service/apiService";
import { toast } from "react-toastify";

const ChangePassword = (props) => {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [typeOldPass, setTypeOldPass] = useState("password");
    const [typeNewPass, setTypeNewPass] = useState("password");
    const [typeRepeatPass, setTypeRepeatPass] = useState("password");

    const handleToggle = (namePass) => {
        if (namePass === "password-old") {
            if (typeOldPass === "password") {
                setTypeOldPass("text");
            } else {
                setTypeOldPass("password");
            }
        } else if (namePass === "password-new") {
            if (typeNewPass === "password") {
                setTypeNewPass("text");
            } else {
                setTypeNewPass("password");
            }
        } else if (namePass === "password-repeat") {
            if (typeRepeatPass === "password") {
                setTypeRepeatPass("text");
            } else {
                setTypeRepeatPass("password");
            }
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (password === "") {
            toast.error("Mật khẩu hiện tại không được để trống");
            return;
        } else if (newPassword === "") {
            toast.error("Mật khậu mới không được để trống");
            return;
        } else if (repeatPassword === "") {
            toast.error("Mật khẩu lặp lại không được để trống");
            return;
        }

        if (newPassword !== repeatPassword) {
            toast.error("Mật khẩu lặp lại chưa đúng");
            return;
        }

        if (newPassword === password) {
            toast.error("Mật khẩu mới không được giống mật khẩu cũ");
            return;
        }

        let res = await postChangePassword(password, newPassword);

        // Trong backend có sẵn EC (encode) = 0 là thành công, 1 là thất bại
        // Do sự can thiệp của interceptors trong file axiosCustomize nên đã trả luôn về data, không cần ghi res.data
        if (res && res.EC === 0) {
            toast.success("Đổi mật khẩu thành công");
            setPassword("");
            setNewPassword("");
            setRepeatPassword("");
            props.setShow(false);
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    };
    return (
        <>
            <div className="col-md-6 position-relative mb-2">
                <label className="form-label">Mật khẩu hiện tại</label>
                <input
                    type={typeOldPass}
                    className="form-control"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <span
                    className="position-absolute top-50 end-0 me-2"
                    onClick={() => handleToggle("password-old")}
                >
                    {typeOldPass === "text" ? <LuEye /> : <LuEyeOff />}
                </span>
            </div>
            <div className="col-md-6 position-relative mb-2">
                <label className="form-label">Mật khẩu mới</label>
                <input
                    type={typeNewPass}
                    className="form-control"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                />
                <span
                    className="position-absolute top-50 end-0 me-2"
                    onClick={() => handleToggle("password-new")}
                >
                    {typeNewPass === "text" ? <LuEye /> : <LuEyeOff />}
                </span>
            </div>
            <div className="col-md-6 position-relative mb-2">
                <label className="form-label">Nhập lại mật khẩu</label>
                <input
                    type={typeRepeatPass}
                    className="form-control"
                    value={repeatPassword}
                    onChange={(event) => setRepeatPassword(event.target.value)}
                />
                <span
                    className="position-absolute top-50 end-0 me-2"
                    onClick={() => handleToggle("password-repeat")}
                >
                    {typeRepeatPass === "text" ? <LuEye /> : <LuEyeOff />}
                </span>
            </div>
            <div>
                <button
                    className="btn btn-primary border rounded-2"
                    onClick={(e) => handleChangePassword(e)}
                >
                    Lưu
                </button>
            </div>
        </>
    );
};

export default ChangePassword;
