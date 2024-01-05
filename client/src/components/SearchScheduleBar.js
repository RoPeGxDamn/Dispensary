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
  IconButton,
  Tooltip,
} from "@material-ui/core";
import {} from "@material-ui/styles";
import { KeyboardTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  filterSchedule,
  filterTickets,
  getTicketsForSpecialist,
} from "../http/ticketAPI";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  item: {
    padding: "10px",
  },
}));

export const SearchScheduleBar = observer(() => {
  const { auth, basket, entity } = useContext(Context);
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [selectedTime, setSelectedTime] = useState(Date.now());
  const [fullName, setFullName] = useState("");

  const handleChangeDate = (date) => {
    setSelectedDate(date);
    basket.setSelectedDate(new Date(date).toLocaleDateString());
  };

  const handleChangeTime = (time) => {
    setSelectedTime(time);
    basket.setSelectedTime(new Date(time).toLocaleTimeString());
  };

  const search = () => {
    try {
      const [surname, name, patronymic] = fullName.split(" ");
      filterSchedule(
        auth.specialist,
        surname,
        name,
        patronymic,
        selectedDate,
        new Date(selectedTime).toLocaleTimeString()
      ).then((data) => {
        entity.setTickets(data);
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const clear = () => {
    try {
      setSelectedDate(Date.now());
      setSelectedTime(Date.now());
      setFullName("");
      getTicketsForSpecialist().then((data) => {
        entity.setTickets(data);
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} md={4} className={classes.item}>
        <TextField
          fullWidth
          label="Пациент"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={4} className={classes.item}>
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
      <Grid item xs={12} md={3} className={classes.item}>
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
      <Grid
        item
        xs={12}
        md={1}
        className={classes.item}
        style={{ display: "flex" }}
      >
        <Tooltip title="Поиск">
          <IconButton onClick={search}>
            <SearchIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Очистить">
          <IconButton onClick={clear}>
            <ClearIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
});
