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
  InputLabel,
  FormControl,
  Select,
  MenuItem
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
import ClearIcon from '@material-ui/icons/Clear';
import { fetchAnnouncements, filterAnnouncements } from "../http/announcementAPI";

const useStyles = makeStyles((theme) => ({
  item: {
    padding: "10px",
  },
}))

export const SearchAnnouncementsBar = observer(() => {
  const { auth, basket, entity, search } = useContext(Context);
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [person, setPerson] = useState("");

  const searchAnnouncements = () => {
    try {
      filterAnnouncements(title, message, person).then(data => {
        search.setSearchStatus(true)
        entity.setAnnouncements(data)
      })
    } catch (err) {
      console.error(err.message);
    }
  };

  const clear = () => {
    try {

      setTitle("");
      setMessage("");
      setPerson("");
      fetchAnnouncements().then(data => {
        search.setSearchStatus(false)
        entity.setAnnouncements(data)
      })
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} md={4} className={classes.item}>
        <TextField
          fullWidth
          label="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={4} className={classes.item}>
        <TextField
          fullWidth
          label="Сообщение"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={3} className={classes.item}>
      <FormControl
          className={classes.formControl}
          style={{ minWidth: "100%" }}
        >
          <InputLabel id="disability-label">Читатель</InputLabel>
          <Select
            fullWidth
            labelId="disability-label"
            value={person}
            onChange={(e) => {
              setPerson(e.target.value);
            }}
          >
            {entity.roles.map((item) => (
              <MenuItem key={item.id} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={1} className={classes.item} style={{display: 'flex'}}>
        <IconButton onClick={searchAnnouncements}>
          <SearchIcon />
        </IconButton>
        <IconButton onClick={clear}>
          <ClearIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
})
