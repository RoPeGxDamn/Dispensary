import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Grid,
  Avatar,
  ButtonGroup,
  Box,
  IconButton,
  Tooltip,
  Input,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import PatientAccordion from "./PatientAccordion";
import { getOneUser, editPatientProfile } from "../http/userAPI";
import { getOnePatient } from "../http/patientAPI";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import EditIcon from "@material-ui/icons/Edit";

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
    width: "100%",
    padding: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  avatar: {
    width: 210,
    height: 210,
  },
  leftSide: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  fileInput: {
    position: "absolute",
    overflow: "hidden",
    opacity: 0,
    Zindex: "-1",
    width: "0.1px",
    height: "0.1px",
  },
}));

export default observer(function PatientEditForm({ patient }) {
  const { auth, profile, popup } = useContext(Context);
  const classes = useStyles();
  const [deviceUpload, setDeviceUpload] = useState(false);
  const [userInfo, setUserInfo] = useState(patient?.user || {});
  const [patientInfo, setPatientInfo] = useState(patient || {});
  const [profilePhoto, setProfilePhoto] = useState(patient.photo || {});

  useEffect(() => {
    try {
      if (!patient) {
        getOneUser(auth.user.id).then((data) => {
          setUserInfo(data);
        });
        getOnePatient(auth.patient).then((data) => {
          setPatientInfo(data);
          setProfilePhoto(data.photo);
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  const editProfile = () => {
    try {
      if (profile.formData != {}) {
        editPatientProfile(profile.formData).then(() => {
          popup.setEditPatientProfilePopupOpen(false);
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setDeviceUpload(true);
        setProfilePhoto(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    profile.setPhotoForDB(e.target.files[0]);
  };

  return (
    <form className={classes.form} noValidate>
      <Grid container spacing={2}>
        <Grid item container xs={4} md={4}>
          <Grid
            item
            xs={12}
            md={9}
            style={{ display: "grid", placeItems: "center" }}
          >
            {deviceUpload ? (
              <Avatar className={classes.avatar} src={profilePhoto} />
            ) : (
              <Avatar
                className={classes.avatar}
                src={process.env.REACT_APP_API_URL + profilePhoto}
              />
            )}
          </Grid>
          <Grid item xs={12} md={3} className={classes.leftSide}>
            <Tooltip title="Редактировать">
              <IconButton onClick={editProfile}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Загрузить фото">
              <IconButton>
                <InputLabel className={classes.uploadButton} htmlFor="upload">
                  <AddPhotoAlternateIcon />
                </InputLabel>
              </IconButton>
            </Tooltip>
            <Input
              className={classes.fileInput}
              label="Фото"
              id="upload"
              fullWidth
              type="file"
              onChange={imageHandler}
            />
          </Grid>
        </Grid>
        <Grid item xs={8} md={8}>
          <PatientAccordion user={userInfo} patient={patientInfo} />
        </Grid>
      </Grid>
    </form>
  );
});
