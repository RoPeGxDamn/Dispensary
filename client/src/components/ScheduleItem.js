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

const useStyles = makeStyles((theme) => ({
  item: {
    minWidth: "100%",
    borderLeft: "20px solid #1976d2",
    marginBottom: "7px",
  },
}));

export const ScheduleItem = observer(({ item }) => {
  const classes = useStyles();
  const { entity, auth } = useContext(Context);

  return (
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
        <Grid item container xs={1} md={1} style={{display: 'flex', alignItems: 'center'}}>
          {new Date(ticket.visitDate) < new Date(Date.now()) ? (
            <Grid item xs={12} md={12}>
              <IconButton onClick={cancelTicket}>
                <CloseIcon />
              </IconButton>
            </Grid>
          ) : (
            <Grid item xs={12} md={12}>
            <IconButton>
              <DeleteOutlineIcon />
            </IconButton>
          </Grid>
          )}
        </Grid>
      </Grid>
    </ListItem>
  );
});
