import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postUpdateProfile } from "../../service/apiService";
import { updateProfile } from "../../redux/action/userAction";
import _ from "lodash";

const Profile = (props) => {
    const [username, setUsername] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const account = useSelector((state) => state.user.account);
    // console.log(account);
    const dispatch = useDispatch();

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        if (account) {
            let i = await urltoFile(
                `data:image/png;base64,${account.image}`,
                `Image`,
                "image/png"
            );
            setUsername(account.username);
            setPreviewImage(`data:image/jpeg;base64,${account.image}`);
            setImage(i);
        }
    };

    // Convert base64 to file JavaScript
    const urltoFile = async (url, filename, mimeType) => {
        return fetch(url)
            .then((res) => res.arrayBuffer())
            .then((buf) => new File([buf], filename, { type: mimeType }));
    };

    const handleUploadImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        } else {
            return;
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        const res = await postUpdateProfile(username, image);
        // Do sự can thiệp của interceptors trong file axiosCustomize nên đã trả luôn về data, không cần ghi res.data
        if (res && res.EC === 0) {
            let img = await toBase64(image);
            let user = {
                ...account,
                username: username,
                image: img.substring(22),
            };
            // console.log("users", user);

            toast.success("Thay đổi thông tin thành công");
            setUsername("");
            setImage("");
            setPreviewImage("");
            props.setShow(false);

            dispatch(updateProfile(user));
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    };

    // convert file to Base64
    const toBase64 = async (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });

    return (
        <>
            <form className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Tên</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>

                <div className="col-md-12">
                    <label
                        className="form-label m-1 label-upload"
                        htmlFor="image-upload"
                    >
                        <AiOutlinePlusCircle /> Đổi ảnh
                    </label>
                    <input
                        type="file"
                        hidden
                        className="form-control"
                        id="image-upload"
                        onChange={(event) => handleUploadImage(event)}
                    />
                </div>
                <div className="col-md-12 image-preview">
                    {previewImage !== "" ? (
                        <img src={previewImage} alt=""></img>
                    ) : (
                        <div>Avatar</div>
                    )}
                </div>
                <div>
                    <button
                        className="btn btn-primary border rounded-2"
                        onClick={(e) => handleUpdateProfile(e)}
                    >
                        Lưu
                    </button>
                </div>
            </form>
        </>
    );
};

export default Profile;
