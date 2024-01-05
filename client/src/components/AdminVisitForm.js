import React, { useState, useContext, useEffect } from "react";
import {
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  makeStyles,
  Container,
  MenuItem,
  InputLabel,
  Select,
  Input,
  Box,
  Avatar,
} from "@material-ui/core";
import { Context } from "../index";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import {
  editDiagnosis,
  createDiagnosis,
  fetchDiagnoses,
} from "../http/diagnosisAPI";
import { observer } from "mobx-react-lite";
import { fetchSpecialists } from "../http/specialistAPI";
import { fetchPatients } from "../http/patientAPI";
import { createVisit, editVisit, fetchVisits } from "../http/visitAPI";
import { createTicket, editTicket } from "../http/ticketAPI";


const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formControl: {
    minWidth: "100%",
  },
  form: {
    width: "450px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default observer(function AdminVisitForm({ visit }) {
    console.log(visit)
  const { auth, entity, table, popup } = useContext(Context);
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(
    visit?.ticket?.visitDate || Date.now()
  );
  const [selectedTime, setSelectedTime] = useState(
    // visit?.ticket?.visitTime || 
    Date.now()
  );
  const [values, setValues] = useState({
    specialist: visit?.ticket?.specialist?.id || "",
    patient: visit?.ticket?.patient?.id || "",
    diagnosis: visit?.diagnosis?.id || "",
  });

  useEffect(() => {
    try {
      fetchDiagnoses().then((data) => {
        entity.setDiagnoses(data);
      });
      fetchSpecialists().then((data) => {
        entity.setSpecialists(data);
      });
      fetchPatients().then((data) => {
        entity.setPatients(data);
      });
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  const handleChangeDate = (date) => {
    setSelectedDate(date);
  };

  const handleChangeTime = (time) => {
    setSelectedTime(time);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const correctVisit = () => {
    try {
      editVisit(visit.id, values.diagnosis).then((data) => {
        editTicket(data.ticketId, selectedDate, selectedTime, values.patient, values.specialist).then(() => {
            fetchVisits().then(info => {
                entity.setVisits(info)
                popup.setEditVisitPopupOpen(false)
            })
        })
      });
      fetchDiagnoses().then((data) => {
        entity.setDiagnoses(data);
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const addVisit = () => {
    try {
      createTicket(
        selectedDate,
        new Date(selectedTime).toLocaleTimeString(),
        values.patient,
        values.specialist
      ).then((data) => {
        createVisit(data.id, values.diagnosis)
        .then(() => {
          fetchVisits().then((info) => {
            entity.setVisits(info);
            popup.setCreateVisitPopupOpen(false)
          });
        });
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form className={classes.form} noValidate>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                label="Дата приема"
                value={selectedDate}
                onChange={handleChangeDate}
                style={{ minWidth: "100%" }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} md={12}>
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
        <Grid item xs={12} md={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="disability-label">Специалист</InputLabel>
            <Select
              fullWidth
              labelId="disability-label"
              value={values.specialist}
              onChange={handleChange("specialist")}
            >
              {entity.specialists.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {`${item.surname} ${item.name[0]}. ${item.patronymic[0]}.`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="disability-label">Пациент</InputLabel>
            <Select
              fullWidth
              labelId="disability-label"
              value={values.patient}
              onChange={handleChange("patient")}
            >
              {entity.patients.map((item) => (
                <MenuItem
                  key={item.id}
                  value={item.id}
                >{`${item.surname} ${item.name[0]}. ${item.patronymic[0]}.`}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="disability-label">Диагноз</InputLabel>
            <Select
              fullWidth
              labelId="disability-label"
              value={values.diagnosis}
              onChange={handleChange("diagnosis")}
            >
              {entity.diagnoses.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          {visit !== undefined ? (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={correctVisit}
            >
              Редактировать
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={addVisit}
            >
              Добавить
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
});
