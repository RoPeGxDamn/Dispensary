import React, { useContext, useState } from "react";
import {
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
  makeStyles,
  Typography,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { OutpatientCard } from "./OutpatientCard";
import Popup from "./Popup";
import DiagnosisForm from "./DiagnosisForm";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const Row = observer((props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const { schedule, popup } = useContext(Context);
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
          {row?.patient?.surname +
            " " +
            row?.patient?.name +
            " " +
            row?.patient?.patronymic}
        </TableCell>
        <TableCell align="right">
          {new Date(row?.visitDate).toLocaleDateString()}
        </TableCell>
        <TableCell align="right">{row?.visitTime}</TableCell>
        <TableCell align="right">
          <IconButton
            onClick={() => {
              popup.setAddDiagnosisPopupOpen(true);
              schedule.setSelectedVisit(row?.id);
            }}
          >
            <AssignmentIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <OutpatientCard patient={row?.patient} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Popup
        openPopup={popup.addDiagnosisPopupOpen}
        setOpenPopup={() => {
          popup.setAddDiagnosisPopupOpen(false);
        }}
        title="Постановка диагноза"
      >
        <DiagnosisForm />
      </Popup>
    </React.Fragment>
  );
});

export default observer(function ScheduleTable() {
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
            <TableCell align="right">Дата приема</TableCell>
            <TableCell align="right">Время приема</TableCell>
            <TableCell align="right">Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ position: "relative" }}>
          {entity.tickets.length === 0 ? (
            <Box style={{ position: "absolute", top: 100, left: 550 }}>
              <Typography style={{letterSpacing: '2px'}}> Нет пациентов</Typography>
            </Box>
          ) : (
            entity.tickets.map((row) => <Row key={row.id} row={row} />)
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
