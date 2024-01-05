import { observer } from "mobx-react-lite";
import React, { useEffect, useContext } from "react";
import { Container, makeStyles, CssBaseline, Grid } from "@material-ui/core";
import PatientsTable from "../../components/PatientsTable";
import { SearchPatientsBar } from "../../components/SearchPatientsBar";
import { fetchPatients } from "../../http/patientAPI";
import { Context } from "../../index";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "100px",
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

export const PatientsPage = observer(() => {
  const classes = useStyles();
  const { entity } = useContext(Context);

  useEffect(async () => {
    try {
      await fetchPatients().then((data) => {
        entity.setPatients(data);
      });
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  return (
    <Container className={classes.container}>
      <CssBaseline />
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <SearchPatientsBar/>
        </Grid>
        <Grid item xs={12} md={12}>
          <PatientsTable />
        </Grid>
      </Grid>
    </Container>
  );
});
