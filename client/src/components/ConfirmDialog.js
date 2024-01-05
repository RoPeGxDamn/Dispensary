import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Snackbar,
  Typography,
  Button,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { observer } from "mobx-react-lite";
import React from "react";

const useStyles = makeStyles((theme) => ({
  dialog: {
  },
  dialogContent: {
    textAlign: "center",
    padding: '10px'
  },
  dialogActions: {
    justifyContent: "center",
  },
}));

export default observer(function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();

  return (
    <Dialog className={classes.dialog} open={confirmDialog.isOpen}>
      <DialogTitle></DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subtitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          variant="outlined"
          color="primary"
          onClick={confirmDialog.onConfirm}
        >
          Да
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => {
            setConfirmDialog({ ...confirmDialog, isOpen: false });
          }}
        >
          Нет
        </Button>
      </DialogActions>
    </Dialog>
  );
});
