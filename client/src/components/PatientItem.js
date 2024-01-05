import React, { useEffect, useContext, useState } from "react";
import { Button, Grid, Typography, Paper, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import { observer } from "mobx-react-lite";
import { getOneSpecialist } from "../http/specialistAPI";
import { Context } from "../index";
import { getTicketsForPatient, deleteTicket } from "../http/ticketAPI";
import CloseIcon from "@material-ui/icons/Close";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Popup from "./Popup";
import { OutpatientCard } from "./OutpatientCard";
import { PatientProfileForm } from "./PatientProfileForm";

const useStyles = makeStyles((theme) => ({
  item: {
    minWidth: "100%",
    borderLeft: "20px solid #1976d2",
    marginBottom: "7px",
  },
  root: {
    maxWidth: 270,
  },
}));

export const PatientItem = observer(({ patient }) => {
  const classes = useStyles();
  const { entity, auth, popup } = useContext(Context);
  const [profilePopupOpen, setProfilePopupOpen] = useState(false)
  const [outpatientCardPopupOpen, setOutpatientCardPopupOpen] = useState(false)

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={`${patient.surname} ${patient.name[0]}. ${patient.patronymic[0]}.`}
            height="200"
            image={process.env.REACT_APP_API_URL + patient.photo}
            title={`${patient.surname} ${patient.name[0]}. ${patient.patronymic[0]}.`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {`${patient.surname} ${patient.name[0]}. ${patient.patronymic[0]}.`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Дата рождения: {new Date(patient.dateOfBirth).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Адрес: {patient.address}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={() => {
            setProfilePopupOpen(true)
          }}>
            Профиль
          </Button>
          <Button size="small" color="primary" onClick={() => {
            setOutpatientCardPopupOpen(true)
          }}>
            Амбулаторная карта
          </Button>
        </CardActions>
      </Card>
      <Popup
        openPopup={profilePopupOpen}
        setOpenPopup={() => {
          setProfilePopupOpen(false);
        }}
        title="Профиль"
      >
        <PatientProfileForm patient={patient} />
      </Popup>
      <Popup
        openPopup={outpatientCardPopupOpen}
        setOpenPopup={() => {
          setOutpatientCardPopupOpen(false);
        }}
        title="Амбулаторная карта"
      >
        <OutpatientCard patient={patient} />
      </Popup>
    </>
  );
});
