import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { delDeleteUser } from "../../../service/apiService";
import { toast } from "react-toastify";

const ModalDelete = (props) => {
    const { show, setShow, userDelete } = props;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDeleteUser = async (e) => {
        e.preventDefault();
        let res = await delDeleteUser(userDelete.id);

        if (res && res.EC === 0) {
            toast.success("Xóa người dùng thành công");
            handleClose();
            // await props.loadUser();
            await props.loadUserPaginate(1);
            props.setCurrentPage(1);
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
                    Bạn có chắc muốn xóa người dùng với email{" "}
                    <b>
                        {userDelete && userDelete.email ? userDelete.email : ""}
                    </b>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={(e) => handleDeleteUser(e)}
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
