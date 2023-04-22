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

// import extractSingleColor from "image-color-extractor";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ProductDetails from "./ProductDetails";

const ProductCard = (props) => {
  const { data } = props;
  console.log(data);
  const IMAGE = data.url[Object.keys(data.url).sort()[0]];
  console.log(IMAGE);

  // const [imgColors, setColors] = useState([]);

  // useEffect(() => {
  //   extractSingleColor(IMAGE)
  //     .then((color) => console.log(color))
  //     .catch((error) => console.error(error));
  // }, []);

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
            style={{ boxShadow: "0px 1.5px 20px -5px" }}
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
