import React, { useContext } from "react";
import { Box, Button, Badge, Tabs, TabList, Tab } from "@chakra-ui/react";

import "./ProductDetails.css";

import ProductContext from "../Context/Products/ProductContext";
import OptionBtns from "./OptionBtns";

// var fl = 1;
const ProductDetails = (props) => {
  const context = useContext(ProductContext);
  const {
    bgColor,
    urls,
    handleImgClick,
    details,
    colors,
    setUrls,
    setUpdateBgColor,
    setBgColor,
    sizes,
    setSize,
  } = context;
  return (
    <Box bg={`${bgColor + ".50"}`}>
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
            <Box m={4} rounded={"2rem"} className="carouselBox">
              <div className="carousel mt-4">
                {urls
                  ? urls.sort().map((url) => {
                      return (
                        <div
                          style={{
                            maxWidth: "80vw",
                            marginInlineStart: "0px",
                          }}
                          className="col-md-12"
                          onClick={() => handleImgClick(url)}
                          key={url}
                        >
                          <img
                            src={url}
                            alt="Product"
                            style={{
                              // borderRadius: "25px",
                              width: "100%",
                              // height: "90vh",
                            }}
                          />
                        </div>
                      );
                    })
                  : ""}
              </div>
            </Box>
          </div>
          <div className="col-md-8 mt-4">
            <div style={{ margin: "0.75rem" }} className="details">
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
              <p>
                <Badge
                  colorScheme={`${bgColor}`}
                  style={{
                    fontFamily: "Dongle",
                    fontSize: "1rem",
                    color: "#636363",
                    marginRight: "0.5rem",
                  }}
                  rounded={5}
                >
                  {details.catagorey}
                </Badge>

                <Badge
                  colorScheme={`${bgColor}`}
                  style={{
                    fontFamily: "Dongle",
                    fontSize: "1rem",
                    color: "#636363",
                    marginRight: "0.5rem",
                  }}
                  rounded={5}
                >
                  {details.fabric}
                </Badge>
              </p>

              <Box rounded={"1rem"}>
                <p
                  style={{
                    fontFamily: "Dongle",
                    fontSize: "2.5rem",
                    fontWeight: "600",
                  }}
                >
                  <span style={{ fontSize: "1.2rem" }}>₹</span>
                  {details.price}
                </p>
              </Box>

              <Box bg={`${bgColor + ".100"}`} rounded={"1rem"}>
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
              </Box>
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
              <Tabs variant={"soft-rounded"} colorScheme={bgColor}>
                <TabList>
                  {colors.sort().map((color) => {
                    return (
                      <OptionBtns
                        onClick={() => {
                          setUrls(details.url[color]);
                          // setUpdateBgColor(false);
                          if (color.toLowerCase() === "black") {
                            setBgColor("BlackAlpha");
                          } else if (color.toLowerCase() === "black") {
                            setBgColor("gray");
                          } else {
                            setBgColor(color.toLowerCase());
                          }
                        }}
                        bgColor={color}
                        val={color}
                        key={color}
                        type={"color"}
                      />
                    );
                  })}
                </TabList>
              </Tabs>
              <h2
                style={{
                  fontFamily: "Dongle",
                  fontSize: "30px",
                  fontWeight: "600",
                  marginBottom: "0px",
                  lineHeight: "20px",
                  marginTop: "1rem",
                }}
              >
                Size
              </h2>
              <Tabs colorScheme={bgColor} variant="soft-rounded">
                <TabList>
                  {sizes.sort().map((size) => {
                    return (
                      <OptionBtns
                        bgColor={bgColor}
                        val={size}
                        key={size}
                        type={"size"}
                        onClick={() => {
                          setSize(size);
                        }}
                      />
                    );
                  })}
                </TabList>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default ProductDetails;
