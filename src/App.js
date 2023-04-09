import { ChakraProvider } from "@chakra-ui/react";
import Login from "./Login";
import Home from "./Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserState from "./Context/User/UserState";
import UserDetails from "./UserDetails";
import AddProduct from "./AddProduct";

function App() {
  return (
    <ChakraProvider>
      <UserState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<UserDetails />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Routes>
        </BrowserRouter>
      </UserState>
    </ChakraProvider>
  );
}

export default App;
