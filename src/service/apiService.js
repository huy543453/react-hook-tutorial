import axios from "../ultils/axiosCustomize";

const postAddUser = (username, password, email, role, image) => {
    const data = new FormData();
    data.append("username", username);
    data.append("password", password);
    data.append("email", email);
    data.append("role", role);
    data.append("userImage", image);
    return axios.post("api/v1/participant", data);
};

const getAllUser = () => {
    return axios.get("api/v1/participant/all");
};

const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append("id", id);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);
    return axios.put("api/v1/participant", data);
};
export { postAddUser, getAllUser, putUpdateUser };
