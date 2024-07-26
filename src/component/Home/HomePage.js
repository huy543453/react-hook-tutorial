import React, { useState } from "react";
import video from "../../assets/video/Beautiful Chinese Girls 1.mp4";
import video2 from "../../assets/video/4300.mp4";
import video4 from "../../assets/video/4209.mp4";
import video3 from "../../assets/video/video-homepage2.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useTranslation, Trans } from "react-i18next";

const HomePage = (props) => {
    const [showVid, setShowVid] = useState(false);

    const { t } = useTranslation();

    const handleOnClickShowHide = () => {
        setShowVid(!showVid);
    };

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const navigate = useNavigate();

    // console.log(account, isAuthenticated);

    return (
        <div className="homepage-container">
            {/* controls: hiện nút tắt bật chạy video
            autoPlay muted: tự đông chạy video, 
            loop: chạy video vô hạn*/}
            {showVid === true ? (
                <div className="vid">
                    <video controls autoPlay muted loop className="video1">
                        <source src={video} type="video/mp4" />
                    </video>

                    <video controls autoPlay muted loop className="video2">
                        <source src={video2} type="video/mp4" />
                    </video>
                    <video controls autoPlay muted loop className="video4">
                        <source src={video4} type="video/mp4" />
                    </video>
                </div>
            ) : (
                <video autoPlay muted loop className="video3">
                    <source src={video3} type="video/mp4" />
                </video>
            )}
            {showVid === false ? (
                <button
                    className="btn btn-primary button"
                    onClick={handleOnClickShowHide}
                >
                    Show
                </button>
            ) : (
                <button
                    className="btn btn-primary button"
                    onClick={handleOnClickShowHide}
                >
                    Hide
                </button>
            )}
            {!showVid && (
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
            )}
        </div>
    );
};

export default HomePage;
