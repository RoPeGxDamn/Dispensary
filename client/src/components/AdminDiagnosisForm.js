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

export default observer(function AdminDiagnosisForm({ diagnosis }) {
  const { auth, entity, table, popup } = useContext(Context);
  const classes = useStyles();
  const [values, setValues] = useState({
    name: diagnosis?.name || "",
    cipher: diagnosis?.cipher || "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const correctDiagnosis = () => {
    try {
      editDiagnosis(diagnosis.id, values.name, values.cipher).then(() => {
        popup.setEditDiagnosisPopupOpen(false);
      });
      fetchDiagnoses().then((data) => {
        entity.setDiagnoses(data);
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const addDiagnosis = () => {
    try {
      createDiagnosis(values.name, values.cipher).then(() => {
        popup.setCreateDiagnosisPopupOpen(false);
      });
      fetchDiagnoses().then((data) => {
        entity.setDiagnoses(data);
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
            label="Наименование"
            value={values.name}
            onChange={handleChange("name")}
            autoFocus
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            label="Шифр"
            value={values.cipher}
            onChange={handleChange("cipher")}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          {diagnosis !== undefined ? (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={correctDiagnosis}
            >
              Редактировать
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={addDiagnosis}
            >
              Добавить
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
});
