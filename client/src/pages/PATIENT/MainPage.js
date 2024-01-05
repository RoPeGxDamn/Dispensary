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
import { getOnePatient } from "../../http/patientAPI";
import { CARD_ROUTE, ORDER_ROUTE } from "../../utils/const";
import { AnnouncementGrid } from "../../components/AnnouncementGrid";

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
    },
  
  }
}));

export const MainPage = observer(() => {
  const classes = useStyles();
  const { auth } = useContext(Context);
  const history = useHistory();
  const [patientInfo, setPatientInfo] = useState({});

  useEffect(async () => {
    await getOnePatient(auth.patient).then((data) => {
      setPatientInfo(data);
    });
  }, []);

  return (
    <Box
      className={classes.root}
      style={{
        backgroundImage: `linear-gradient(
        rgba(0, 0, 0, 0.4), 
        rgba(0, 0, 0, 0.4)
      ), url(${process.env.REACT_APP_API_URL}patient-background.jpg)`,
        backgroundSize: "cover",
      }}
    >
      <CssBaseline />
      <Container className={classes.container}>
        <Grid container style={{paddingTop: '120px'}}>
          <Grid container item xs={12} md={9} >
            <Grid item xs={12} md={12}>
              <Typography variant="h1" className={classes.title}>
                Добро пожаловать, {patientInfo.name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h2" className={classes.subtitle}>
                Вас приветствует кожно-венерологический диспансер
              </Typography>
            </Grid>
            <Grid item container xs={12} md={12} className={classes.buttonGroup}>
              <Grid item xs={12} md={6}>
                <Button
                className={classes.button}
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => history.push(ORDER_ROUTE)}
                >
                  Заказать талон
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => history.push(CARD_ROUTE)}
                >
                  Посмотреть карту
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={3} className={classes.announcements}>
            <AnnouncementGrid type={"PATIENT"} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
});
