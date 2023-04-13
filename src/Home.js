import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "./Context/User/UserContext";
import { Button } from "@chakra-ui/react";
import AllProducts from "./Products/AllProducts";

const Home = () => {
  let navigate = useNavigate();
  const context = useContext(UserContext);
  const { getUser, user } = context;
  useEffect(() => {
    if (!localStorage.getItem("uid")) {
      navigate("/login");
    }
    console.log(user);
  }, []);

  const role = user.role ? user.role : "";
  console.log(role);
  return (
    <>
      {role === "admin" ? (
        <Button onClick={() => navigate("/add-product")}>Admin Panel</Button>
      ) : (
        ""
      )}
      <AllProducts />
    </>
  );
};

export default Home;
