import React, { useState, useContext, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import {
  Button,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  Collapse,
  ListItemIcon,
  ListItemText,
  ListItem,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import FolderSharedIcon from "@material-ui/icons/FolderShared";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { Context } from "../index";
import {
  CARD_ROUTE,
  PATIENT_PROFILE_ROUTE,
  PATIENT_ROUTE,
  PATIENT_SPECIALISTS_ROUTE,
  SCHEDULE_ROUTE,
  SIGNIN_ROUTE,
  SIGNUP_ROUTE,
  SPECIALIST_PATIENTS_ROUTE,
  SPECIALIST_PROFILE_ROUTE,
  SPECIALIST_ROUTE,
  TICKET_ROUTE,
  ORDER_ROUTE,
  ADMIN_ROUTE,
} from "../utils/const";
import { observer } from "mobx-react-lite";
import ScheduleIcon from "@material-ui/icons/Schedule";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";

const drawerWidth = 290;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // [theme.breakpoints.down("sm")]: {
    //   display: "none",
    // },
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  subItem: {
    paddingLeft: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
}));

export const NavBar = observer(() => {
  const classes = useStyles();
  const theme = useTheme();
  const { auth } = useContext(Context);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openCardItem, setOpenCardItem] = useState(false);
  const [openTicketItem, setOpenTicketItem] = useState(false);
  const [currentSection, setCurrentSection] = useState("Главная");
  const location = useLocation();
  const showNavBar =
    location.pathname !== SIGNIN_ROUTE && location.pathname !== SIGNUP_ROUTE;

  useEffect(() => {
    switch (location.pathname) {
      case PATIENT_ROUTE:
        setCurrentSection("Главная");
        break;
      case PATIENT_PROFILE_ROUTE:
        setCurrentSection("Профиль");
        break;
      case CARD_ROUTE:
        setCurrentSection("Амбулаторная карта");
        break;
      case ORDER_ROUTE:
        setCurrentSection("Талоны");
        break;
      case TICKET_ROUTE:
        setCurrentSection("Корзина");
        break;
      case SPECIALIST_PROFILE_ROUTE:
        setCurrentSection("Профиль");
        break;
      case SPECIALIST_PATIENTS_ROUTE:
        setCurrentSection("Пациенты");
        break;
      case SCHEDULE_ROUTE:
        setCurrentSection("Расписание");
        break;
      case PATIENT_SPECIALISTS_ROUTE:
        setCurrentSection("Специалисты");
        break;
      case ADMIN_ROUTE: 
      setCurrentSection("Админ панель");
        break;
    }
  }, [location.pathname]);

  const handleCardClick = () => {
    setOpenCardItem(!openCardItem);
  };

  const handleTicketClick = () => {
    setOpenTicketItem(!openTicketItem);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    auth.setIsAuthenticated(false);
    auth.setUser({});
    auth.setPatient(null);
    auth.setSpecialist(null);
    localStorage.clear();
    history.push(SIGNIN_ROUTE);
  };

  const patientItems = (
    <List disablePadding component="nav" className={classes.root}>
      <ListItem button onClick={() => history.push(PATIENT_ROUTE)}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Главная" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          handleCardClick();
        }}
      >
        <ListItemIcon>
          <FolderSharedIcon />
        </ListItemIcon>
        <ListItemText primary="Амбулаторная карта" />
        {openCardItem ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openCardItem} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.subItem}
            onClick={() => {
              history.push(CARD_ROUTE);
              setCurrentSection("Амбулаторная карта");
            }}
          >
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText primary="Смотреть" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button onClick={handleTicketClick}>
        <ListItemIcon>
          <LocalOfferIcon />
        </ListItemIcon>
        <ListItemText primary="Талоны" />
        {openTicketItem ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openTicketItem} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            className={classes.subItem}
            button
            onClick={() => {
              history.push(ORDER_ROUTE);
            }}
          >
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Заказать" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem
        button
        onClick={() => {
          history.push(PATIENT_SPECIALISTS_ROUTE);
        }}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Специалисты" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          history.push(TICKET_ROUTE);
        }}
      >
        <ListItemIcon>
          <ShoppingBasketIcon />
        </ListItemIcon>
        <ListItemText primary="Корзина" />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => history.push(PATIENT_PROFILE_ROUTE)}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Профиль" />
      </ListItem>
      <ListItem button onClick={logout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Выйти" />
      </ListItem>
    </List>
  );

  const specialistItems = (
    <List disablePadding component="nav">
      <ListItem button onClick={() => history.push(SPECIALIST_ROUTE)}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Главная" />
      </ListItem>
      <ListItem button onClick={() => history.push(SCHEDULE_ROUTE)}>
        <ListItemIcon>
          <ScheduleIcon />
        </ListItemIcon>
        <ListItemText primary="Расписание" />
      </ListItem>
      <ListItem button onClick={() => history.push(SPECIALIST_PATIENTS_ROUTE)}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Пациенты" />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => history.push(SPECIALIST_PROFILE_ROUTE)}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Профиль" />
      </ListItem>
      <ListItem button onClick={logout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Выйти" />
      </ListItem>
    </List>
  );

  const adminItems = (
    <List disablePadding component="nav">
      <ListItem button onClick={() => history.push(ADMIN_ROUTE)}>
        <ListItemIcon>
          <ScheduleIcon />
        </ListItemIcon>
        <ListItemText primary="Админ панель" />
      </ListItem>
      <ListItem button onClick={logout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Выйти" />
      </ListItem>
    </List>
  );

  if (showNavBar) {
    return (
      <div>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.title}>
              {currentSection}
            </Typography>
            <Button onClick={logout}>
              <ExitToAppIcon style={{ color: "white" }} />
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          {auth.user.role === "PATIENT" ? patientItems : auth.user.role === "SPECIALIST" ? specialistItems : adminItems }
        </Drawer>
      </div>
    );
  } else {
    return <></>;
  }
});
