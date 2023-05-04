import React from "react";
import { Tabs, TabList, Tab } from "@chakra-ui/react";
const OptionBtns = (props) => {
  const { bgColor, val, onClick, type } = props;
  console.log(onClick);
  return (
    <Tab
      style={{
        borderRadius: "0.5rem",
        fontSize: "1rem",
        fontFamily: "Source Sans Pro",
        marginRight: "0.5rem",
      }}
      bg={
        type == "color"
          ? `${bgColor.toLowerCase() + ".100"}`
          : `${bgColor.toLowerCase() + ".50"}`
      }
      key={val}
      onClick={onClick}
    >
      {`${val[0].toUpperCase() + val.substring(1)}`}
    </Tab>
  );
};

export default OptionBtns;
