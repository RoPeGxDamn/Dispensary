import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../index";
import {
  editDiagnosis,
  createDiagnosis,
  fetchDiagnoses,
} from "../http/diagnosisAPI";
import { observer } from "mobx-react-lite";
import {
  createAnnouncement,
  editAnnouncement,
  fetchAnnouncements,
} from "../http/announcementAPI";

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

export default observer(function AdminAnnouncementForm({ announcement }) {
  const { auth, entity, table, popup } = useContext(Context);
  const classes = useStyles();
  const [values, setValues] = useState({
    title: announcement?.title || "",
    message: announcement?.message || "",
    reader: announcement?.reader || "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const correctAnnouncement = () => {
    try {
      editAnnouncement(
        announcement.id,
        values.title,
        values.message,
        values.reader
      ).then(() => {
        popup.setEditAnnouncementPopupOpen(false);
      });
      fetchAnnouncements().then((data) => {
        entity.setAnnouncements(data);
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const addAnnouncement = () => {
    try {
      createAnnouncement(values.title, values.message, values.reader).then(
        () => {
          popup.setCreateAnnouncementPopupOpen(false);
        }
      );
      fetchAnnouncements().then((data) => {
        entity.setAnnouncements(data);
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form className={classes.form} noValidate>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            label="Заголовок"
            value={values.title}
            onChange={handleChange("title")}
            autoFocus
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            multiline
            variant="filled"
            rows={6}
            label="Сообщение"
            value={values.message}
            onChange={handleChange("message")}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="disability-label">Получатель</InputLabel>
            <Select
              fullWidth
              labelId="disability-label"
              value={values.reader}
              onChange={handleChange("reader")}
            >
              {entity.roles.map((item) => (
                <MenuItem key={item.id} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          {announcement !== undefined ? (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={correctAnnouncement}
            >
              Редактировать
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={addAnnouncement}
            >
              Добавить
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
});
