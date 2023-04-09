import { Button, Icon } from "@chakra-ui/react";
import React, { useContext } from "react";
import { auth, provider, db } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { HiOutlineLogout } from "react-icons/hi";

import UserContext from "./Context/User/UserContext";

const Login = () => {
  let navigate = useNavigate();

  const context = useContext(UserContext);
  const { user } = context;

  const data = {
    role: "customer",
    address: {
      billing_customer_name: "",
      billing_address: "",
      billing_city: "",
      billing_pincode: 713339,
      billing_state: "",
      billing_country: "",
      billing_email: "",
      billing_phone: 0,
      billing_alternate_phone: 0, //Not Mandatory
      shipping_is_billing: true,
    },
    cart: [{ pid: "" }],
    order: [{ order_id: "", payment_method: "" }],
  };

  const createUser = () => {
    const uid = localStorage.getItem("uid");
    console.log(uid);
    const docRef = doc(db, "User", uid);
    setDoc(docRef, data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const googleSignIn = async () => {
    await signInWithPopup(auth, provider)
      .then((data) => {
        // console.log(data);
        console.log(data);
        const uid = data.user.reloadUserInfo.localId;
        localStorage.setItem("uid", uid);
        console.log(uid);
      })
      .then(async () => {
        // await getUser();
        // const user = localStorage.getItem("user");
        console.log(user);
        const address = user.address ? user.address.billing_address : "";
        if (address !== "") {
          navigate("/");
        } else {
          console.log("Executing else");
          createUser();
          navigate("/user");
        }
      });
  };

  const logout = () => {
    localStorage.removeItem("uid");
    navigate("/");
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-around">
        <div className="col-lg-4 col-md-6 col-sm-6">
          {localStorage.getItem("uid") ? (
            <Button
              colorScheme="blue"
              variant="ghost"
              bg="blue.50"
              width="100%"
              onClick={logout}
            >
              Logout
              <Icon as={HiOutlineLogout} m={2} fontSize={30} />
            </Button>
          ) : (
            <Button
              colorScheme="blue"
              variant="ghost"
              bg="blue.50"
              width="100%"
              onClick={googleSignIn}
            >
              Login With Google
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
