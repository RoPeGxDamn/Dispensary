import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Button,
  makeStyles,
  CssBaseline,
  Grid,
  Typography,
  Box,
} from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { getOneSpecialist } from "../../http/specialistAPI";
import { SCHEDULE_ROUTE, SPECIALIST_PATIENTS_ROUTE } from "../../utils/const";
import { AnnouncementGrid } from "../../components/AnnouncementGrid";
import ChooseScheduleForm from "../../components/ChooseScheduleForm";
import Popup from "../../components/Popup";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    [theme.breakpoints.down("sm")]: {
      overflowY: 'scroll'
    },
  },
  announcements: {
    maxHeight: '470px',
    overflowY: 'scroll'
  },
  container: {
    [theme.breakpoints.only("sm")]: {
      maxWidth: "500px",
    },
    [theme.breakpoints.only("xs")]: {
      maxWidth: "320px",
    },
  },
  title: {
    color: "white",
    letterSpacing: "1px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "50px",
    },
  },
  subtitle: {
    color: "white",
    letterSpacing: "1px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "35px",
    },
  },
  buttonGroup: {
    marginTop: "40px",
    maxWidth: "405px",
    [theme.breakpoints.down("sm")]: {},
  },
  button: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: '10px'
    }
}
}));

export const FirstPage = observer(() => {
  const classes = useStyles();
  const { auth, popup } = useContext(Context);
  const history = useHistory();
  const [specialistInfo, setSpecialistInfo] = useState({});
  const [open, setOpen] = useState(false)

  useEffect(() => {
    getOneSpecialist(auth.specialist).then((data) => {
      setSpecialistInfo(data);
      if(!data?.interval) {
        setOpen(true)
      }
    });
  }, []);

  return (
    <>
    <Box
    className={classes.root}
      style={{
        backgroundImage: `linear-gradient(
        rgba(0, 0, 0, 0.4), 
        rgba(0, 0, 0, 0.4)
      ), url(${process.env.REACT_APP_API_URL}specialist-background.jpeg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Container className={classes.container}>
        <CssBaseline />
        <Grid container style={{ paddingTop: "150px" }}>
          <Grid container item xs={12} md={9} >
            <Grid item xs={12} md={12}>
              <Typography variant="h1" className={classes.title}>
                Добро пожаловать, {specialistInfo?.name + " " + specialistInfo?.patronymic}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h2" className={classes.subtitle}>
                Вас приветствует кожно-венерологический диспансер
              </Typography>
            </Grid>
            <Grid
              item
              container
              xs={12}
              md={12}
              style={{ marginTop: "40px", maxWidth: "515px" }}
            >
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => history.push(SPECIALIST_PATIENTS_ROUTE)}
                  className={classes.button}
                >
                  Посмотреть пациентов
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => history.push(SCHEDULE_ROUTE)}
                >
                  Посмотреть расписание
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={3} style={{height: '470px', overflowY: 'scroll'}}>
            <AnnouncementGrid type={"SPECIALIST"}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
    <Popup
        openPopup={open}
        setOpenPopup={() => {
          setOpen(false);
        }}
        title="Режим работы"
      >
        <ChooseScheduleForm/>
      </Popup>
    </>
  );
});
