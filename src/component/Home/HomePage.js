import React from "react";

import video3 from "../../assets/video/video-homepage2.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

const HomePage = (props) => {
    const { t } = useTranslation();

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const navigate = useNavigate();

    // console.log(account, isAuthenticated);

    return (
        <div className="homepage-container">
            {/* controls: hiện nút tắt bật chạy video
            autoPlay muted: tự đông chạy video, 
            loop: chạy video vô hạn*/}
            <video autoPlay muted loop className="video3">
                <source src={video3} type="video/mp4" />
            </video>

            <div className="homepage-content">
                <div className="title-1">{t("homepage.title1")}</div>
                <div className="title-2">
                    {t("homepage.title2")} <b>{t("homepage.title2b")}.</b>
                </div>
                <div className="title-3">
                    {isAuthenticated === false ? (
                        <button>{t("homepage.title3")}</button>
                    ) : (
                        <button onClick={() => navigate("/users")}>
                            Làm bài ngay
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
