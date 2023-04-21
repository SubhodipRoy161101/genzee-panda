import React, { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Box, Button, Stack } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import "./ProductDetails.css";

let fl = 1;
const ProductDetails = () => {
  const [details, setDetails] = useState({});

  const getProdDetails = () => {
    fl = 0;
    console.log("In Get Product details");
    const ref = doc(db, "products", localStorage.getItem("pid"));
    onSnapshot(ref, (doc) => {
      setDetails(doc.data());
      console.log(details);
    });
  };

  useEffect(() => {
    if (fl === 1) {
      getProdDetails();
    }
    setUrls(details.url ? details.url[Object.keys(details.url).sort()[0]] : "");
    setColors(details.url ? Object.keys(details.url) : []);
  }, [details.url]);

  //COmment

  const navigate = useNavigate();

  const handleImgClick = (url) => {
    localStorage.setItem("imgUrl", url);
    console.log(localStorage.getItem("imgUrl"));
    fl = 1;
    navigate("/view-product-image");
  };

  console.log(details.url);
  const [urls, setUrls] = useState(
    details.url ? details.url[Object.keys(details.url)[0]] : ""
  );
  const [colors, setColors] = useState(
    details.url ? Object.keys(details.url) : []
  );

  console.log(colors);

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
              ? urls.sort().map((url) => {
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
        <div className="col-md-8 mt-4">
          <div style={{ margin: "1.5rem" }}>
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

            <h2
              style={{
                fontFamily: "Dongle",
                fontSize: "30px",
                fontWeight: "600",
                marginBottom: "0px",
                lineHeight: "20px",
              }}
            >
              Desciption
            </h2>
            <p
              style={{
                fontFamily: "Dongle",
                fontSize: "25px",
                fontWeight: "200",
                height: "25vh",
                lineHeight: "15px",
                marginTop: "0.5rem",
                padding: "0.2rem",
                color: "#696868",
                overflow: "auto",
              }}
            >
              {details.desc}
            </p>
            <h2
              style={{
                fontFamily: "Dongle",
                fontSize: "30px",
                fontWeight: "600",
                marginBottom: "0px",
                lineHeight: "20px",
              }}
            >
              Colors
            </h2>
            {colors.sort().map((color) => {
              return (
                <Button
                  onClick={() => setUrls(details.url[color])}
                  style={{
                    fontFamily: "Dongle",
                    margin: "0.5rem",
                    fontSize: "25px",
                    fontWeight: "600",
                  }}
                >
                  {color}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
