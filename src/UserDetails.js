import React, { useState, useContext, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
  Button,
  Center,
} from "@chakra-ui/react";
import { MdAlternateEmail, MdEmail } from "react-icons/md";
import { BsPhone, BsTelephone, BsPerson, BsGlobe2 } from "react-icons/bs";
import { FaRegAddressCard, FaCity } from "react-icons/fa";
import { TbBuildingEstate } from "react-icons/tb";
import { GrLocationPin } from "react-icons/gr";

import { auth, provider, db } from "./firebase";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";

import UserContext from "./Context/User/UserContext";
import { setUserId } from "firebase/analytics";

const UserDetails = () => {
  const context = useContext(UserContext);
  const { getUser, user } = context;

  console.log(user);

  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    altPhone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pin: "",
  });

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // console.log(data);
  };

  const updateDisable =
    data.name === "" ||
    data.address === "" ||
    data.city === "" ||
    data.pin === "" ||
    data.state === "" ||
    data.email === "" ||
    data.phone === "";

  console.log(updateDisable);

  const updateUser = (e) => {
    e.preventDefault();
    const uid = localStorage.getItem("uid");
    console.log(data);
    console.log(uid);
    const docRef = doc(db, "User", uid);
    setDoc(docRef, data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [isDisable, setIsDisable] = useState(true);
  // const isDisable = true;

  // const { address } = user;
  const phone = user.address ? user.address.billing_phone : "";
  const alternate_phone = user.address ? user.address.alternate_phone : "";

  return (
    <div className="container">
      <form autoComplete="on">
        <div className="row m-2 p-2 mt-4 py-4 shadow rounded-4">
          <div className="col-sm-12 col-md-6 col-lg-6">
            <FormControl id="name" isRequired isDisabled={isDisable}>
              <FormLabel>Name</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftAddon
                  pointerEvents="none"
                  children={<BsPerson color="blue.50" />}
                />
                <Input onChange={onChange} name="name" default={user.name} />
              </InputGroup>
            </FormControl>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <FormControl id="name" isRequired isDisabled={isDisable}>
              <FormLabel>Phone</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftAddon
                  pointerEvents="none"
                  children={<BsTelephone color="blue.50" />}
                />
                <Input onChange={onChange} name="phone" value={phone} />
              </InputGroup>
            </FormControl>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 my-2">
            <FormControl id="name" isRequired isDisabled={isDisable}>
              <FormLabel>Email</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftAddon
                  pointerEvents="none"
                  children={<MdEmail color="blue.50" />}
                />
                <Input onChange={onChange} name="email" />
              </InputGroup>
            </FormControl>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 my-2">
            <FormControl id="name" isDisabled={isDisable}>
              <FormLabel>Alt. Phone</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftAddon
                  pointerEvents="none"
                  children={<BsPhone color="blue.50" />}
                />
                <Input
                  onChange={onChange}
                  name="altPhone"
                  value={alternate_phone}
                />
              </InputGroup>
            </FormControl>
          </div>
          <div className="col-12">
            <FormControl id="name" isRequired isDisabled={isDisable}>
              <FormLabel>Address</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftAddon
                  pointerEvents="none"
                  children={<FaRegAddressCard color="blue.50" />}
                />
                <Textarea
                  borderStartRadius={1}
                  onChange={onChange}
                  name="address"
                  // isDisable={isDisable}
                />
              </InputGroup>
            </FormControl>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 my-2">
            <FormControl id="name" isRequired isDisabled={isDisable}>
              <FormLabel>City</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftAddon
                  pointerEvents="none"
                  children={<FaCity color="blue.50" />}
                />
                <Input onChange={onChange} name="city" />
              </InputGroup>
            </FormControl>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 my-2">
            <FormControl id="name" isRequired isDisabled={isDisable}>
              <FormLabel>State</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftAddon
                  pointerEvents="none"
                  children={<TbBuildingEstate color="blue.50" />}
                />
                <Input onChange={onChange} name="state" />
              </InputGroup>
            </FormControl>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 my-2">
            <FormControl id="name" isRequired isDisabled={isDisable}>
              <FormLabel>Country</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftAddon
                  pointerEvents="none"
                  children={<BsGlobe2 color="blue.50" />}
                />
                <Input onChange={onChange} name="country" />
              </InputGroup>
            </FormControl>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 my-2">
            <FormControl id="name" isRequired isDisabled={isDisable}>
              <FormLabel>Pincode</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftAddon
                  pointerEvents="none"
                  children={<GrLocationPin color="blue.50" />}
                />
                <Input onChange={onChange} name="pin" />
              </InputGroup>
            </FormControl>
          </div>
          <div className="row justify-content-around">
            {!isDisable ? (
              <div className="col-4 my-2">
                <Center>
                  <Button
                    variant="ghost"
                    bg="gray.100"
                    onClick={updateUser}
                    type="submit"
                    disabled
                  >
                    Update
                  </Button>
                </Center>
              </div>
            ) : (
              ""
            )}

            {isDisable ? (
              <div className="col-4 my-2">
                <Center>
                  <Button
                    variant="ghost"
                    bg="gray.100"
                    onClick={() => {
                      setIsDisable(!isDisable);
                    }}
                  >
                    Edit
                  </Button>
                </Center>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserDetails;
