import React, { useState, useContext } from "react";
import {
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  makeStyles,
  Container,
  Input,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Avatar
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Context } from "../../index";
import {
  SIGNIN_ROUTE,
  ADMIN_ROUTE,
  SPECIALIST_ROUTE,
  PATIENT_ROUTE,
} from "../../utils/const";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { signUpSpecialist } from "../../http/userAPI";
import { getSpecialistId } from "../../http/specialistAPI";
import PublishIcon from '@material-ui/icons/Publish';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  avatar: {
    width: 200,
    height: 200,
    marginBottom: '20px'
  },
  fileInput: {
    position: 'absolute', 
    overflow: 'hidden',
    opacity: 0,
    Zindex: '-1',
    width: '0.1px',
    height: '0.1px'
  },
  uploadButton: {
    display: 'flex',
    cursor: 'pointer',
    padding: '10px 40px',
    backgroundColor: '#e91e63',
    color: 'white',
    borderRadius: '6px',
    alignItems: 'center',
    letterSpacing: '2px',
    fontVariant: 'all-small-caps'
  }
}));

export const SpecialistSignUp = observer(() => {
  const classes = useStyles();
  const { auth, entity } = useContext(Context);
  const history = useHistory();
  const [photo, setPhoto] = useState({});
  const [photoProfile, setPhotoProfile] = useState({})

  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [values, setValues] = useState({
    surname: "",
    name: "",
    patronymic: "",
    gender: "",
    workExperience: "",
    specialty: "",
    email: "",
    password: "",
    about: "",
  });

  const {
    surname,
    name,
    patronymic,
    gender,
    workExperience,
    specialty,
    email,
    password,
    about,
  } = values;

  const handleChangeDate = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const imageHandler = (e) => {
    const reader = new FileReader()
    reader.onload = ( ) => {
      if(reader.readyState === 2) {
        setPhotoProfile(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
    setPhoto(e.target.files[0])
  }

  const handleSignUp = async () => {
    try {
      const formData = new FormData();
      formData.append("surname", surname);
      formData.append("name", name);
      formData.append("patronymic", patronymic);
      formData.append("dateOfBirth", selectedDate);
      formData.append("gender", gender);
      formData.append("specialty", specialty);
      formData.append("workExperience", workExperience);
      formData.append("about", about);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", "SPECIALIST");
      formData.append("photo", photo);
      const data = await signUpSpecialist(formData);
      auth.setUser(data);
      auth.setIsAuthenticated(true);
      await getSpecialistId(auth.user.id).then((data) => {
        auth.setSpecialist(data.id)
      })
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
      console.error(err.message);
    }
  };

  return (
    <Container component="main" style={{maxHeight: '500px', overflowY: 'scroll'}}>
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid container spacing={3}>
          <Grid item xs={12} md={12} style={{display: 'grid', placeItems: 'center'}}>
            <Avatar className={classes.avatar} src={photoProfile}/>
              <Input
                className={classes.fileInput}
                label="Фото"
                id="upload"
                fullWidth
                type="file"
                onChange={imageHandler}
              />
              <InputLabel className={classes.uploadButton} htmlFor="upload">
              <PublishIcon style={{marginRight: '5px'}}/>
              Загрузить фото
              </InputLabel>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Фамилия"
                value={surname}
                onChange={handleChange("surname")}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Имя"
                value={name}
                onChange={handleChange("name")}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Отчество"
                value={patronymic}
                onChange={handleChange("patronymic")}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Стаж работы"
                type="number"
                value={workExperience}
                onChange={handleChange("workExperience")}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Пол</FormLabel>
                <RadioGroup
                  name="gender1"
                  value={gender}
                  onChange={handleChange("gender")}
                >
                <Box style={{display: 'flex'}}>
                {entity.gender.map((item) => (
                    <FormControlLabel
                      key={item.id}
                      value={item.name}
                      control={<Radio />}
                      label={item.name}
                    />
                  ))}
                </Box>
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={5}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container >
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    label="Дата рождения"
                    value={selectedDate}
                    onChange={handleChangeDate}
                    style={{minWidth: '100%'}}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} md={7}>
              <TextField
                fullWidth
                label="О себе"
                variant="filled"
                multiline
                rows={7}
                rowsMax={7}
                value={about}
                onChange={handleChange("about")}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={handleChange("email")}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Пароль"
                type="password"
                value={password}
                onChange={handleChange("password")}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl
                className={classes.formControl}
                style={{ minWidth: "100%" }}
              >
                <InputLabel id="specialty-label">Специальность</InputLabel>
                <Select
                  labelId="specialty-label"
                  value={specialty}
                  onChange={handleChange("specialty")}
                >
                  {entity.specialties.map((item) => (
                    <MenuItem key={item.id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={handleSignUp}
          >
            Зарегистрироваться
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href={SIGNIN_ROUTE} variant="body2">
                Есть аккаунт? Войдите!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
});
