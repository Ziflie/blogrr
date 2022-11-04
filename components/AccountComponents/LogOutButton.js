// import React from "react";
// import { useAuth } from "../../context/AuthContext";
// import { Button, Spacer, Grid } from "@nextui-org/react";
// import { getAuth, signOut } from "firebase/auth";

// export default function LogOutButton() {
//   const { logOut, currentUser } = useAuth();

//   async function SubmitLogout() {
//     return await logOut();
//   }

//   console.log("werken", currentUser)

//   return (
//     <Grid.Container gap={2}>
//       <div>
//         <button className="text-red-500" onPress={SubmitLogout} shadow css={{color: "red"}} auto>
//           Log out
//         </button>
//       </div>
//     </Grid.Container>
//   );
// }
