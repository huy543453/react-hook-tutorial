import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalResultQuiz = (props) => {
    const { show, setShow } = props;

    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Kết quả bài quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="">
                        Tổng số câu hỏi: <b>{props.countTotal}</b>
                    </div>
                    <div className="">
                        Số câu trả lời đúng: <b>{props.countCorrect}</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Hiện đáp án
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalResultQuiz;
