import React, { useState } from "react";
import {
  Card,
  StyledLoading,
  User,
  Loading,
  Popover,
  Button,
  Modal,
  Input,
  Row,
  Checkbox,
} from "@nextui-org/react";

export default function UserButton() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
   };

  return (
    <div className="pt-12 pl-12">
      <Button auto color="success" shadow onClick={handler}>
        Edit
      </Button>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <h1 id="modal-title" size={18}>
            Edit your page
          </h1>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Bio"
            contentLeft={undefined}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            contentLeft={undefined}
          />
       
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
          <Button auto onClick={closeHandler}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
