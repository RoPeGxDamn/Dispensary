import React, { useEffect, useContext, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Paper,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import { observer } from "mobx-react-lite";
import { getOneSpecialist } from "../http/specialistAPI";
import { Context } from "../index";
import {
  getTicketsForPatient,
  deleteTicket,
  cancelTicket,
} from "../http/ticketAPI";
import CloseIcon from "@material-ui/icons/Close";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Notification from "./Notification";
import ConfirmDialog from "./ConfirmDialog";

const useStyles = makeStyles((theme) => ({
  item: {
    minWidth: "100%",
    borderLeft: "20px solid #1976d2",
    marginBottom: "7px",
  },
}));

export const TicketItem = observer(({ ticket }) => {
  const classes = useStyles();
  const [specialistInfo, setSpecialistInfo] = useState({});
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
  const { entity, auth } = useContext(Context);

  useEffect(async () => {
    try {
      await getOneSpecialist(ticket.specialistId).then((data) =>
        setSpecialistInfo(data)
      );
    } catch (err) {
      console.error(err.message);
    }
  }, [entity.tickets]);

  const eraseTicket = () => {
    try {
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      cancelTicket(ticket.id).then(() => {
        setNotify({
          isOpen: true,
          message: "Талон успешно отменен",
          type: "success",
        });
        getTicketsForPatient(auth.patient).then((data) => {
          entity.setTickets(data);
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

  const correctTicket = () => {
    try {
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      deleteTicket(ticket.id).then(() => {
        setNotify({
          isOpen: true,
          message: "Талон успешно удален",
          type: "success",
        });
        getTicketsForPatient(auth.patient).then((data) => {
          entity.setTickets(data);
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
      <ListItem className={classes.item} button>
        <Grid container item xs={12} md={12}>
          <Grid container item xs={11} md={11}>
            <Grid container item xs={12} md={12}>
              <Grid item xs={4} md={4}>
                <Typography variant="h6">Дата</Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <Typography variant="h6">Время</Typography>
              </Grid>
              <Grid item xs={4} md={4}>
                <Typography variant="h6">Специалист</Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} md={12} spacing={2}>
              <Grid item xs={4} md={4}>
                {new Date(ticket.visitDate).toLocaleDateString()}
              </Grid>
              <Grid item xs={4} md={4}>
                {ticket.visitTime}
              </Grid>
              <Grid item xs={4} md={4}>
                {specialistInfo.surname +
                  " " +
                  specialistInfo.name +
                  " " +
                  specialistInfo.patronymic}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={1}
            md={1}
            style={{ display: "flex", alignItems: "center" }}
          >
            {ticket.state == 'Активный' || new Date(ticket.visitDate) < new Date(Date.now()) ? (
              <Grid item xs={12} md={12}>
                <Tooltip title="Отменить">
                  <IconButton
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: "Вы действительно желаете отменить данный талон?",
                        subtitle: "Данное действие нельзя будет отменить",
                        onConfirm: () => {
                          eraseTicket();
                        },
                      });
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            ) : (
              <Grid item xs={12} md={12}>
                <Tooltip title="Удалить">
                  <IconButton
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: "Вы действительно желаете удалить данный талон?",
                        subtitle: "Данное действие нельзя будет отменить",
                        onConfirm: () => {
                          correctTicket();
                        },
                      });
                    }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            )}
          </Grid>
        </Grid>
      </ListItem>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
});
