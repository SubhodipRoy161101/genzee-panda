import React, { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Box, Stack } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const handleImgClick = (url) => {
    localStorage.setItem("imgUrl", url);
    console.log(localStorage.getItem("imgUrl"));
    navigate("/view-product-image");
  };

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
          <div
            // direction={"row"}
            // align={"center"}
            // style={{ overflowX: "scroll" }}
            className="carousel mt-4"
          >
            {urls
              ? urls.map((url) => {
                  return (
                    <div
                      style={{
                        maxWidth: "80vw",
                        marginInlineStart: "0px",
                      }}
                      className="m-2"
                      onClick={() => handleImgClick(url)}
                      key={url}
                    >
                      <img
                        src={url}
                        alt="Product"
                        style={{
                          borderRadius: "25px",
                          maxWidth: "100%",
                        }}
                      />
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
        <div className="col-md-8">
          <div style={{ margin: "2rem" }}>
            <h1
              style={{
                fontFamily: "Dongle",
                fontSize: "50px",
                lineHeight: "0.2",
                fontWeight: "700",
              }}
            >
              {details.title}
            </h1>
            <p
              style={{
                fontFamily: "Dongle",
                fontSize: "25px",
                color: "#636363",
              }}
            >
              {details.catagorey}
            </p>

            <p
              style={{
                fontFamily: "Dongle",
                fontSize: "30px",
                fontWeight: "400",
                marginBottom: "0px",
                lineHeight: "20px",
              }}
            >
              Desciption
            </p>
            <p
              style={{
                fontFamily: "Dongle",
                fontSize: "25px",
                fontWeight: "200",
                height: "15vh",
                lineHeight: "15px",
                marginTop: "0.5rem",
                color: "#696868",
              }}
            >
              {details.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
