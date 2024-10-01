import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import { getOverView } from "../../service/apiService";

const Dashboard = (props) => {
    const [dataOverView, setDataOverView] = useState([]);
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        loadDataOverView();
    }, []);
    const loadDataOverView = async () => {
        let res = await getOverView();
        // Do sự can thiệp của interceptors trong file axiosCustomize nên đã trả luôn về data, không cần ghi res.data
        if (res && res.EC === 0) {
            setDataOverView(res.DT);
            // data chart
            let qz = 0,
                qs = 0,
                as = 0;
            qz = res?.DT?.others?.countQuiz ?? 0;
            qs = res?.DT?.others?.countQuestions ?? 0;
            as = res?.DT?.others?.countAnswers ?? 0;

            const data = [
                {
                    name: "Quizzes",
                    qz: qz,
                },
                {
                    name: "Question",
                    qs: qs,
                },
                {
                    name: "Answers",
                    as: as,
                },
            ];
            setDataChart(data);
        }
    };
    return (
        <div className="dashboard-container">
            <div className="title">Analytics Dashboard</div>
            <div className="content">
                <div className="left-content">
                    <div className="left-child">
                        <span className="text1">Tổng người dùng</span>
                        <span className="text2">
                            {dataOverView && dataOverView.users ? (
                                <>{dataOverView.users.total}</>
                            ) : (
                                <>0</>
                            )}
                        </span>
                    </div>
                    <div className="left-child">
                        <span className="text1">Tổng quiz</span>
                        <span className="text2">
                            {dataOverView && dataOverView.others ? (
                                <>{dataOverView.others.countQuiz}</>
                            ) : (
                                <>0</>
                            )}
                        </span>
                    </div>
                    <div className="left-child">
                        <span className="text1">Tổng câu hỏi</span>
                        <span className="text2">
                            {dataOverView && dataOverView.others ? (
                                <>{dataOverView.others.countQuestions}</>
                            ) : (
                                <>0</>
                            )}
                        </span>
                    </div>
                    <div className="left-child">
                        <span className="text1">Tổng câu trả lời</span>
                        <span className="text2">
                            {dataOverView && dataOverView.others ? (
                                <>{dataOverView.others.countAnswers}</>
                            ) : (
                                <>0</>
                            )}
                        </span>
                    </div>
                </div>
                <div className="right-content">
                    {/* react rechart */}
                    <ResponsiveContainer width={"90%"} height={"100%"}>
                        <BarChart data={dataChart}>
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Legend />
                            <Tooltip />
                            <Bar dataKey="qz" fill="#8884d8" />
                            <Bar dataKey="qs" fill="#82ca9d" />
                            <Bar dataKey="as" fill="#fcb12a" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
