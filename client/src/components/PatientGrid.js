import React, { useContext, useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchPatients } from "../http/patientAPI";
import { PatientItem } from "./PatientItem";
import { SearchPatientsBar } from "./SearchPatientsBar";

const useStyles = makeStyles((theme) => ({
  grid: {
    overflowY: "scroll",
    height: "520px",
  },
}));

export const PatientGrid = observer(() => {
  const classes = useStyles();
  const { entity } = useContext(Context);

  useEffect(() => {
    fetchPatients().then((data) => {
      entity.setPatients(data);
    });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <SearchPatientsBar />
      </Grid>
      <Grid item container spacing={2} className={classes.grid}>
        {entity.patients.map((item) => (
          <Grid item key={item.id}>
            <PatientItem patient={item} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
});
