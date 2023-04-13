import React from "react";

import "./ViewImage.css";

const ViewImage = () => {
  return (
    <div className="container">
      <div className="btn">This is a btn</div>
      <div className="row justify-content-around my-4">
        <div className="col-md-4">
          <div className="prod-image">
            <img
              src={localStorage.getItem("imgUrl")}
              alt="product View"
              //   style={{ width: "25vw" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewImage;
