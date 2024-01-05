import React, { useContext, useEffect, useState } from "react";
import { Container, makeStyles, CssBaseline } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { OutpatientCard } from "../../components/OutpatientCard";
import { getOnePatient } from "../../http/patientAPI";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "100px",
    display: "grid",
    alignContent: "center",
    justifyContent: "center",
  },
  submit: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

export const CardPage = observer(() => {
  const classes = useStyles();
  const { auth } = useContext(Context);
  const [patientInfo, setPatientInfo] = useState({});

  useEffect(async () => {
    try {
      await getOnePatient(auth.patient).then((data) => {
        setPatientInfo(data);
      });
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  return (
    <Container className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <OutpatientCard patient={patientInfo} />
      </div>
    </Container>
  );
});
