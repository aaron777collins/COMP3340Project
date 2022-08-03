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

const pages = ["Products", "About Us", "FAQ"];
const settings = ["Profile", "Logout"];
const pages_dict: { [name: string]: string } = {};
pages_dict["Products"] = "products";
pages_dict["About Us"] = "about";
pages_dict["FAQ"] = "faq";
pages_dict["Profile"] = "profile";

export interface INavBar {
  items: CartItemModel[];
  setItems: Function;
  userAuth: UserAuth;
  setUserAuth: Function;
}

const Navbar = (props: INavBar) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function logout() {
    const authObj = {username: "", authLevel: AUTH_LEVEL.rejected} as UserAuth;
    props.setUserAuth(authObj);
    sessionStorage.setItem(USER_AUTH_KEY, JSON.stringify(authObj));
    localStorage.setItem(USER_AUTH_KEY, JSON.stringify(authObj));
  }

  function getProfileOrLogin() {
    if (props.userAuth && props.userAuth.authLevel !== AUTH_LEVEL.rejected) {
      return (
        <>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                <Avatar
                  alt="Aaron Collins"
                  {...stringAvatar("Aaron Collins")}
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
    } else {
      return (
        <>
          <Link
            href="login"
            underline="none"
            sx={{ color: "inherit" }}
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

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CelebrationIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Fun Stuff
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
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
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Fun Stuff
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
                href={pages_dict[page]}
              >
                {page}
              </Button>
            ))}
          </Box>
          <ShoppingCartManager items={props.items} setItems={props.setItems} />
          {getProfileOrLogin()}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
