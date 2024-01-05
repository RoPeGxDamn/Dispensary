import React, { useEffect, useContext } from "react";
import { AppRouter } from "./components/AppRouter";
import { BrowserRouter as Router } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { check } from "./http/userAPI";
import { Context } from "./index";
import { NavBar } from "./components/NavBar";
import { getPatientId } from "./http/patientAPI";
import { getSpecialistId } from "./http/specialistAPI";

const App = observer(() => {
  const { auth } = useContext(Context);

  useEffect(async () => {
    try {
      await check().then((data) => {
        auth.setUser(data);
        auth.setIsAuthenticated(true);
      });

      switch (auth.user.role) {
        case "PATIENT":
          await getPatientId(auth.user.id).then((data) => {
            auth.setPatient(data.id);
          });
          break;
        case "SPECIALIST":
          await getSpecialistId(auth.user.id).then((data) => {
            auth.setSpecialist(data.id);
          });
          break;
        default:
          break;
      }
    } catch (err) {
      console.error(err.message);
    }
  }, [auth]);

  return (
    <Router>
      <NavBar />
      <AppRouter />
    </Router>
  );
});

export default App;
