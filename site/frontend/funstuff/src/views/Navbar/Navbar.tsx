import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { Link } from "@mui/material";
import ShoppingCartManager from "../ShoppingCartManager/ShoppingCartManager";
import { CartItemModel } from "../../Models/Item";
import { stringAvatar } from "../../Helpers/ProfileHelper";
import { AUTH_LEVEL, UserAuth } from "../../Models/Auths";
import { USER_AUTH_KEY } from "../../Models/Keys";
import { getLogger } from "../../LogConfig";
import { useEffect, useState } from "react";
import { setNewTheme } from "../../Helpers/ThemeHelper";

// Public page link names array
export const pages = [
  "Products",
  "About Us",
  "FAQ",
  "Legal",
  "Terms and Conditions",
  "Privacy",
  "Refund",
];
// settings link names
const settings = ["Profile", "Logout"];
// Maps the page link names to the url page name
export const pages_dict: { [name: string]: string } = {
  "Products": "products",
  "About Us": "about",
  "FAQ": "faq",
  "Profile": "profile",
  "Legal": "legal",
  "Terms and Conditions": "terms",
  "Privacy": "privacy",
  "Refund": "refund",
  "Admin": "admin",
  "Home": " ",
};

// Inputs for the navbar component
export interface INavBar {
  items: CartItemModel[];
  setItems: Function;
  userAuth: UserAuth;
  setUserAuth: Function;
  loading: boolean;
  setLoading: Function;
  setCurrentTheme: Function;
}

// Gets the navbar logger (used for debugging)
const log = getLogger("view.navbar");

// Creates navbar functional component
const Navbar = (props: INavBar) => {
  // declares react hooks for storing variables that react can monitor (and refresh components with)
  // Has getters and setters (a setter refreshes on the next render frame)
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    // Opens the nav menu and maintains state
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    // Opens the user menu and maintains state
    setAnchorElUser(event.currentTarget);
  };

  // Closes the nav menu (has state)
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Closes the user menu (has state)
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //  return the links to display (depends on whether you're admin or not)
  function getPages() {
    return (props.userAuth.authLevel === AUTH_LEVEL.admin) ? [...pages, "Admin"] : pages;
  }

  // Logs the user out of the account
  function logout() {
    // Starts loading screen
    props.setLoading(true);
    const authObj = {
      username: "",
      authLevel: AUTH_LEVEL.rejected,
    } as UserAuth;
    // Sets the current user auth to rejected (logged out)
    props.setUserAuth(authObj);
    // Does the same for local and session storage (for refresh, etc)
    sessionStorage.setItem(USER_AUTH_KEY, JSON.stringify(authObj));
    localStorage.setItem(USER_AUTH_KEY, JSON.stringify(authObj));
    // If on profile, force the user to the home page
    const hrefArr = window.location.href.split("/");
    if (hrefArr[hrefArr.length - 1] === "profile") {
      window.location.href = "/";
    }
    // Stop loading after 500ms (makes the transition cleaner)
    setTimeout(() => props.setLoading(false), 500);
  }

  // Returns the profile icon or a login button (depends on whether they are logged in)
  function getProfileOrLogin() {
    // Checks if the user is logged in
    if (props.userAuth && props.userAuth.authLevel !== AUTH_LEVEL.rejected) {
      // If so, return the avatar icon (and all the settings)
      return (
        <>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                <Avatar
                  alt={props.userAuth.username.toUpperCase()}
                  {...stringAvatar(props.userAuth.username.toUpperCase())}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => {
                if (setting !== "Logout") {
                  return (
                    <Link
                      href={pages_dict[setting]}
                      underline="none"
                      sx={{ color: "text.primary" }}
                      key={setting}
                    >
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    </Link>
                  );
                } else {
                  return (
                    <Link
                      underline="none"
                      sx={{ color: "text.primary" }}
                      key={setting}
                      onClick={logout}
                    >
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    </Link>
                  );
                }
              })}
            </Menu>
          </Box>
        </>
      );
      // Otherwise, just return a login button
    } else {
      return (
        <>
          <Link
            href="login"
            underline="none"
            sx={{ color: "text.primary" }}
            key="login"
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Login</Typography>
            </MenuItem>
          </Link>
        </>
      );
    }
  }

  // Returns the main navbar
  return (
    <>
      <AppBar position="sticky" sx={{borderBottom:0, color: 'text.primary'}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* When xs is 'none', this element won't show on mobile/small view. lg: flex means it shows when the screen is large.
            The opposite applies when xs is flex and lg is none */}
            <CelebrationIcon
              sx={{ display: { xs: "none", lg: "flex", color:'inherit'}, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", lg: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "text.primary",
                textDecoration: "none",
              }}
            >
              Fun Stuff
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", lg: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", lg: "none" },
                }}
              >
                {getPages().map((page) => (
                  <Link
                    key={page}
                    href={pages_dict[page]}
                    underline="none"
                    sx={{ color: "text.primary" }}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
            <CelebrationIcon
              sx={{ display: { xs: "flex", lg: "none" }, mr: 1, color:'text.primary'}}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", lg: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "text.primary",
                textDecoration: "none",
              }}
            >
              Fun Stuff
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", lg: "flex" } }}>
              {getPages().map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    textAlign: "center",
                  }}
                  href={pages_dict[page]}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{flexGrow: 0, display: {xs: "none", lg: "flex"}}}>
            <Button color='secondary' sx={{marginLeft:'10px'}}variant='contained' onClick={()=> {
              setNewTheme(props.setCurrentTheme)
            }}>Switch theme</Button>
            </Box>
            <Box sx={{flexGrow: 0, display: {xs: "flex", lg: "none"}}}>
            <IconButton color='secondary' sx={{marginLeft:'10px', width: 40}} onClick={()=> {
              setNewTheme(props.setCurrentTheme)
            }}>T</IconButton>
            </Box>
            <ShoppingCartManager
              items={props.items}
              setItems={props.setItems}
            />
            {getProfileOrLogin()}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default Navbar;
