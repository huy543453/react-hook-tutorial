import axios from "axios";
import NProgress from "nprogress";
import { store } from "../redux/store.js";

const instance = axios.create({
    baseURL: "http://localhost:8081/",
    timeout: 5000,
});

NProgress.configure({
    showSpinner: false,
    speed: 500,
    trickleSpeed: 50,
});

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // console.log("check store:", store.getState());
        // cách để lấy access_token
        const access_token = store?.getState()?.user?.account?.access_token;
        config.headers["Authorization"] = "Bearer " + access_token;
        // Thanh chạy delay login
        NProgress.start();

        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        NProgress.done();
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response && response.data ? response.data : response;
    },
    function (error) {
        // expire access_token
        if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.DT === -999
        ) {
            window.location.href = "/login";
        }

        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return error && error.response && error.response.data
            ? error.response.data
            : Promise.reject(error);
    }
);

export default instance;
