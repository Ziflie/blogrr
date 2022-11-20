import React, { useState } from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import { useAmp } from "next/amp";
import { useAuth } from "../../context/AuthContext";

export default function Popup() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const { login, signup, currentUser } = useAuth();

  const closeHandler = () => {
    setVisible(false);
     
  };

  async function submitHandler() {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    if (isLoggingIn) {
      try {
        await login(email, password);
      } catch (err) {
        setError("Incorrect email or password");
      }
      return;
    }
  }

  return (
 
   <form>
      <Button aria-label="Close" auto shadow onPress={handler}>
        Sign in
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <picture>
            <source srcSet="logo.png" type="image/webp" />
            <Text b color="purple" hideIn="lg">
              LifeStory
            </Text>
          </picture>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="text-rose-500">{error}</div>}
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
            aria-label="Close" 
            // contentLeft={<Mail fill="currentColor" />}
          />
          <Input
            value={password}
            onChange={e => setPassword(e.target.value)}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            type="password"
            aria-label="Close" 
            // contentLeft={<Password fill="currentColor" />}
          />
          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <a aria-label="Close" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" size={14}>
              Forgot password?
            </a>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button aria-label="Close" auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button aria-label="Close" auto onPress={submitHandler}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    </form>
   );
}
