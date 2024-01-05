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
import { fetchDiagnoses, filterDiagnosesForAdmin } from "../http/diagnosisAPI";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  item: {
    padding: "10px",
  },
}));

export const SearchDiagnosesBar = observer(() => {
  const { auth, basket, entity, search } = useContext(Context);
  const classes = useStyles();
  const [cipher, setCipher] = useState("");
  const [name, setName] = useState("");

  const searchDiagnoses = () => {
    try {
      filterDiagnosesForAdmin(name, cipher).then((data) => {
        entity.setDiagnoses(data);
        search.setSearchStatus(true);
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const clear = () => {
    try {
      setCipher("");
      setName("");
      fetchDiagnoses().then((data) => {
        entity.setDiagnoses(data);
        search.setSearchStatus(false);
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} md={6} className={classes.item}>
        <TextField
          fullWidth
          label="Название"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={5} className={classes.item}>
        <TextField
          fullWidth
          label="Шифр"
          value={cipher}
          onChange={(e) => setCipher(e.target.value)}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={1}
        className={classes.item}
        style={{ display: "flex" }}
      >
        <IconButton onClick={searchDiagnoses}>
          <SearchIcon />
        </IconButton>
        <IconButton onClick={clear}>
          <ClearIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
});
