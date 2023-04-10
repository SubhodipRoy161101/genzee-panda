import React, { useState } from "react";

import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input,
  Center,
  Button,
} from "@chakra-ui/react";

import { doc, addDoc, collection, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";

import { BsPerson } from "react-icons/bs";

const AddProduct = () => {
  const image = [];
  const [imageError, setImageError] = useState(false);

  const [data, setData] = useState({
    size: "",
    fabric: "",
    color: "",
    title: "",
    desc: "",
    tags: "",
    price: "",
    url: "",
  });

  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];

  const handleImage = (e) => {
    let selectedFile = [];
    for (let i = 0; i < e.target.files.length; i++) {
      selectedFile.push(e.target.files[i]);
    }

    if (selectedFile.length > 0) {
      for (let i = 0; i < selectedFile.length; i++) {
        if (selectedFile[i] && types.includes(selectedFile[i].type)) {
          image.push(selectedFile[i]);
          setImageError(false);
        } else {
          console.log("Exexuting Else");
          // setImage(null);
          setImageError(true);
        }
      }
    } else {
      console.log("Please select your file");
    }
  };

  const docRef = collection(db, "products");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const urls = [];

  const addImage = async (pid) => {
    console.log(image);
    for (let i = 0; i < image.length; i++) {
      const storageRef = ref(storage, `${pid + "/image" + i}`);
      await uploadBytes(storageRef, image[i])
        .then((snapshot) => {
          console.log("Uploaded a blob or file!");
        })
        .then(async () => {
          await getDownloadURL(ref(storage, `${pid + "/image" + i}`)).then(
            (url) => {
              urls.push(url);
            }
          );
        })
        .then(async () => {
          const prodRef = doc(db, "products", pid);
          await updateDoc(prodRef, { url: urls });
        });
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    await addDoc(docRef, data)
      .then((res) => {
        console.log(res._key.path.segments[1]);
        addImage(res._key.path.segments[1]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <form autoComplete="on">
        <div className="row m-2 p-2 mt-4 py-4 shadow rounded-4">
          <div className="col-sm-12 col-md-6 col-lg-6">
            <FormControl id="name" isRequired>
              <FormLabel>Title</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftAddon
                  pointerEvents="none"
                  children={<BsPerson color="blue.50" />}
                />
                <Input name="title" onChange={handleChange} />
              </InputGroup>
            </FormControl>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <FormControl id="name" isRequired>
              <FormLabel>Description</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftAddon
                  pointerEvents="none"
                  children={<BsPerson color="blue.50" />}
                />
                <Input name="desc" onChange={handleChange} />
              </InputGroup>
            </FormControl>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <FormControl id="name" isRequired>
              <FormLabel>Price</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftAddon
                  pointerEvents="none"
                  children={<BsPerson color="blue.50" />}
                />
                <Input name="price" onChange={handleChange} />
              </InputGroup>
            </FormControl>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <FormControl id="name" isRequired>
              <FormLabel>Catagorey</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftAddon
                  pointerEvents="none"
                  children={<BsPerson color="blue.50" />}
                />
                <Input name="tags" onChange={handleChange} />
              </InputGroup>
            </FormControl>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <FormControl id="name" isRequired>
              <FormLabel>Size</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftAddon
                  pointerEvents="none"
                  children={<BsPerson color="blue.50" />}
                />
                <Input name="size" onChange={handleChange} />
              </InputGroup>
            </FormControl>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <FormControl id="name" isRequired>
              <FormLabel>Fabric</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftAddon
                  pointerEvents="none"
                  children={<BsPerson color="blue.50" />}
                />
                <Input name="fabric" onChange={handleChange} />
              </InputGroup>
            </FormControl>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <FormControl id="name" isRequired>
              <FormLabel>Colors</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftAddon
                  pointerEvents="none"
                  children={<BsPerson color="blue.50" />}
                />
                <Input
                  name="color"
                  onChange={handleChange}
                  placeholder="Enter Values seperated by ','"
                />
              </InputGroup>
            </FormControl>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <FormControl id="name">
              <FormLabel>Image</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftAddon
                  pointerEvents="none"
                  children={<BsPerson color="blue.50" />}
                />
                <Input
                  name="name"
                  type="file"
                  onChange={handleImage}
                  multiple
                />
              </InputGroup>
            </FormControl>
            {imageError ? (
              <div>Please select a valid format (jpg,jpeg,png)</div>
            ) : (
              ""
            )}
          </div>
          <div className="row justify-content-around">
            <div className="col-4 my-2">
              <Center>
                <Button
                  variant="ghost"
                  bg="gray.100"
                  type="submit"
                  onClick={handleAddProduct}
                >
                  Add Product
                </Button>
              </Center>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
