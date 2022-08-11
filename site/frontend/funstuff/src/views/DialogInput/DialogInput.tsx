import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface IDialogInput {
  title?: string;
  message: string;
  type?: string;
  label?: string;
  buttonTitle?: string;
  inputArr: [string, React.Dispatch<React.SetStateAction<string>>];
  openArr: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  callbackFunc?: (input: string) => any;
}

export default function DialogInput(props: IDialogInput) {
  const [open, setOpen] = props.openArr;
  const [input, setInput] = props.inputArr;


  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseWithInput = () => {
    setOpen(false);
    if (props.callbackFunc) {
        props.callbackFunc(input)
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.title?props.title:"Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.message}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="message"
            label={props.label?props.label:"Password"}
            type={props.type?props.type:"password"}
            fullWidth
            variant="standard"
            onChange={(e) => setInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCloseWithInput} sx={{color: 'inherit'}}>{props.buttonTitle?props.buttonTitle:"Confirm"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
