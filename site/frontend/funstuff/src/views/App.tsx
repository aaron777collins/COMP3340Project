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
import axios from "axios";

function App() {

  const [items, setItems] = useState([]);


  // useEffect(() => {
  //   axios.get('/db/getAllItems').then((resp) => {
  //       const {data} = resp;
  //       setItems(data.resp);
  //   });
  // }, []);

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

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
