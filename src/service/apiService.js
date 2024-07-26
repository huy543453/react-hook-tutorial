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

const postLogin = (email, password, delay) => {
    // x-www-form-urlencoded
    return axios.post("api/v1/login", { email, password, delay });
};

const postRegister = (email, username, password) => {
    // x-www-form-urlencoded
    return axios.post("api/v1/register", { email, username, password });
};

const getQuizByUser = () => {
    return axios.get("api/v1/quiz-by-participant");
};

const getQuestionByQuiz = (quizId) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`);
};

const postSubmitQuiz = (data) => {
    // raw-JSON
    return axios.post(`api/v1/quiz-submit`, { ...data });
};

const postAddQuiz = (name, description, difficulty, quizImage) => {
    const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("difficulty", difficulty);
    data.append("quizImage", quizImage);
    return axios.post("api/v1/quiz", data);
};

const getAllQuiz = () => {
    return axios.get("api/v1/quiz/all");
};

const putUpdateQuiz = (id, description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append("id", id);
    data.append("description", description);
    data.append("name", name);
    data.append("difficulty", difficulty);
    data.append("quizImage", quizImage);
    return axios.put("api/v1/quiz", data);
};

const delDeleteQuiz = (quizId) => {
    return axios.delete(`api/v1/quiz/${quizId}`);
};

const postAddQuestion = (quizId, description, image) => {
    const data = new FormData();
    data.append("quiz_id", quizId);
    data.append("description", description);
    data.append("questionImage", image);
    return axios.post("api/v1/question", data);
};

const postAddAnswer = (question_id, description, correct_answer) => {
    // x-www-form-urlencoded
    return axios.post("api/v1/answer", {
        description,
        correct_answer,
        question_id,
    });
};

const getAllQuestion = () => {
    return axios.get("api/v1/question/all");
};

const postAssignQuizToUser = (quizId, userId) => {
    // x-www-form-urlencoded
    return axios.post("api/v1/quiz-assign-to-user", {
        quizId,
        userId,
    });
};

const getQuizQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};

const postUpsertQA = (data) => {
    return axios.post(`api/v1/quiz-upsert-qa`, { ...data });
};

const postLogOut = (email, refresh_token) => {
    // x-www-form-urlencoded
    return axios.post("api/v1/logout", {
        email,
        refresh_token,
    });
};

export {
    postAddUser,
    getAllUser,
    putUpdateUser,
    delDeleteUser,
    getUserWithPaginate,
    postLogin,
    postRegister,
    getQuizByUser,
    getQuestionByQuiz,
    postSubmitQuiz,
    postAddQuiz,
    getAllQuiz,
    putUpdateQuiz,
    delDeleteQuiz,
    postAddQuestion,
    postAddAnswer,
    getAllQuestion,
    postAssignQuizToUser,
    getQuizQA,
    postUpsertQA,
    postLogOut,
};
