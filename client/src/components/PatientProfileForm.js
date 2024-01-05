import React, { useContext, useEffect, useState } from "react";
import {useHistory} from "react-router-dom"
import {
  Container,
  Button,
  makeStyles,
  CssBaseline,
  Grid,
  Typography,
  Avatar,
  Box,
  Paper,
} from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { deleteUser, getOneUser } from "../http/userAPI";
import { getOnePatient } from "../http/patientAPI";
import Popup from "./Popup";
import PatientEditForm from "./PatientEditForm";
import ConfirmDialog from "./ConfirmDialog";
import Notification from "./Notification";
import { SIGNIN_ROUTE } from "../utils/const";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   [theme.breakpoints.between("xs", "sm")]: {
  //     maxHeight: "600px",
  //     overflowY: "scroll",
  //     maxWidth: "400px",
  //   },
  // },
  title: {
    textAlign: "center",
  },
  attribute: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    color: "#818c99",
  },
}));

export const PatientProfileForm = observer(({ patient }) => {
  const history = useHistory()
  const classes = useStyles();
  const { auth, profile, popup } = useContext(Context);
  const [userInfo, setUserInfo] = useState(patient?.user || {});
  const [patientInfo, setPatientInfo] = useState(patient || {});
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
  });

  useEffect(() => {
    if (!patient) {
      getOneUser(auth.user.id).then((data) => {
        setUserInfo(data);
      });
      getOnePatient(auth.patient).then((data) => {
        setPatientInfo(data);
      });
    }
  }, []);

  const logout = () => {
    auth.setIsAuthenticated(false);
    auth.setUser({});
    auth.setPatient(null);
    auth.setSpecialist(null);
    localStorage.clear();
    history.push(SIGNIN_ROUTE);
  };

  const deleteProfile = () => {
    try {
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false
      })
      deleteUser(patient?.userId || auth?.user?.id).then(() => {
        setNotify({
          isOpen: true,
          message: 'Аккаунт успешно удален',
          type: 'success'
        })
        if(auth.user.role === "PATIENT") {
          logout()
        }
      })
      
    } catch (err) {
      setNotify({
        isOpen: true,
        message: err.message,
        type: 'error'
      })
    }
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item container xs={12} md={12} spacing={4}>
          <Grid item container xs={12} md={5}>
            <Grid
              container
              item
              xs={12}
              md={12}
              component={Paper}
              style={{ padding: "20px" }}
            >
              <Grid item xs={12} md={12}>
                <Box
                  style={{
                    backgroundImage: `url(${
                      process.env.REACT_APP_API_URL + patientInfo.photo
                    })`,
                    backgroundSize: "cover",
                    width: "100%",
                    height: "300px",
                    borderRadius: "5px",
                    marginBottom: "10px",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Button
                  fullWidth
                  style={{ marginBottom: "5px" }}
                  variant="outlined"
                  color="primary"
                  onClick={() => popup.setEditPatientProfilePopupOpen(true)}
                >
                  Редактировать
                </Button>
              </Grid>
              <Grid item xs={12} md={12}>
                <Button fullWidth variant="outlined" color="primary" onClick={() => {
                  setConfirmDialog({
                    isOpen: true,
                    title: 'Вы действительно хотите удалить аккаунт?',
                    subtitle: 'Данное действие будет необратимо',
                    onConfirm: () => {
                      deleteProfile()
                    }
                  })
                }}>
                  Удалить
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12} md={7}>
            <Grid
              item
              container
              xs={12}
              md={12}
              component={Paper}
              style={{ padding: "25px" }}
            >
              <Grid item xs={12} md={12}>
                <Typography variant="h5">
                  {`${patientInfo?.surname}  ${patientInfo?.name}
                  ${patientInfo?.patronymic}`}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} className={classes.attribute}>
                <Typography className={classes.name}>Дата рождения:</Typography>
                <Typography>
                  {new Date(patientInfo?.dateOfBirth).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} className={classes.attribute}>
                <Typography className={classes.name}>
                  Электронная почта:
                </Typography>
                <Typography>{userInfo?.email}</Typography>
              </Grid>
              <Grid item xs={12} md={12} className={classes.attribute}>
                <Typography className={classes.name}> Пол:</Typography>
                <Typography> {patientInfo?.gender}</Typography>
              </Grid>
              <Grid item xs={12} md={12} className={classes.attribute}>
                <Typography className={classes.name}>Адрес:</Typography>
                <Typography>{patientInfo?.address}</Typography>
              </Grid>
              <Grid item xs={12} md={12} className={classes.attribute}>
                <Typography className={classes.name}>Место работы:</Typography>
                <Typography>{patientInfo?.placeOfWork}</Typography>
              </Grid>
              <Grid item xs={12} md={12} className={classes.attribute}>
                <Typography className={classes.name}>Должность:</Typography>
                <Typography>{patientInfo?.position}</Typography>
              </Grid>
              <Grid item xs={12} md={12} className={classes.attribute}>
                <Typography className={classes.name}>
                  Номер телефона:
                </Typography>
                <Typography>{patientInfo?.phoneNumber}</Typography>
              </Grid>
              <Grid item xs={12} md={12} className={classes.attribute}>
                <Typography className={classes.name}>Инвалидность:</Typography>
                <Typography>{patientInfo?.disability}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12} md={12} spacing={5}>
          <Grid item xs={12} md={6} className={classes?.title} component={Paper}>
            <Typography variant="h4">{patientInfo?.countOfTickets}</Typography>
            <Typography variant="subtitle1">
              Количество взятых талонов
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} className={classes.title} component={Paper}>
            <Typography variant="h4">
              {new Date(userInfo?.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="subtitle1">
              Дата регистрации аккаунта
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Popup
        openPopup={popup.editPatientProfilePopupOpen}
        setOpenPopup={() => {
          popup.setEditPatientProfilePopupOpen(false);
        }}
        title="Редактирование профиля"
      >
        <PatientEditForm patient={patientInfo} />
      </Popup>
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}/>
      <Notification notify={notify} setNotify={setNotify}/>
    </>
  );
});
