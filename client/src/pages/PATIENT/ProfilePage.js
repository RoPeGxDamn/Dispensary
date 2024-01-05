import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Button,
  makeStyles,
  CssBaseline,
  Grid,
  Typography,
  Avatar,
} from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { getOneUser } from "../../http/userAPI";
import { getOnePatient } from "../../http/patientAPI";
import Popup from "../../components/Popup";
import { PatientProfileForm } from "../../components/PatientProfileForm";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "100px",
    [theme.breakpoints.between("xs", "sm")]: {
      maxHeight: "600px",
      overflowY: "scroll",
      maxWidth: "400px",
    },
  },
}));

export const PatientProfilePage = observer(() => {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="md">
      <CssBaseline />
      <PatientProfileForm />
    </Container>
  );
});
