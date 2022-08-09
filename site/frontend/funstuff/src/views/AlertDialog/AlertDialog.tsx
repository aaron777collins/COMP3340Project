import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface IAlertDialog {
  title?: string;
  message: string;
  buttonTitle?: string;
  openArr: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export default function AlertDialog(props: IAlertDialog) {
  const [open, setOpen] = props.openArr;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.title?props.title:"Alert"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{props.buttonTitle?props.buttonTitle:"Okay"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
