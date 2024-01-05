import React, { useState, useContext, useEffect } from "react";
import { makeStyles, Typography, Grid } from "@material-ui/core";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { getOnePatient } from "../http/patientAPI";
import { getOneSpecialist } from "../http/specialistAPI";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1, 10),
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export const Review = observer(() => {
  const classes = useStyles();
  const { ticket, auth } = useContext(Context);
  const [patientInfo, setPatientInfo] = useState({});
  const [specialistInfo, setSpecialistInfo] = useState({});

  useEffect(async () => {
    try {
      await getOnePatient(auth.patient).then((data) => {
        setPatientInfo(data);
      });
      await getOneSpecialist(ticket.specialist).then((data) => {
        setSpecialistInfo(data);
      });
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  return (
    <div>
      <Grid container spacing={1} className={classes.container}>
        <Grid item xs={12} sm={12}>
          <Typography gutterBottom>
            Заказчик:{" "}
            {patientInfo.surname +
              " " +
              patientInfo.name +
              " " +
              patientInfo.patronymic}
          </Typography>
          <Typography gutterBottom>
            Специалист:{" "}
            {specialistInfo.surname +
              " " +
              specialistInfo.name +
              " " +
              specialistInfo.patronymic}
          </Typography>
          <Typography gutterBottom>
            Дата приема: {new Date(ticket.visitDate).toLocaleDateString()}
          </Typography>
          <Typography gutterBottom>Время приема: {ticket.visitTime}</Typography>
        </Grid>
      </Grid>
    </div>
  );
});
