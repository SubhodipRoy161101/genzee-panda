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
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { MdAlternateEmail, MdEmail } from "react-icons/md";
import { BsPhone, BsTelephone, BsPerson, BsGlobe2 } from "react-icons/bs";
import { FaRegAddressCard, FaCity } from "react-icons/fa";
import { TbBuildingEstate } from "react-icons/tb";
import { GrLocationPin } from "react-icons/gr";

import { db } from "./firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

import UserContext from "./Context/User/UserContext";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const context = useContext(UserContext);
  const { getUser, user } = context;

  const navigate = useNavigate();

  console.log(user);

  const phone = user.address ? user.address.phone : "";
  const alternate_phone = user.address ? user.address.altPhone : "";
  const name = user.address ? user.address.name : "";
  const email = user.address ? user.address.email : "";
  const address = user.address ? user.address.address : "";
  const city = user.address ? user.address.city : "";
  const state = user.address ? user.address.state : "";
  const country = user.address ? user.address.country : "";
  const pin = user.address ? user.address.pin : "";

  // const [data, setData] = useState({
  //   name: name,
  //   phone: phone,
  //   email: email,
  //   altPhone: alternate_phone,
  //   address: address,
  //   city: city,
  //   state: state,
  //   country: country,
  //   pin: pin,
  // });

  var data = {
    name: name,
    phone: phone,
    email: email,
    altPhone: alternate_phone,
    address: address,
    city: city,
    state: state,
    country: country,
    pin: pin,
  };

  console.log(data);

  const [alert, setAlert] = useState(false);

  const onChange = (e) => {
    data[e.target.name] = e.target.value;
    console.log(data);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const uid = localStorage.getItem("uid");
    console.log(data);
    const docRef = doc(db, "User", uid);
    await updateDoc(docRef, { address: data })
      .then((res) => {
        console.log(res);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container">
      <form autoComplete="on">
        <div className="row m-2 p-2 mt-4 py-4 shadow rounded-4">
          <div className="col-md-12">
            {alert ? (
              <Alert status="success">
                <AlertIcon />
                Data updated. Redirecting to home
              </Alert>
            ) : (
              ""
            )}
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <FormControl id="name" isRequired>
              <FormLabel>Full Name</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftAddon
                  pointerEvents="none"
                  children={<BsPerson color="blue.50" />}
                />
                <Input onChange={onChange} name="name" defaultValue={name} />
              </InputGroup>
            </FormControl>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <FormControl id="name" isRequired>
              <FormLabel>Phone</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftAddon
                  pointerEvents="none"
                  children={<BsTelephone color="blue.50" />}
                />
                <Input onChange={onChange} name="phone" defaultValue={phone} />
              </InputGroup>
            </FormControl>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 my-2">
            <FormControl id="name" isRequired>
              <FormLabel>Email</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftAddon
                  pointerEvents="none"
                  children={<MdEmail color="blue.50" />}
                />
                <Input onChange={onChange} name="email" defaultValue={email} />
              </InputGroup>
            </FormControl>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 my-2">
            <FormControl id="name">
              <FormLabel>Alt. Phone</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftAddon
                  pointerEvents="none"
                  children={<BsPhone color="blue.50" />}
                />
                <Input
                  onChange={onChange}
                  name="altPhone"
                  defaultValue={alternate_phone}
                />
              </InputGroup>
            </FormControl>
          </div>
          <div className="col-12">
            <FormControl id="name" isRequired>
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
                  defaultValue={address}
                  // isDisable={isDisable}
                />
              </InputGroup>
            </FormControl>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 my-2">
            <FormControl id="name" isRequired>
              <FormLabel>City</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftAddon
                  pointerEvents="none"
                  children={<FaCity color="blue.50" />}
                />
                <Input onChange={onChange} name="city" defaultValue={city} />
              </InputGroup>
            </FormControl>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 my-2">
            <FormControl id="name" isRequired>
              <FormLabel>State</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftAddon
                  pointerEvents="none"
                  children={<TbBuildingEstate color="blue.50" />}
                />
                <Input onChange={onChange} name="state" defaultValue={state} />
              </InputGroup>
            </FormControl>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 my-2">
            <FormControl id="name" isRequired>
              <FormLabel>Country</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftAddon
                  pointerEvents="none"
                  children={<BsGlobe2 color="blue.50" />}
                />
                <Input
                  onChange={onChange}
                  name="country"
                  defaultValue={country}
                />
              </InputGroup>
            </FormControl>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 my-2">
            <FormControl id="name" isRequired>
              <FormLabel>Pincode</FormLabel>
              <InputGroup borderColor="#E0E1E7">
                <InputLeftAddon
                  pointerEvents="none"
                  children={<GrLocationPin color="blue.50" />}
                />
                <Input onChange={onChange} name="pin" defaultValue={pin} />
              </InputGroup>
            </FormControl>
          </div>
          <div className="row justify-content-around">
            <div className="col-4 my-2">
              <Center>
                <Button
                  variant="ghost"
                  bg="gray.100"
                  onClick={updateUser}
                  type="submit"
                >
                  Update
                </Button>
              </Center>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserDetails;
