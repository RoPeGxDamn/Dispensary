import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Grid,
  TextField,
  FormControl,
  FormLabel,
  Radio,
  FormControlLabel,
  RadioGroup,
  Box,
  InputLabel,
  Select,
  MenuItem,
  Input,
} from "@material-ui/core";
import { Context } from "../index";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { observer } from "mobx-react-lite";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "35%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  formControl: {
    minWidth: "100%",
  },
}));

export default observer(function PatientAccordion({ user, patient }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const { auth, profile, entity } = useContext(Context);
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [values, setValues] = useState({
    surname: "",
    name: "",
    patronymic: "",
    gender: "",
    address: "",
    phoneNumber: "",
    employment: "",
    disability: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });

  useEffect(() => {
    if (user != null && patient != null) {
      setValues({
        surname: patient.surname || "",
        name: patient.name || "",
        patronymic: patient.patronymic || "",
        gender: patient.gender || "",
        address: patient.address || "",
        phoneNumber: patient.phoneNumber || "",
        placeOfWork: patient.placeOfWork || "",
        position: patient.position || "",
        disability: patient.disability || "",
        email: user.email || "",
        oldPassword: "",
        newPassword: "",
        repeatNewPassword: "",
      });
      setSelectedDate(patient.dateOfBirth);
    }
  }, [user, patient]);

  useEffect(() => {
    const formData = new FormData();
    formData.append("surname", values.surname);
    formData.append("name", values.name);
    formData.append("patronymic", values.patronymic);
    formData.append("dateOfBirth", selectedDate);
    formData.append("gender", values.gender);
    formData.append("address", values.address);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("placeOfWork", values.placeOfWork);
    formData.append("position", values.position);
    formData.append("disability", values.disability);
    formData.append("email", values.email);
    formData.append("oldPassword", values.oldPassword);
    formData.append("newPassword", values.newPassword);
    formData.append("repeatNewPassword", values.repeatNewPassword);
    formData.append("patientId", patient.id || auth.patient);
    formData.append("photo", profile.photoForDB)
    formData.append("userId", user.id || auth.user.id);
    profile.setFormData(formData);
  }, [values, profile, profile.photoForDB]);

  const handleChangePanel = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChangeDate = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChangePanel("panel1")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Основная информация
          </Typography>
          <Typography className={classes.secondaryHeading}>
            ФИО, дата рождения, пол
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Фамилия"
                value={values.surname}
                onChange={handleChange("surname")}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Имя"
                value={values.name}
                onChange={handleChange("name")}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Отчество"
                value={values.patronymic}
                onChange={handleChange("patronymic")}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    style={{ minWidth: "100%" }}
                    format="dd/MM/yyyy"
                    label="Дата рождения"
                    value={selectedDate}
                    onChange={handleChangeDate}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} md={8}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Пол</FormLabel>
                <RadioGroup
                  value={values.gender}
                  onChange={handleChange("gender")}
                >
                  <Box style={{ display: "flex" }}>
                    {entity.gender.map((item) => (
                      <FormControlLabel
                        key={item.id}
                        value={item.name}
                        control={<Radio />}
                        label={item.name}
                      />
                    ))}
                  </Box>
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChangePanel("panel2")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Дополнительная информация
          </Typography>
          <Typography className={classes.secondaryHeading}>
            Адрес, телефон, место работы, должность, инвалидность
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Адрес"
                value={values.address}
                onChange={handleChange("address")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Телефон"
                value={values.phoneNumber}
                onChange={handleChange("phoneNumber")}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="disability-label">Инвалидность</InputLabel>
                <Select
                  fullWidth
                  labelId="disability-label"
                  value={values.disability}
                  onChange={handleChange("disability")}
                >
                  {entity.disabilityGroups.map((item) => (
                    <MenuItem key={item.id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Место работы"
                value={values.placeOfWork}
                onChange={handleChange("placeOfWork")}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Должность"
                value={values.position}
                onChange={handleChange("position")}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChangePanel("panel3")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Электронная почта</Typography>
          <Typography className={classes.secondaryHeading}>
            Обновление электронной почты
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            fullWidth
            label="Электронная почта"
            value={values.email}
            onChange={handleChange("email")}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChangePanel("panel4")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Пароль</Typography>
          <Typography className={classes.secondaryHeading}>
            Смена пароля
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Старый пароль"
                value={values.oldPassword}
                type="password"
                onChange={handleChange("oldPassword")}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Новый пароль"
                type="password"
                value={values.newPassword}
                onChange={handleChange("newPassword")}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                type="password"
                label="Повторите новый пароль"
                value={values.repeatNewPassword}
                onChange={handleChange("repeatNewPassword")}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChangePanel("panel5")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Фотография</Typography>
          <Typography className={classes.secondaryHeading}>
            Обновление фотографии
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Input label="Фото" fullWidth type="file" onChange={imageHandler} />
          </Grid>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
});
