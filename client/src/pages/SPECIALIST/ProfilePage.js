import React, { useContext, useEffect, useState } from "react";
import { Container, makeStyles, CssBaseline } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { SpecialistProfileForm } from "../../components/SpecialistProfileForm";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "100px",
    [theme.breakpoints.between("xs", "sm")]: {
      maxHeight: "600px",
      overflowY: "scroll",
      maxWidth: "400px",
    },
  },
  submit: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  title: {
    textAlign: "center",
  },
}));

export const SpecialistProfilePage = observer(() => {
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth="md">
      <CssBaseline />
      <SpecialistProfileForm />
    </Container>
  );
});
