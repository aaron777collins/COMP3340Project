import { Avatar, Box, Button, Paper, TextField, Typography } from "@mui/material";
import * as React from "react";
import "./Profile.css";
import { stringAvatarBig } from "../../Helpers/ProfileHelper";
import { getLogger } from "../../LogConfig";
import { useState } from "react";

const log = getLogger("view.profile");

export interface IProfileProps {}

export default function Profile(props: IProfileProps) {

    const [username, setUsername] = useState("admin");
    const [email, setEmail] = useState("colli11s@uwindsor.ca");

    function validateForm(e: any) {
        e.preventDefault();
        log.debug(username);
        log.debug(email);
    }

  return (
    <div className="mainContainer">
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
        <Avatar alt="Aaron Collins" {...stringAvatarBig("Aaron Collins")} />
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
              id="outlined-basic"
              label="Username"
              variant="outlined"
              defaultValue={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ width: "100%", mt: 2 }}
              className="textField"
            />
            <TextField
              type="email"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ width: "100%", mt: 5 }}
              className="textField"
            />
            <div className="buttonContainer">
            <Button type="submit" variant="contained">Submit</Button>
            </div>
          </Box>
        </Paper>
      </div>
    </div>
  );
}

