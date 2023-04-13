import React from "react";

import "./ViewImage.css";

const ViewImage = () => {
  return (
    <div className="container">
      <div className="btn">This is a btn</div>
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
