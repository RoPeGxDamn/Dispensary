import React, { useContext, useState, useEffect } from "react";
import {
  makeStyles,
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { OutpatientCard } from "./OutpatientCard";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.surname + " " + row.name + " " + row.patronymic}
        </TableCell>
        <TableCell align="right">
          {new Date(row.dateOfBirth).toLocaleDateString()}
        </TableCell>
        <TableCell align="right">{row.address}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={3}>
              <OutpatientCard patient={row} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default observer(function PatientsTable() {
  const { entity } = useContext(Context);

  return (
    <TableContainer
      component={Paper}
      style={{ minHeight: "300px", overflowY: "scroll", maxHeight: "540px" }}
    >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Пациент</TableCell>
            <TableCell align="right">Дата рождения</TableCell>
            <TableCell align="right">Адрес</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ position: "relative" }}>
          {entity.patients.length === 0 ? (
            <Box style={{ position: "absolute", top: 100, left: 550 }}>
              <Typography style={{letterSpacing: '2px'}}> Нет пациентов</Typography>
            </Box>
          ) : (
            entity.patients.map((row) => <Row key={row.id} row={row} />)
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
