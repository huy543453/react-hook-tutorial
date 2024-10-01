import {
    FETCH_USER_LOGIN_SUCCESS,
    UPDATE_USER_SUCCESS,
    USER_LOGOUT_SUCCESS,
} from "../action/userAction";
const INITIAL_STATE = {
    account: {
        access_token: "",
        refresh_token: "",
        username: "",
        image: "",
        role: "",
        email: "",
    },
    isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            // console.log(action);
            return {
                ...state,
                account: {
                    // thêm dấu ? để tránh bug undefine nhưng vẫn tiếp tục truy cập biến của undefine
                    access_token: action?.payload?.DT?.access_token,
                    refresh_token: action?.payload?.DT?.refresh_token,
                    username: action?.payload?.DT?.username,
                    image: action?.payload?.DT?.image,
                    role: action?.payload?.DT?.role,
                    email: action?.payload?.DT?.email,
                },
                isAuthenticated: true,
            };

        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                account: {
                    access_token: "",
                    refresh_token: "",
                    username: "",
                    image: "",
                    role: "",
                    email: "",
                },
                isAuthenticated: false,
            };
        case UPDATE_USER_SUCCESS:
            console.log(action);
            return {
                ...state,
                account: {
                    access_token: action?.payload?.access_token,
                    refresh_token: action?.payload?.refresh_token,
                    username: action?.payload?.username,
                    image: action?.payload?.image,
                    role: action?.payload?.role,
                    email: action?.payload?.email,
                },
                isAuthenticated: true,
            };
        default:
            return state;
    }
};

export default userReducer;
