import React, { useContext, useEffect } from "react";
import {
  Container,
  Grid,
  makeStyles,
  CssBaseline,
  Box,
  Paper,
} from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { TicketList } from "../../components/TicketList";
import { PatientSearchBar } from "../../components/PatientSearchBar";
import { PatientBasketBar } from "../../components/PatientBasketBar";
import { getActiveOrInactiveTickets, getTicketsForPatient } from "../../http/ticketAPI";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.between("xs", "sm")]: {
      maxWidth: "500px",
    },
    marginTop: "100px",
  },
  submit: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  wrapper: {
    padding: "1px 10px",
    maxHeight: 600,
    overflowY: "scroll",
  },
}));

export const TicketPage = observer(() => {
  const classes = useStyles();
  const { auth, entity, basket } = useContext(Context);

  useEffect(async () => {
    switch (basket.selectedType) {
      case "Активные":
        await getActiveOrInactiveTickets(auth.patient, 'Активный').then((data) => {
          entity.setTickets(data)
        })
        break;
      case "Неактивные":
        await getActiveOrInactiveTickets(auth.patient, 'Неактивный').then((data) => {
          entity.setTickets(data)
        })
        break;
      default:
        await getTicketsForPatient(auth.patient).then((data) =>
          entity.setTickets(data)
        );
        break;
    }
  }, [basket.selectedType]);

  return (
    <Container className={classes.container}>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <PatientBasketBar />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box component={Paper} className={classes.wrapper}>
            <TicketList tickets={entity.tickets} />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <PatientSearchBar />
        </Grid>
      </Grid>
    </Container>
  );
});
