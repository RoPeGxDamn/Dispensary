import React, { useState, useContext, useEffect } from "react";
import { Typography, makeStyles, Grid } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { TimeGrid } from "./TimeGrid";
import { getOneSpecialist } from "../http/specialistAPI";
import { getOccupiedTickets } from "../http/ticketAPI";

const useStyles = makeStyles((theme) => ({
  item: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "15px",
      textAlign: "center",
    },
    fontVariant: "all-small-caps",
    letterSpacing: "1px",
  },
}));

export const DateTimeForm = observer(() => {
  const { ticket } = useContext(Context);
  const [selectedDate, setSelectedDate] = useState(
    ticket.visitDate || Date.now()
  );
  const classes = useStyles();
  const [specialistInfo, setSpecialistInfo] = useState({});
  const [total, setTotal] = useState(ticket.allTickets.length || 0);
  const [occupied, setOccupied] = useState(ticket.orderedTickets.length || 0);
  const [free, setFree] = useState(
    ticket.allTickets.length - ticket.orderedTickets.length || 0
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
    ticket.setVisitDate(new Date(date));
  };

  useEffect(() => {
    if (ticket.allTickets != [] || ticket.orderedTickets != []) {
      setTotal(ticket.allTickets.length);
      if (ticket.visitDate < Date.now()) {
        setOccupied(0);
        setFree(0);
      } else {
        setOccupied(ticket.orderedTickets.length);
        setFree(ticket.allTickets.length - ticket.orderedTickets.length);
      }
    }
  }, [ticket.allTickets, ticket.orderedTickets]);

  useEffect(async () => {
    if (!ticket.visitDate) {
      ticket.setVisitDate(Date.now());
    }
  }, []);

  useEffect(async () => {
    await getOneSpecialist(ticket.specialist).then((data) => {
      setSpecialistInfo(data);
    });
  }, []);

  useEffect(async () => {
    await getOccupiedTickets(new Date(selectedDate), ticket.specialist).then(
      (data) => {
        ticket.setOrderedTickets(data);
      }
    );
  }, [selectedDate]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          md={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Typography variant="h5" style={{ letterSpacing: "2px" }}>
            Режим работы:{" "}
            {specialistInfo.startTime + ":00" + "-" + specialistInfo.endTime + ":00"}
          </Typography>
        </Grid>
        <Grid item container xs={12} md={6}>
          <Grid item xs={12} md={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  id="datepicker"
                  style={{ minWidth: "100%" }}
                  label="Дата приема"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item container xs={12} md={12} spacing={1}>
            <Grid item xs={4} md={12}>
              <Typography className={classes.item}>Всего: {total}</Typography>
            </Grid>
            <Grid item xs={4} md={12}>
              <Typography className={classes.item}>
                Свободных: {free}{" "}
              </Typography>
            </Grid>
            <Grid item xs={4} md={12}>
              <Typography className={classes.item}>
                Занятых: {occupied}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <TimeGrid />
        </Grid>
      </Grid>
    </>
  );
});
