import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import "./Profile.css";
import { stringAvatarBig } from "../../Helpers/ProfileHelper";
import { getLogger } from "../../LogConfig";
import { useEffect, useState } from "react";
import { UserAuth } from "../../Models/Auths";
import DialogInput from "../DialogInput/DialogInput";
import axios from "axios";
import { UserModelSecure, UserTaken, UserUpdateInfo } from "../../Models/User";
import { SaveState } from "../../Models/SaveButton";
import CircularProgress from "@mui/material/CircularProgress";
import AlertDialog from "../AlertDialog/AlertDialog";
import { USER_AUTH_KEY } from "../../Models/Keys";

const log = getLogger("view.profile");

export interface IProfileProps {
  userAuth: UserAuth;
  setUserAuth: Function;
}

export default function Profile(props: IProfileProps) {
  
  // use state declarations
  const [username, setUsername] = useState(props.userAuth.username);
  const [email, setEmail] = useState("");

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [confirmDialogValue, setConfirmDialogValue] = useState(
    "Please enter your password"
  );

  const [openIncorrectPasswordDialog, setOpenIncorrectPasswordDialog] =
    useState(false);
  const [openIncorrectUsernameDialog, setOpenIncorrectUsernameDialog] =
    useState(false);
  const [openTakenUsernameDialog, setOpenTakenUsernameDialog] = useState(false);

  const [saveState, setSaveState] = useState(SaveState.NO_ACTION);

  //get user info on component load with axios 
  useEffect(() => {
    if (
      props.userAuth.username !== "" &&
      props.userAuth.username !== undefined
    ) {
      //endpoint in backend
      axios
        .post(process.env.REACT_APP_DBAPI_ADDRESS_BEGINNING + "getUserInfo", {
          username: props.userAuth.username,
          password: "FunStuffPass123!",
        })
        .then((resp) => {
          const { data } = resp;
          let userDataSecure = data as UserModelSecure;

          setUsername(userDataSecure.username);
          setEmail(userDataSecure.email);
        });
    } else {
    }
  }, [props.userAuth.username]);

  //function to allow user to confirm changes
  function validateForm(e: any) {
    e.preventDefault();
    setOpenConfirmDialog(true);
  }

  //attempt save function, post new changes to backend and set changes in local storage
  function trySave(password: string) {
    setSaveState(SaveState.SAVING);
    axios
      .post(process.env.REACT_APP_DBAPI_ADDRESS_BEGINNING + "updateUser", {
        username: props.userAuth.username,
        newUsername: username,
        email: email,
        password: password,
      } as UserUpdateInfo)
      .then((resp) => {
        // const { data } = resp;
        // let userModel = data.resp as UserModel;
        setSaveState(SaveState.SAVED);
        const authObj = {
          ...props.userAuth,
          username: username,
          rememberMe: props.userAuth.rememberMe,
        } as UserAuth;
        props.setUserAuth(authObj);
        if (props.userAuth.rememberMe && props.userAuth.rememberMe === true) {
          localStorage.setItem(USER_AUTH_KEY, JSON.stringify(authObj));
        } else {
          sessionStorage.setItem(USER_AUTH_KEY, JSON.stringify(authObj));
        }
      })
      .catch((errResp) => {
        log.error(errResp.response.data.message);
        setSaveState(SaveState.ERROR);
        setOpenIncorrectPasswordDialog(true);
      });
  }

  /*
  validate password input. Check input for conflicts with backend and post if none.
  Function alerts user if issue
  */
  function validateInputPassword(password: string) {
    if (username === "admin") {
      setOpenIncorrectUsernameDialog(true);
      setSaveState(SaveState.ERROR);
      setTimeout(() => {
        setSaveState(SaveState.NO_ACTION);
      }, 3000);
      return;
    }

    if (password && password !== "") {
      axios
        .post(process.env.REACT_APP_DBAPI_ADDRESS_BEGINNING + "checkUsername", {
          username: username,
          password: "FunStuffPass123!",
        })
        .then((resp) => {
          const { data } = resp;
          let userTaken = data as UserTaken;

          if (props.userAuth.username !== username && userTaken.taken) {
            //Username is taken
            // show error
            setSaveState(SaveState.ERROR);
            setOpenTakenUsernameDialog(true);
            setTimeout(() => {
              setSaveState(SaveState.NO_ACTION);
            }, 3000);
            return;
          }
          log.debug(props.userAuth.username);
          log.debug(userTaken.taken.toString());
          trySave(password);
        })
        .catch((errResp) => {
          log.error(errResp.response.data.message);
        });
    } else {
      log.debug(`Invalid password: ${password}`);
      setSaveState(SaveState.ERROR);
      setOpenIncorrectPasswordDialog(true);
    }
    setTimeout(() => {
      setSaveState(SaveState.NO_ACTION);
    }, 3000);
  }

  // factory function to get save button
  function getSaveButton() {
    if (saveState === SaveState.SAVING) {
      return (
        <>
          <Button variant="outlined" startIcon={<CircularProgress size={20} />}>
            Saving
          </Button>
        </>
      );
    } else if (saveState === SaveState.SAVED) {
      return (
        <>
          <Button variant="contained" color="success">
            Saved
          </Button>
        </>
      );
    } else if (saveState === SaveState.ERROR) {
      return (
        <>
          <Button variant="contained" color="error">
            Not Saved
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </>
      );
    }
  }

  return (
    <div className="mainContainer">
      <AlertDialog
        title="Error"
        message={`Your changes have not been saved! The username ${username} is taken`}
        openArr={[openTakenUsernameDialog, setOpenTakenUsernameDialog]}
      />
      <AlertDialog
        title="Error"
        message="Your changes have not been saved! The username cannot be 'admin'"
        openArr={[openIncorrectUsernameDialog, setOpenIncorrectUsernameDialog]}
      />
      <AlertDialog
        title="Error"
        message="Your changes have not been saved! The password you entered was incorrect."
        openArr={[openIncorrectPasswordDialog, setOpenIncorrectPasswordDialog]}
      />
      <DialogInput
        message="Please enter your password to confirm your changes"
        inputArr={[confirmDialogValue, setConfirmDialogValue]}
        openArr={[openConfirmDialog, setOpenConfirmDialog]}
        callbackFunc={validateInputPassword}
      />
      <Typography
        sx={{
          fontSize: 80,
          fontWeight: "bold",
          textAlign: "center",
          pt: 4,
          color: "text.primary",
        }}
      >
        Profile
      </Typography>
      <div className="avatarContainer">
        <Avatar
          alt={props.userAuth.username.toUpperCase()}
          {...stringAvatarBig(props.userAuth.username.toUpperCase())}
        />
      </div>
      <div className="formContainer">
        <Paper sx={{ p: 5, pt: 3, pb: 2, mt: 5 }} elevation={3}>
          <Box
            component="form"
            sx={{
              m: 1,
              minWidth: "40ch",
            }}
            autoComplete="on"
            onSubmit={validateForm}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "20pt" }}>
              Personal Information
            </Typography>
            <TextField
              type="username"
              id="username"
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ width: "100%", mt: 2 }}
              className="textField"
            />
            <TextField
              type="email"
              id="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ width: "100%", mt: 5 }}
              className="textField"
            />
            <div className="buttonContainer">{getSaveButton()}</div>
          </Box>
        </Paper>
      </div>
    </div>
  );
}
