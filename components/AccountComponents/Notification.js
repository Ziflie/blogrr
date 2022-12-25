import { Popover, Button, Text, Badge, User } from "@nextui-org/react";
import React, { useState } from "react";
import { NotificationIcon } from "../../public/icon";
import { useAuth } from "../../context/AuthContext";
   
// je moet data kunnen ontvangen via BIJVOORBEELD: UserDashBoard.js en die data hier krijgen.
// dat moet met een hook, genaamd useContext, daarmee kan je global variables maken.  

export default function Notifications() {
  const { currentUser } = useAuth();
    
  const [isInvisible, setIsInvisible] = React.useState(false);
  const ImageNoti = "You have no profile picture, make sure to add one!";
  const BioNoti = "Let people know what you like to do by filling in your bio!";
  const VerfiNoti = "Make sure to verify your email in order to write your LifeStory";


  
   return (
    <Popover>
      <Popover.Trigger>
        <Button onClick={() => setIsInvisible(true)} color="secondary" auto flat>
          <Badge
            color="error"
            content={3}
            isInvisible={isInvisible}
            shape="circle"
            
          >
            <NotificationIcon />
          </Badge>
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        {<Text css={{ p: "$10", fontSize: "15px" }}>{ImageNoti}</Text>}
        <Text css={{ p: "$10", fontSize: "15px" }}>{BioNoti}</Text>
        {currentUser.emailVerified == false && (
          <Text css={{ p: "$10", fontSize: "15px" }}>{VerfiNoti}</Text>
        )}
      </Popover.Content>
    </Popover>
  );
}
