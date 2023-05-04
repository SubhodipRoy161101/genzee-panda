import React, { useEffect } from "react";
import { useState } from "react";
import { doc, getDoc, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

import { json } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import ProductContext from "./ProductContext";

const ProductState = (props) => {
  const [details, setDetails] = useState({});
  const [fl, setFl] = useState(1);
  const [updateBgColor, setUpdateBgColor] = useState(true);
  const getProdDetails = () => {
    setFl(0);
    console.log("In Get Product details");
    const ref = doc(db, "products", localStorage.getItem("pid"));
    onSnapshot(ref, (doc) => {
      setDetails(doc.data());
      console.log(details);
    });
  };

  //COmment

  const navigate = useNavigate();

  const handleImgClick = (url) => {
    localStorage.setItem("imgUrl", url);
    console.log(localStorage.getItem("imgUrl"));
    // setFl(0);
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

  const [bgColor, setBgColor] = useState(
    details.url ? Object.keys(details.url)[0] : ""
  );

  console.log(bgColor);

  useEffect(() => {
    if (fl === 1) {
      getProdDetails();
    }
    setUrls(details.url ? details.url[Object.keys(details.url).sort()[0]] : "");
    setColors(details.url ? Object.keys(details.url) : []);
    setSizes(details.url ? details.size.split(",") : []);
  }, [details.url]);

  useEffect(() => {
    if (updateBgColor) {
      console.log("Inside setBgColor");
      setBgColor(
        details.url ? Object.keys(details.url).sort()[0].toLowerCase() : ""
      );
    }
  }, [colors]);

  const [sizes, setSizes] = useState(
    details.size ? details.size.split(",") : []
  );

  const [size, setSize] = useState("");
  console.log(size);

  return (
    <ProductContext.Provider
      value={{
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
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
