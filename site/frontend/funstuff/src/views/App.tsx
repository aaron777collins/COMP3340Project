import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import About from "./About/About";
import Navbar from "./Navbar/Navbar";
import ProductsController from "./Products/ProductsController";
import Faq from "./FAQ/Faq";
import Legal from "./Legal/Legal";
import Checkout from "./Checkout/Checkout";
import Login from "./Login/login";
import SignUp from "./SignUp/signup";
import Admin from "./Admin/Admin";
import Terms from "./Terms/Terms";
import Privacy from "./Privacy/Privacy";
import Refund from "./Refund/Refund";
import { useEffect, useState } from "react";
import {
  ShoppingCartSessionStorageModel,
  SHOPPING_CART_KEY,
  USER_AUTH_KEY,
} from "../Models/Keys";
import { CartItemModel } from "../Models/Item";
import Profile from "./Profile/Profile";
import { UserAuth, AUTH_LEVEL } from "../Models/Auths";

import { getLogger } from "../LogConfig";
import {
  Backdrop,
  CircularProgress,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import ProductDesc from "./ProductDesc/ProductDesc";
import ErrorPage from "./Error/ErrorPage";
import { THEME_KEY } from "../Helpers/ThemeHelper";
const log = getLogger("view.app");

const fontTheme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
    ].join(","),
  },
});

const blueTheme = createTheme({
  palette: {
    background: {
      paper: '#93b3db',
    },
    primary: {
      main: '#2d7fe3',
    },
    secondary: {
      main: '#0e2745'
    }
  },
  typography: {
    fontFamily: [
      '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
    ].join(","),
  },
});

const greenTheme = createTheme({
  palette: {
    background: {
      default: "#ffffff",
      paper: '#bcebc5',
    },
    primary: {
      main: '#3ae05a',
    },
    secondary: {
      main: '#0f3b18'
    }
  },
  typography: {
    fontFamily: [
      '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
    ].join(","),
  },

});

const whiteTheme = createTheme({
  palette: {
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#0c223b'
    }
  },
  typography: {
    fontFamily: [
      '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
    ].join(","),
  },

});


function App() {
  const [items, setItems] = useState([] as CartItemModel[]);
  const [userAuth, setUserAuth] = useState({
    username: "",
    authLevel: AUTH_LEVEL.rejected,
  } as UserAuth);

  const [currentTheme, setCurrentTheme] = useState(blueTheme)

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // checks if there is some items in the local storage
    let data = localStorage.getItem(SHOPPING_CART_KEY);
    if (data) {
      let shoppingCart = JSON.parse(data) as ShoppingCartSessionStorageModel;
      // if so, it sets the items to the local storage's items
      setItems(shoppingCart.items);
    }

    //checks if the theme has been set
    let themeData = localStorage.getItem(THEME_KEY);
    console.log("Current theme: "+themeData);
    if (themeData) {
      if (themeData === 'green'){
        setCurrentTheme(greenTheme);
      }
      else if (themeData === 'blue'){
        setCurrentTheme(blueTheme);
      }
      else if (themeData === 'white'){
        setCurrentTheme(whiteTheme);
      }
    }
    else{
      localStorage.setItem(THEME_KEY, 'blue');
      setCurrentTheme(blueTheme);
    }

    // checks if there is auth in the local storage
    let userData = localStorage.getItem(USER_AUTH_KEY);
    if (userData && JSON.parse(userData).authLevel !== AUTH_LEVEL.rejected) {
      log.debug(userData);
      let userDataObj = JSON.parse(userData) as UserAuth;
      // if so, it sets auth
      setUserAuth(userDataObj);
    } else {
      // checks if there is auth in the session storage
      userData = sessionStorage.getItem(USER_AUTH_KEY);
      if (userData && JSON.parse(userData).authLevel !== AUTH_LEVEL.rejected) {
        let userDataObj = JSON.parse(userData) as UserAuth;
        // if so, it sets auth
        setUserAuth(userDataObj);
      }
    }
    setLoading(false);
  }, []);

  return (
    <>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Navbar
          items={items}
          setItems={setItems}
          userAuth={userAuth}
          setUserAuth={setUserAuth}
          loading={loading}
          setLoading={setLoading}
          setCurrentTheme={setCurrentTheme}
        />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Home loading={loading} setLoading={setLoading} />}
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/products"
              element={<ProductsController items={items} setItems={setItems} loading={loading} setLoading={setLoading}/>}
            />
            <Route
              path="/productDescription"
              element={<ProductDesc items={items} setItems={setItems} />}
            />
            <Route path="/faq" element={<Faq />} />
            <Route path="/checkout" element={<Checkout items={items} setItems={setItems}/>} />
            <Route
              path="/login"
              element={<Login userAuth={userAuth} setUserAuth={setUserAuth} />}
            />
            <Route
              path="/signup"
              element={<SignUp userAuth={userAuth} setUserAuth={setUserAuth} />}
            />
            <Route path="/admin" element={<Admin />} />
            <Route
              path="/profile"
              element={
                <Profile userAuth={userAuth} setUserAuth={setUserAuth} />
              }
            />
            <Route path="/legal" element={<Legal />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
