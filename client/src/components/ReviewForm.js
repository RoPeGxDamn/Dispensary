import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../index";
import { createFeedback } from "../http/feedbackAPI";
import { observer } from "mobx-react-lite";
import Notification from "./Notification";

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

export default observer(function ReviewForm({ specialist }) {
  const { auth, entity, table, popup } = useContext(Context);
  const classes = useStyles();
  const [state, setState] = useState(false);
  const [value, setValue] = useState(2);
  const [values, setValues] = useState({
    title: "",
    body: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChangeCheck = () => {
    setState(!state);
  };

  const sendReview = () => {
    try {
      createFeedback(
        values.title,
        values.body,
        value,
        auth.patient,
        specialist.id,
        state
      ).then(() => {
        setNotify({
          isOpen: true,
          message: "Отзыв успешно оставлен",
          type: "success",
        });
        setState(false);
        setValue(2);
        setValues({
          title: "",
          body: "",
        });
      });
    } catch (err) {
      setNotify({
        isOpen: true,
        message: err.message,
        type: "error",
      });
    }
  };

  return (
    <>
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
              rows={6}
              variant="filled"
              label="Отзыв"
              value={values.body}
              onChange={handleChange("body")}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Box
              borderColor="transparent"
              style={{
                display: "flex",
                justifyContent: "space-between",
                minWidth: "100%",
              }}
            >
              <Typography>Оценка</Typography>
              <Rating
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state}
                  onChange={handleChangeCheck}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Я согласен(-на) на обработку персональных данных"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={sendReview}
            >
              Отправить
            </Button>
          </Grid>
        </Grid>
      </form>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
});
