import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import About from "./About/About";
import Navbar from "./Navbar/Navbar";
import ProductsController from "./Products/ProductsController";
import Faq from "./FAQ/Faq";
import Checkout from "./Checkout/Checkout";
import Login from "./Login/login";
import SignUp from "./SignUp/signup";
import Admin from "./Admin/Admin";
import { useEffect, useState } from "react";
import { ShoppingCartSessionStorageModel, SHOPPING_CART_KEY } from "../Models/Keys";
import { CartItemModel } from "../Models/Item";
import Profile from "./Profile/Profile";

// import { getLogger } from "../LogConfig";
// const log = getLogger("view.app");


function App() {

  const [items, setItems] = useState([] as CartItemModel[]);


  useEffect(() => {
    // checks if there is some items in the session storage
    let data = localStorage.getItem(SHOPPING_CART_KEY);
    if (data) {
      let shoppingCart = JSON.parse(data) as ShoppingCartSessionStorageModel;
      // if so, it sets the items to the session storage's items
      setItems(shoppingCart.items);
    }
  }, []);

  return (
    <>
      <Navbar items={items} setItems={setItems} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<ProductsController items={items} setItems={setItems} />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
