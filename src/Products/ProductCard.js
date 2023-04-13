import React, { useEffect, useState } from "react";

import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";

import useImageColor from "use-image-color";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ProductDetails from "./ProductDetails";

const ProductCard = (props) => {
  const { data } = props;
  const IMAGE = data.url;

  // const [imgColors, setColors] = useState([]);

  const { colors } = useImageColor(IMAGE, { cors: true, colors: 5 });
  // console.log(colors);
  // console.log(Math.random(4));

  const scrW = window.innerWidth;
  const colPad =
    scrW > 720
      ? "calc(var(--bs-gutter-x) * 0.5)"
      : "calc(var(--bs-gutter-x) * 0.2)";

  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem("pid", data.id);
    navigate("/product-details");
  };
  return (
    <div
      className="col-lg-3 col-sm-6 col-md-6 col-6"
      style={{
        paddingRight: colPad,
        paddingLeft: colPad,
      }}
      onClick={handleClick}
    >
      <Center py={12}>
        <Box
          role={"group"}
          px={2}
          pt={6}
          //   maxW={"330px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          // boxShadow={"sm"}
          //   rounded={"lg"}
          pos={"relative"}
          zIndex={1}
          borderRadius={30}
          style={{
            boxShadow: "0px 1.5px 15px -10px",
          }}
        >
          <Box
            rounded={"lg"}
            mt={-12}
            pos={"relative"}
            // width={"230px"}
            // _after={{
            //   transition: "all .3s ease",
            //   content: '""',
            //   w: "full",
            //   h: "full",
            //   pos: "absolute",
            //   top: 5,
            //   left: 0,
            //   backgroundImage: `url(${IMAGE})`,
            //   filter: "blur(15px)",
            //   zIndex: -1,
            // }}
            // _groupHover={{
            //   _after: {
            //     filter: "blur(20px)",
            //   },
            // }}
            style={{
              boxShadow: colors
                ? `${"0px 1.5px 20px -5px" + colors[4]}`
                : "#000",
            }}
            borderRadius={20}
          >
            <Image
              rounded={"lg"}
              height={scrW > 720 ? "50vh" : "25vh"}
              //   width={250}
              objectFit={"fit"}
              src={IMAGE}
              w={"full"}
              borderRadius={20}
            />
          </Box>
          <Stack align={"center"}>
            <Heading
              fontSize={"sm"}
              fontFamily={"body"}
              fontWeight={500}
              m={0}
              mt={1}
            >
              {data.title}
            </Heading>
            <Text
              fontSize={"sm"}
              color={"gray.600"}
              p={0}
              style={{ margin: "auto" }}
            >
              {data.catagorey}
            </Text>
            <Stack direction={"row"} align={"center"}>
              <Text fontWeight={800} fontSize={"sm"}>
                ₹{data.price}
              </Text>
              <Text
                textDecoration={"line-through"}
                color={"gray.600"}
                fontSize={"sm"}
                m={0}
              >
                ₹{data.price}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Center>
    </div>
  );
};

export default ProductCard;
