import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import img1 from "../../../assets/image/4258.png";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import ChangePassword from "./ChangePassword";
import Profile from "./Profile";
import History from "./History";

const ModalUser = (props) => {
    const { show, setShow, contentShow } = props;

    const handleClose = () => {
        setShow(false);
    };
    // const handleShow = () => setShow(true);

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                backdrop="static"
                className="modal-add"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Quản lý thông tin người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey={contentShow}
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        {/* Đổi thông tin cá nhân */}
                        <Tab eventKey="profile" title="Tài khoản">
                            <Profile setShow={setShow} />
                        </Tab>
                        {/* Đổi mật khẩu */}
                        <Tab eventKey="change-password" title="Đổi mật khẩu">
                            <ChangePassword setShow={setShow} />
                        </Tab>
                        <Tab eventKey="history" title="Lịch sử">
                            <History setShow={setShow} />
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button
                        variant="primary"
                    >
                        Lưu
                    </Button> */}
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUser;
