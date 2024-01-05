import { Box, Snackbar, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

export default function Notification(props) {
  const { notify, setNotify } = props;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert severity={notify.type} style={{textAlign: 'center'}}>
            {notify.message}
      </Alert>
    </Snackbar>
  );
}
