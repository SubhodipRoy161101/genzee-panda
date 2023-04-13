import React, { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Box, Stack } from "@chakra-ui/react";

import "./ProductDetails.css";

const ProductDetails = () => {
  const [details, setDetails] = useState({});

  const getProdDetails = () => {
    console.log("In Get Product details");
    const ref = doc(db, "products", localStorage.getItem("pid"));
    onSnapshot(ref, (doc) => {
      setDetails(doc.data());
      console.log(details);
    });
  };

  useEffect(() => {
    getProdDetails();
  }, []);
  //COmment

  const urls = details.url;
  console.log(urls);
  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-md-4"
          style={{
            margin: "0px",
            paddingLeft: "0px",
            paddingRight: "0px",
            // boxShadow: "inset -20px 0px 35px -25px rgba(0,0,0,0.75)",
            // zIndex: "-1",
          }}
        >
          <Stack
            direction={"row"}
            align={"center"}
            style={{ overflowX: "scroll" }}
            className="carousel"
          >
            {urls
              ? urls.map((url) => {
                  return (
                    <div>
                      <img
                        src={url}
                        alt=""
                        key={url}
                        style={{ borderRadius: "25px" }}
                      />
                    </div>
                  );
                })
              : ""}
          </Stack>
        </div>
        <div className="col-md-8">
          <h1 style={{ margin: "2rem" }}>{details.title}</h1>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
