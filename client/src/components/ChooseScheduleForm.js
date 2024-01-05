import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  IconButton,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { setSchedule } from "../http/specialistAPI";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
  },
  form: {
    width: "600px",
    marginBottom: "5px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default observer(function ChooseScheduleForm() {
  const { schedule, popup, entity, auth } = useContext(Context);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [durance, setDurance] = useState(null);
  const classes = useStyles();

  const setTime = () => {
    try {
      setSchedule(auth.specialist, +start, +end, +durance).then(() => {
          popup.setChooseSchedulePopupOpen(false)
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form className={classes.form} noValidate>
      <Grid container xs={12} md={12} spacing={2} style={{ minWidth: "500px" }}>
        <Grid item xs={12} md={4}>
          <TextField
            value={start}
            onChange={(e) => {
              setStart(e.target.value);
            }}
            label="Начало рабочего дня"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            value={end}
            onChange={(e) => {
              setEnd(e.target.value);
            }}
            label="Конец рабочего дня"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            value={durance}
            onChange={(e) => {
              setDurance(e.target.value);
            }}
            label="Среднее время приема"
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Button fullWidth variant="contained" color="primary" onClick={setTime}>
            Установить
          </Button>
        </Grid>
      </Grid>
    </form>
  );
});
