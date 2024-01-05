import React, { useState, useContext } from "react";
import {
  makeStyles,
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { DateTimeForm } from "./DateTimeForm";
import { SpecialistForm } from "./SpecialistForm";
import { Review } from "./Review";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { createTicket } from "../http/ticketAPI";
import { PATIENT_ROUTE } from "../utils/const";
import Notification from "./Notification";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: "180px",
    },
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 300,
  },
}));

const steps = ["Выберите специалиста", "Укажите дату и время", "Обзор талона"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <SpecialistForm />;
    case 1:
      return <DateTimeForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export const Checkout = observer(() => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const { ticket, auth } = useContext(Context);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const history = useHistory();

  const handleNext = () => {
    try {
      if (activeStep === 0) {
        if (!ticket.specialist) {
          setNotify({
            isOpen: true,
            message: "Выберите специалиста, чтобы перейти к следующему шагу",
            type: "info",
          });
          return;
        }
      }
      if (activeStep === 1) {
        if (!ticket.visitDate || !ticket.visitTime) {
          setNotify({
            isOpen: true,
            message: "Выберите дату и время, чтобы перейти к следующему шагу",
            type: "info",
          });
          return;
        }
      }
      if (activeStep === steps.length - 1) {
        createTicket(
          ticket.visitDate,
          ticket.visitTime,
          auth.patient,
          ticket.specialist
        ).then(() => {
          setNotify({
            isOpen: true,
            message: "Ваш заказ успешно выполнен",
            type: "success",
          });
        });
        setTimeout(() => {
          ticket.setSpecialist(null);
          ticket.setSpecialty(null);
          ticket.setVisitDate(null);
          ticket.setVisitTime(null);
          history.push(PATIENT_ROUTE);
        }, 2000);
      } else {
        setActiveStep(activeStep + 1);
      }
    } catch (err) {}
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Заказ талона
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {getStepContent(activeStep)}
            <div className={classes.buttons}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} className={classes.button}>
                  Назад
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1
                  ? "Осуществить заказ"
                  : "Следующий шаг"}
              </Button>
            </div>
          </>
        </Paper>
      </main>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
});
