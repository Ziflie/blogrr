import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { v4 } from "uuid";
import {
  Modal,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Avatar,
  Tooltip,
} from "@nextui-org/react";
import { Mail } from "../../public/Mailicon";
import { Password } from "../../public/Passwordicon";
import { SettingsIcon } from "../../public/Settingsicon";
import { CameraIcon } from "../../public/CameraIcon";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { EmailAuthProvider } from "firebase/auth";
import { storage, db } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";

export default function AccountDetails() {
  const { currentUser } = useAuth();
  const [visible, setVisible] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [UserData, setUserData] = useState([]);
  const [imgUrl, setImgUrl] = useState("")
  const [imageUpload, setImageUpload] = React.useState(null);
  const [imageList, setImageList] = React.useState([]);

  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  useEffect(() => {
    async function getUserData() {
      const docRef = doc(db, "users", currentUser.email);
      const docSnap = await getDoc(docRef);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
          // console.log(docSnap.data());
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUserData();
  }, [count]);
  const { userName, firstName, lastName, dateOfBirth, email, profilePicture } =
    UserData;

  async function saveData() {
    await setDoc(doc(db, "users", currentUser.email), {
      Email: email,
      userName: userName,
      dateOfBirth: dateOfBirth,
      firstName: firstName,
      lastName: lastName,
      profilePicture: imgUrl,
    });
  }

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(
      storage,
      `images/${imageUpload.name + currentUser.email + v4()}`
    );
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("Profile picture changed");
    });
  };

 

  return (
    <div>
      <Button auto onClick={handler} color="warning">
        <SettingsIcon />
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Avatar size="lg" src={profilePicture} />
        </Modal.Header>
        <div className="">
          <input
            onChange={e => {
              setImageUpload(event.target.files[0]);
            }}
            type="file"
          />
          <Button
            onPress={uploadImage}
            icon={<CameraIcon fill="currentColor" />}
            color="secondary"
          >
            Edit
          </Button>
        </div>
        <Modal.Header>
          <p className="text-xl text-Green">Account Details</p>
        </Modal.Header>
        <Modal.Body>
          <Input
            bordered
            fullWidth
            color="primary"
            size="lg"
            contentLeft={<Mail fill="currentColor" />}
            value={email}
            readOnly
          />
          <Input
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder=""
            value={`${firstName} ${lastName}`}
             readOnly
          />
          <Input
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder=""
            value={`${userName}`}
             readOnly
          />
          <Input
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder=""
            value={`${dateOfBirth}`}
             readOnly
          />
          <Input
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder=""
            value={`${profilePicture}`}
            onChange={e => setImgUrl(e.target.value)}

           />
        </Modal.Body>
        <Modal.Footer>
          <Button auto onClick={saveData}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
