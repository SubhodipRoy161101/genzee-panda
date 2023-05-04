import { ChakraProvider } from "@chakra-ui/react";
import Login from "./Login";
import Home from "./Home";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import UserState from "./Context/User/UserState";
import UserDetails from "./UserDetails";
import AddProduct from "./AddProduct";

import { Provider } from "react-redux";
import ProductDetails from "./Products/ProductDetails";
import ViewImage from "./Products/ViewImage";
import Test from "./Test";
import ProductState from "./Context/Products/ProductState";

function App() {
  // const location = useLocation();
  return (
    <ChakraProvider>
      <UserState>
        <BrowserRouter>
          <ProductState>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user" element={<UserDetails />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/product-details" element={<ProductDetails />} />
              <Route path="/view-product-image" element={<ViewImage />} />
              <Route path="/test" element={<Test />} />
            </Routes>
          </ProductState>
        </BrowserRouter>
      </UserState>
    </ChakraProvider>
  );
}

export default App;
