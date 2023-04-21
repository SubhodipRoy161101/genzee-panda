import React, { useEffect, useState } from "react";
var fl = 1;
const Test = () => {
  var urls = {};

  const updateUrls = () => {
    fl = 0;
    for (let i = 0; i < 5; i++) {
      var colors = [];
      for (let j = 0; j < 6; j++) {
        colors.push(j);
      }
      console.log(colors);
      urls[i] = colors;
    }
    console.log(urls);
  };
  useEffect(() => {
    if (fl === 1) {
      updateUrls();
    }
  }, []);
  return (
    <div>
      <h1>This is test component</h1>
    </div>
  );
};

export default Test;
