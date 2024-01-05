import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  IconButton,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { fetchDiagnoses, filterDiagnosis } from "../http/diagnosisAPI";
import { getTicketsForSpecialist } from "../http/ticketAPI";
import { createVisit } from "../http/visitAPI";
import { DataGrid } from "@material-ui/data-grid";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
  },
  form: {
    width: "100%",
    marginBottom: "5px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const categories = [
  { id: 1, name: "Код" },
  { id: 2, name: "Наименование" },
  { id: 3, name: "Шифр" },
];

export default observer(function DiagnosisForm() {
  const { schedule, popup, entity, auth } = useContext(Context);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [selectedRow, setSelectedRow] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const classes = useStyles();

  useEffect(() => {
    fetchDiagnoses().then((data) => {
      setColumns([
        { field: "id", headerName: "Код", width: 100 },
        { field: "name", headerName: "Наименование", width: 180 },
        { field: "cipher", headerName: "Шифр", width: 130 },
      ]);
      setRows(data);
    });
  }, []);

  useEffect(() => {
    setSearchString("");
    getDiagnosis();
  }, [selectedCategory]);

  const getDiagnosis = () => {
    try {
      if (!searchString) {
        fetchDiagnoses().then((data) => {
          setRows(data);
        });
        return;
      }
      switch (selectedCategory) {
        case categories[0].name:
          filterDiagnosis(+searchString, "", "").then((data) => {
            setRows(data);
          });
          break;
        case categories[1].name:
          filterDiagnosis("", searchString, "").then((data) => {
            setRows(data);
          });
          break;
        case categories[2].name:
          filterDiagnosis("", "", searchString).then((data) => {
            setRows(data);
          });
          break;
        default:
          break;
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const setDiagnosis = () => {
    try {
      if (schedule.selectedVisit !== null && selectedRow !== {}) {
        createVisit(schedule.selectedVisit, selectedRow.id).then(() => {
          popup.setAddDiagnosisPopupOpen(false);
          getTicketsForSpecialist(auth.specialist).then((data) => {
            entity.setTickets(data);
          });
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form className={classes.form} noValidate>
      <Grid container xs={12} md={12} spacing={2} style={{ minWidth: "500px" }}>
        <Grid item container xs={12} md={12} spacing={3}>
          <Grid item xs={6} md={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="disability-label">Специальность</InputLabel>
              <Select
                labelId="disability-label"
                id="disability-select"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                }}
              >
                {categories.map((item) => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={6}>
            <Grid container xs={12} md={12}>
              <Grid item xs={11} md={11}>
                <TextField
                  variant="outlined"
                  style={{ minWidth: "100%" }}
                  value={searchString}
                  onChange={(e) => {
                    setSearchString(e.target.value);
                  }}
                  placeholder="Поиск..."
                />
              </Grid>
              <Grid item xs={1} md={1}>
                <IconButton
                  style={{ marginLeft: "5px" }}
                  onClick={getDiagnosis}
                >
                  <SearchIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <Box>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              checkboxSelection
              autoHeight
              onRowSelected={(item) => {
                setSelectedRow(item.data);
              }}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button variant="contained" color="primary" onClick={setDiagnosis}>
            Поставить диагноз
          </Button>
        </Grid>
      </Grid>
    </form>
  );
});
