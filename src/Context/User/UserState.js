import React, { useEffect } from "react";
import { useState } from "react";
import { doc, getDoc, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import UserContext from "./UserContext";
import { json } from "react-router-dom";

const UserState = (props) => {
  var [user, setUser] = useState({});
  const getUser = async () => {
    const uid = localStorage.getItem("uid");
    const docRef = doc(db, "User", uid);
    onSnapshot(docRef, (doc) => {
      console.log("Current data: ", doc.data());
      setUser(doc.data());
      localStorage.setItem("user", JSON.stringify(user));
      console.log(JSON.parse(localStorage.getItem("user")));
    });
    // const docSnap = await getDoc(docRef);
    // console.log(docSnap);
    // user = docSnap.data();
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ getUser, user }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
