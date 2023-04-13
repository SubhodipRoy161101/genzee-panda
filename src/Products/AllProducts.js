import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import ProductCard from "./ProductCard";

const AllProducts = () => {
  const [prods, setProds] = useState([]);
  var temp = [];
  const getProducts = () => {
    onSnapshot(collection(db, "products"), (docs) => {
      //   console.log("Current data: ", doc.data());
      setProds([]);
      docs.forEach((doc) => {
        var docData = doc.data();
        docData["id"] = doc.id;
        console.log(docData);
        setProds((prods) => [...prods, docData]);
      });
    });
  };

  useEffect(() => {
    getProducts();
    // setProds([]);
  }, []);
  return (
    <>
      {console.log(prods)}
      <div className="container">
        <div className="row">
          {prods.map((prod) => {
            return <ProductCard data={prod} key={prod.id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
