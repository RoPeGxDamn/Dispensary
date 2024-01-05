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
import { filterTickets } from "../http/ticketAPI";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import { fetchPatients, filterPatients } from "../http/patientAPI";

const useStyles = makeStyles((theme) => ({
  item: {
    padding: "10px",
  },
}));

export const SearchPatientsBar = observer(() => {
  const { auth, basket, entity } = useContext(Context);
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");

  const handleChangeDate = (date) => {
    setSelectedDate(date);
    basket.setSelectedDate(new Date(date).toLocaleDateString());
  };

  const search = () => {
    try {
      const [surname, name, patronymic] = fullName.split(" ");
      if (
        new Date(selectedDate).getFullYear() ==
          new Date(Date.now()).getFullYear() &&
        new Date(selectedDate).getDay() == new Date(Date.now()).getDay()
      ) {
        filterPatients(surname, name, patronymic, address, "").then((data) => {
          entity.setPatients(data);
        });
      } else {
        filterPatients(surname, name, patronymic, address, selectedDate).then(
          (data) => {
            entity.setPatients(data);
          }
        );
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const clear = () => {
    try {
      setAddress("");
      setSelectedDate(Date.now());
      setFullName("");
      fetchPatients().then((data) => {
        entity.setPatients(data);
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
              label="Дата рождения"
              value={selectedDate}
              onChange={handleChangeDate}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={12} md={3} className={classes.item}>
        <TextField
          fullWidth
          label="Адрес"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
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
