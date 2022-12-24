import React, { Fragment } from "react";
import { Modal } from "antd";
import "./../Style/StylePages.css";
import SignIn from "../UserPages/SignIn";

export default function SignInModal({ showModal, setShowModal }) {
  return (
    <Fragment>
      <Modal
        width={900}
        centered
        visible={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <div>
           <SignIn setShowModal={setShowModal}/>
          </div>
      </Modal>
    </Fragment>
  );
}
