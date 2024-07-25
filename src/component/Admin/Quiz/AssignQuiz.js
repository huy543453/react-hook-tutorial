import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
    getAllQuiz,
    getAllUser,
    postAssignQuizToUser,
} from "../../../service/apiService";
import { toast } from "react-toastify";

const AssignQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        loadQuiz();
        loadUser();
    }, [props.loadQuizAgain]);
    // console.log(listQuiz);
    // console.log(props.loadQuizAgain);

    const loadQuiz = async () => {
        let res = await getAllQuiz();
        // Do sự can thiệp của interceptors trong file axiosCustomize nên đã trả luôn về data, không cần ghi res.data
        if (res && res.EC === 0) {
            let quiz = res.DT.map((item) => {
                return { value: item.id, label: `${item.id} - ${item.name}` };
            });
            setListQuiz(quiz);
        }
    };

    const loadUser = async () => {
        let res = await getAllUser();
        // Do sự can thiệp của interceptors trong file axiosCustomize nên đã trả luôn về data, không cần ghi res.data
        if (res && res.EC === 0) {
            let user = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username}`,
                };
            });
            setListUser(user);
        }
    };

    const handleAssignQuizToUser = async (quizId, userId) => {
        let res = await postAssignQuizToUser(quizId, userId);
        // Do sự can thiệp của interceptors trong file axiosCustomize nên đã trả luôn về data, không cần ghi res.data
        if (res && res.EC === 0) {
            toast.success("Thiết lập quiz thành công");
            setSelectedQuiz(null);
            setSelectedUser(null);
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    };

    return (
        <div className="assign-quiz-container row">
            <div className="col-6 form-group mb-3">
                {/* Lựa chọn quiz */}
                <label className="mb-1 fw-medium">Lựa chọn bài quiz</label>
                <Select
                    value={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                    placeholder="Bài quiz"
                />
            </div>
            <div className="col-6 form-group mb-3">
                {/* Lựa chọn user */}
                <label className="mb-1 fw-medium">Lựa chọn bài quiz</label>
                <Select
                    value={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                    placeholder="Người dùng"
                />
            </div>
            <div>
                <button
                    className="btn btn-warning"
                    onClick={() =>
                        handleAssignQuizToUser(
                            selectedQuiz.value,
                            selectedUser.value
                        )
                    }
                >
                    Thiết lập
                </button>
            </div>
        </div>
    );
};

export default AssignQuiz;
