import React from "react";
import { useNavigate } from "react-router-dom";

import "./ViewImage.css";

const ViewImage = () => {
  const navigate = useNavigate();
  return (
    <div
      className="container"
      style={{ zIndex: "-1", position: "fixed", top: "0px", left: "0px" }}
    >
      <div className="btn" onClick={() => navigate("/product-details")}>
        Back
      </div>
      <div className="row justify-content-around my-4">
        <div className="col-md-4" style={{ padding: "0px", margin: "0px" }}>
          <div className="prod-image" style={{ overflow: "scroll" }}>
            <img
              src={localStorage.getItem("imgUrl")}
              alt="product View"
              style={{ width: "100vw" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewImage;
