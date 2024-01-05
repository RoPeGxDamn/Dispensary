import React, { useContext, useEffect, useState } from "react";
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
import { getOneSpecialist } from "../http/specialistAPI";
import Popup from "./Popup";
import SpecialistEditForm from "./SpecialistEditForm";
import { getFeedbackOfSpecialist } from "../http/feedbackAPI";
import ReviewList from "./ReviewList";
import Notification from "./Notification";
import ConfirmDialog from "./ConfirmDialog";
import { useHistory } from "react-router";
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

export const SpecialistProfileForm = observer(({ specialist }) => {
  const classes = useStyles();
  const history = useHistory()
  const { auth, profile, entity, popup } = useContext(Context);
  const [userInfo, setUserInfo] = useState(specialist?.user || {});
  const [specialistInfo, setSpecialistInfo] = useState(specialist || {});
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
    if (!specialist) {
      getOneUser(auth.user.id).then((data) => {
        setUserInfo(data);
      });
      getOneSpecialist(auth.specialist).then((data) => {
        setSpecialistInfo(data);
      });
      getFeedbackOfSpecialist(auth.specialist).then((data) => {
        entity.setFeedback(data);
      });
    } else {
      getFeedbackOfSpecialist(specialist.id).then((data) => {
        entity.setFeedback(data);
      });
    }
  }, []);

  const deleteProfile = () => {
    try {
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      deleteUser(specialist?.userId || auth?.user?.id).then(() => {
        setNotify({
          isOpen: true,
          message: "Аккаунт успешно удален",
          type: "success",
        });
        if(auth.user.role == "SPECIALIST") {
          logout()
        }
      });
    } catch (err) {
      setNotify({
        isOpen: true,
        message: err.message,
        type: "error",
      });
    }
  };

  const renderYear = (year) => {
      if(year == 1) {
        return `${year} год`
      }
      else if(year > 1 && year < 5) {
        return `${year} года`
      }
      else if(year > 5) {
        return `${year} лет`
      }
  }

  const logout = () => {
    auth.setIsAuthenticated(false);
    auth.setUser({});
    auth.setPatient(null);
    auth.setSpecialist(null);
    localStorage.clear();
    history.push(SIGNIN_ROUTE);
  };

  return (
    <>
      <Grid container spacing={6}>
        <Grid item container xs={12} md={12} spacing={4}>
          <Grid item container xs={12} md={5}>
            <Grid
              item
              xs={12}
              md={12}
              component={Paper}
              style={{ padding: "20px" }}
            >
              <Box
                style={{
                  backgroundImage: `url(${
                    process.env.REACT_APP_API_URL + specialistInfo?.photo
                  })`,
                  backgroundSize: "cover",
                  width: "100%",
                  height: "300px",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              />
              {auth.user.role === "SPECIALIST" || auth.user.role === "ADMIN" ? (
                <>
                  <Grid item xs={12} md={12}>
                    <Button
                      fullWidth
                      style={{ marginBottom: "5px" }}
                      variant="outlined"
                      color="primary"
                      onClick={() =>
                        popup.setEditSpecialistProfilePopupOpen(true)
                      }
                    >
                      Редактировать
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: "Вы действительно хотите удалить аккаунт?",
                          subtitle: "Данное действие будет необратимо",
                          onConfirm: () => {
                            deleteProfile();
                          },
                        });
                      }}
                    >
                      Удалить
                    </Button>
                  </Grid>
                </>
              ) : (
                <></>
              )}
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
                  {specialistInfo?.surname} {specialistInfo?.name}{" "}
                  {specialistInfo?.patronymic}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} className={classes.attribute}>
                <Typography className={classes.name}>Дата рождения:</Typography>
                <Typography>
                  {new Date(specialistInfo?.dateOfBirth).toLocaleDateString()}
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
                <Typography> {specialistInfo?.gender}</Typography>
              </Grid>
              <Grid item xs={12} md={12} className={classes.attribute}>
                <Typography className={classes.name}>Специальность:</Typography>
                <Typography>{specialistInfo?.specialty}</Typography>
              </Grid>
              <Grid item xs={12} md={12} className={classes.attribute}>
                <Typography className={classes.name}>Стаж работы:</Typography>
                <Typography>{renderYear(specialistInfo?.workExperience)}</Typography>
              </Grid>
              <Grid item xs={12} md={12} className={classes.attribute}>
                <Typography className={classes.name}>О себе:</Typography>
                <Typography>{specialistInfo?.about}</Typography>
              </Grid>
              {specialistInfo?.startTime ? (
                <>
                  <Grid item xs={12} md={12} className={classes.attribute}>
                    <Typography className={classes.name}>
                      Режим работы:
                    </Typography>
                    <Typography>
                      {`${specialistInfo?.startTime}:00-${specialistInfo?.endTime}:00`}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={12} className={classes.attribute}>
                    <Typography className={classes.name}>
                      Среднее время приема:
                    </Typography>
                    <Typography>
                      {specialistInfo?.interval + " минут"}
                    </Typography>
                  </Grid>
                </>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            md={12}
            style={{ overflowY: "scroll", height: "155px" }}
            component={Paper}
          >
            <ReviewList />
          </Grid>
        </Grid>
      </Grid>
      <Popup
        openPopup={popup.editSpecialistProfilePopupOpen}
        setOpenPopup={() => {
          popup.setEditSpecialistProfilePopupOpen(false);
          profile.setPhotoFromDevice(false);
        }}
        title="Редактирование профиля"
      >
        <SpecialistEditForm specialist={specialist} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
});
