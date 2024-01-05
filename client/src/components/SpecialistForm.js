import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
} from "@material-ui/core";
import { filterSpecialists, fetchSpecialists } from "../http/specialistAPI";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

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
  formControl: {
    margin: theme.spacing(0),
    minWidth: "100%",
  },
}));

export const SpecialistForm = observer(() => {
  const classes = useStyles();
  const { entity, ticket } = useContext(Context);
  const [specialty, setSpecialty] = useState(ticket.specialty || "");
  const [specialist, setSpecialist] = useState(ticket.specialist || "");

  useEffect(async () => {
    if (specialty === "") {
      await fetchSpecialists().then((data) => {
        entity.setSpecialists(data);
      });
    } else {
      await filterSpecialists(specialty).then((data) => {
        entity.setSpecialists(data);
      });
    }
  }, [specialty]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="disability-label">Специальность</InputLabel>
            <Select
              labelId="disability-label"
              id="disability-select"
              value={specialty}
              onChange={(e) => {
                setSpecialty(e.target.value);
                ticket.setSpecialty(e.target.value);
              }}
            >
              {entity.specialties.map((item) => (
                <MenuItem key={item.id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="specialist-label">Специалисты</InputLabel>
            <Select
              labelId="specialist-label"
              id="specialist-select"
              value={specialist}
              onChange={(e) => {
                setSpecialist(e.target.value);
                ticket.setSpecialist(e.target.value);
              }}
            >
              {entity.specialists.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.surname + " " + item.name + " " + item.patronymic}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
});
