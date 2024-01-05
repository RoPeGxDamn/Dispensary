import React, { useContext, useState } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import {
  TextField,
  Grid,
  Paper,
  Box,
  Button,
  makeStyles,
} from "@material-ui/core";
import {} from "@material-ui/styles";
import { KeyboardTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { filterTickets } from "../http/ticketAPI";

const useStyles = makeStyles((theme) => ({
  item: {
    padding: "10px 20px",
  },
}));

export const PatientSearchBar = observer(() => {
  const { auth, basket, entity } = useContext(Context);
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [selectedTime, setSelectedTime] = useState(Date.now());
  const [selectedName, setSelectedName] = useState("");

  const handleChangeDate = (date) => {
    setSelectedDate(date);
    basket.setSelectedDate(new Date(date).toLocaleDateString());
  };

  const handleChangeTime = (time) => {
    setSelectedTime(time);
    basket.setSelectedTime(new Date(time).toLocaleTimeString());
  };

  const search = async () => {
    const [surname, name, patronymic] = selectedName.split(" ")
    await filterTickets(
      new Date(selectedDate),
      new Date(selectedTime).toLocaleTimeString(),
      surname,
      name,
      patronymic,
      auth.patient
    ).then((data) => {
      entity.setTickets(data);
    });
  };

  return (
    <Box component={Paper}>
      <Grid container>
        <Grid item xs={12} md={12} className={classes.item}>
          <TextField
            fullWidth
            label="ФИО"
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} className={classes.item}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
              <KeyboardDatePicker
                disableToolbar
                style={{ minWidth: "100%" }}
                variant="inline"
                format="dd/MM/yyyy"
                label="Дата приема"
                value={selectedDate}
                onChange={handleChangeDate}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} md={12} className={classes.item}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
              <KeyboardTimePicker
                disableToolbar
                style={{ minWidth: "100%" }}
                variant="inline"
                label="Время приема"
                value={selectedTime}
                onChange={handleChangeTime}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} md={12} className={classes.item}>
          <Button
            color="primary"
            variant="contained"
            style={{ minWidth: "100%" }}
            onClick={search}
          >
            Поиск
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
});
