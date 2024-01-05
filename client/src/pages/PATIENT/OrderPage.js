import React from "react";
import { Container, makeStyles, CssBaseline } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { Checkout } from "../../components/Checkout";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "75px",
    display: "grid",
    alignContent: "center",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "350px",
  },
  submit: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

export const OrderPage = observer(() => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <CssBaseline />
      <Checkout />
    </Container>
  );
});
