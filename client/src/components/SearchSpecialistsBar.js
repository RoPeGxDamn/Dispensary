import React, { useContext, useState } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import {
  TextField,
  Grid,
  Paper,
  Box,
  Button,
  makeStyles,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import {} from "@material-ui/styles";
import { KeyboardTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { filterTickets } from "../http/ticketAPI";
import SearchIcon from "@material-ui/icons/Search";
import { fetchSpecialists, filterSpecialistsForAdmin } from "../http/specialistAPI";
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  item: {
    padding: "10px",
  },
}));

export const SearchSpecialistsBar = observer(() => {
  const { auth, basket, entity } = useContext(Context);
  const classes = useStyles();
  const [specialty, setSpecialty] = useState(Date.now());
  const [fullName, setFullName] = useState("");

  const search = () => {
    try {
      const [surname, name, patronymic] = fullName.split(' ')
      filterSpecialistsForAdmin(surname, name, patronymic, specialty).then(data => {
        entity.setSpecialists(data)
      })
    } catch (err) {
      console.error(err.message)
    }
  };

  const clear = () => {
    try {
      setFullName("")
      setSpecialty("")
      fetchSpecialists().then(data => {
        entity.setSpecialists(data)
      })
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <Grid container>
      <Grid item xs={12} md={6} className={classes.item}>
        <TextField
          fullWidth
          label="Специалист"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={5} className={classes.item}>
        <FormControl
          className={classes.formControl}
          style={{ minWidth: "100%" }}
        >
          <InputLabel id="disability-label">Специальность</InputLabel>
          <Select
            fullWidth
            labelId="disability-label"
            value={specialty}
            onChange={(e) => {
              setSpecialty(e.target.value);
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
      <Grid item xs={12} md={1} className={classes.item} style={{display: 'flex'}}>
        <IconButton onClick={search}>
          <SearchIcon />
        </IconButton>
        <IconButton onClick={clear}>
          <ClearIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
});
