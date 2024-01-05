import React, { useContext, useEffect, useState } from "react";
import {
  makeStyles,
  Avatar,
  Box,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { getVisitsForCard } from "../http/visitAPI";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    height: "80vh",
    [theme.breakpoints.between("xs", "sm")]: {
      maxWidth: "600px",
    },
    overflowY: "scroll",
  },
  container: {
    display: "grid",
    alignContent: "center",
    justifyContent: "center",
  },
  avatar: {
    width: "250px",
    height: "250px",
  },
  value: {
    letterSpacing: '2px',
    fontStyle: 'italic'
  }
}));

export const OutpatientCard = observer(({ patient }) => {
  const classes = useStyles();
  const { auth } = useContext(Context);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    getVisitsForCard(auth.patient || patient.id).then((data) => {
      setColumns([
        { field: "id", headerName: "Код", width: 200 },
        { field: "name", headerName: "Специалист", width: 200 },
        { field: "date", headerName: "Дата посещения", width: 200 },
        { field: "cipher", headerName: "Шифр диагноза", width: 200 },
      ]);
      setRows(
        data.map((item) => {
          return {
            id: item.id,
            name: `${item.ticket.specialist.surname} ${item.ticket.specialist.name} ${item.ticket.specialist.patronymic}`,
            date: item.ticket.visitDate,
            cipher: item.diagnosis.cipher,
          };
        })
      );
    });
  }, []);

  return (
    <Paper className={classes.root}>
      <Grid container spacing={3}>
        <Grid container item xs={12} md={3}>
          <Grid
            item
            xs={12}
            md={12}
            style={{ display: "grid", placeItems: "center", padding: '10px' }}
          >
            <Box
              style={{
                backgroundImage: `url(${
                  process.env.REACT_APP_API_URL + patient.photo
                })`,
                backgroundSize: "cover",
                width: "100%",
                height: "300px",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={1} xs={12} md={9} style={{padding: '25px'}}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6"> Фамилия:</Typography>
            <Typography className={classes.value}>{patient.surname}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Имя:</Typography>
            <Typography className={classes.value}>{patient.name}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Отчество:</Typography>
            <Typography className={classes.value}>{patient.patronymic}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Дата рождения:</Typography>
            <Typography className={classes.value}>{new Date(patient.dateOfBirth).toLocaleDateString()}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Пол:</Typography>
            <Typography className={classes.value}>{patient.gender}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Адрес:</Typography>
            <Typography className={classes.value}>{patient.address}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Телефон:</Typography>
            <Typography className={classes.value}>{patient.phoneNumber}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Место работы:</Typography>
            <Typography className={classes.value}>{patient.placeOfWork}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Должность:</Typography>
            <Typography className={classes.value}>{patient.position}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Инвалидность:</Typography>
            <Typography className={classes.value}>{patient.disability}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container style={{height: 213, width: "100%", padding: '10px' }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} />
      </Grid>
    </Paper>
  );
});
