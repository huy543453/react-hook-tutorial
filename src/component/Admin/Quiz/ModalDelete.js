import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { delDeleteQuiz } from "../../../service/apiService";
import { toast } from "react-toastify";

const ModalDelete = (props) => {
    const { show, setShow, quizDelete } = props;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDeleteQuiz = async (e) => {
        e.preventDefault();
        let res = await delDeleteQuiz(quizDelete.id);

        if (res && res.EC === 0) {
            toast.success("Xóa quiz thành công");
            handleClose();
            await props.loadQuiz();
            // await props.loadUserPaginate(1);
            // props.setCurrentPage(1);
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc muốn xóa quiz &nbsp;
                    <b>
                        {quizDelete && quizDelete.name ? quizDelete.name : ""}
                    </b>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={(e) => handleDeleteQuiz(e)}
                    >
                        Xác nhận
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDelete;
