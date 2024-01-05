import { observer } from "mobx-react-lite";
import React, { useEffect, useContext } from "react";
import { Container, makeStyles, CssBaseline, Grid } from "@material-ui/core";
import ScheduleTable from "../../components/ScheduleTable";
import { getTicketsForSpecialist } from "../../http/ticketAPI";
import { Context } from "../../index";
import { SearchScheduleBar } from "../../components/SearchScheduleBar";

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

export const SchedulePage = observer(() => {
  const classes = useStyles();
  const { auth, entity } = useContext(Context);

  useEffect(() => {
    try {
      getTicketsForSpecialist(auth.specialist).then((data) => {
        entity.setTickets(data);
      });
    } catch (err) {
      console.error(err.message);
    }
  }, [entity]);

  return (
    <Container className={classes.container}>
      <CssBaseline />
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <SearchScheduleBar />
        </Grid>
        <Grid item xs={12} md={12}>
          <ScheduleTable />
        </Grid>
      </Grid>
    </Container>
  );
});
