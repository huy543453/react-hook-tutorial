import axios from "../ultils/axiosCustomize";

const postAddUser = (username, password, email, role, image) => {
    // form-data
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

const delDeleteUser = (userId) => {
    // x-www-form-urlencoded
    return axios.delete("api/v1/participant", { data: { id: userId } });
};

const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = (email, password) => {
    // x-www-form-urlencoded
    return axios.post("api/v1/login", { email, password });
};

const postRegister = (email, username, password) => {
    // x-www-form-urlencoded
    return axios.post("api/v1/register", { email, username, password });
};
export {
    postAddUser,
    getAllUser,
    putUpdateUser,
    delDeleteUser,
    getUserWithPaginate,
    postLogin,
    postRegister,
};
