import React, { useContext, useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  makeStyles,
  Paper,
  Typography,
  IconButton,
  Input,
  InputLabel,
  FormControl,
  InputAdornment,
} from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { signIn } from "../../http/userAPI";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Context } from "../../index";
import {
  SIGNUP_ROUTE,
  ADMIN_ROUTE,
  SPECIALIST_ROUTE,
  PATIENT_ROUTE,
} from "../../utils/const";
import { getPatientId } from "../../http/patientAPI";
import { getSpecialistId } from "../../http/specialistAPI";
import Notification from "../../components/Notification";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(15, 14),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SignIn = observer(() => {
  const classes = useStyles();
  const history = useHistory();

  const { auth } = useContext(Context);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignIn = async () => {
    try {
      const data = await signIn(email, password);
      auth.setUser(data);
      auth.setIsAuthenticated(true);
      if (auth.user.role === "PATIENT") {
        await getPatientId(auth.user.id).then((data) => {
          auth.setPatient(data.id);
        });
      } else if (auth.user.role === "SPECIALIST") {
        await getSpecialistId(auth.user.id).then((data) => {
          auth.setSpecialist(data.id);
        });
      }
      switch (auth.user.role) {
        case "ADMIN":
          history.push(ADMIN_ROUTE);
          break;
        case "SPECIALIST":
          history.push(SPECIALIST_ROUTE);
          break;
        case "PATIENT":
          history.push(PATIENT_ROUTE);
          break;
      }
    } catch (err) {
      setNotify({
        isOpen: true,
        message: 'Email / пароль введены неверно',
        type: 'error'
      })
    }
  };

  return (
    <>
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Авторизация
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  margin="normal"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl style={{ minWidth: "100%" }}>
                  <InputLabel htmlFor="standard-adornment-password">
                    Пароль
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    margin="normal"
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={handleSignIn}
                >
                  Войти
                </Button>
              </Grid>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href={SIGNUP_ROUTE} variant="body2">
                    {"Нет аккаунта? Зарегистрируйтесь!"}
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
    <Notification notify={notify} setNotify={setNotify}/>
    </>
  );
});
