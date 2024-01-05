import {
  ADMIN_ROUTE,
  SIGNIN_ROUTE,
  SIGNUP_ROUTE,
  PATIENT_ROUTE,
  SPECIALIST_ROUTE,
  TICKET_ROUTE,
  ORDER_ROUTE,
  CARD_ROUTE,
  SCHEDULE_ROUTE,
  PATIENT_PROFILE_ROUTE,
  SPECIALIST_PROFILE_ROUTE,
  SPECIALIST_PATIENTS_ROUTE,
  PATIENT_SPECIALISTS_ROUTE,
} from "./utils/const";
import { SignIn } from "./pages/PUBLIC/SignIn";
import { SignUp } from "./pages/PUBLIC/SignUp";
import { Dashboard } from "./pages/ADMIN/Dashboard";
import { MainPage } from "./pages/PATIENT/MainPage";
import { SchedulePage } from "./pages/SPECIALIST/SchedulePage";
import { FirstPage } from "./pages/SPECIALIST/FirstPage";
import { OrderPage } from "./pages/PATIENT/OrderPage";
import { TicketPage } from "./pages/PATIENT/TicketPage";
import { CardPage } from "./pages/PATIENT/CardPage";
import { PatientProfilePage } from "./pages/PATIENT/ProfilePage";
import { SpecialistProfilePage } from "./pages/SPECIALIST/ProfilePage";
import { PatientsPage } from "./pages/SPECIALIST/PatientsPage";
import { SpecialistsPage } from "./pages/PATIENT/SpecialistsPage";

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Dashboard,
  },
];

export const patientRoutes = [
  {
    path: PATIENT_ROUTE,
    Component: MainPage,
  },
  {
    path: ORDER_ROUTE,
    Component: OrderPage,
  },
  {
    path: TICKET_ROUTE,
    Component: TicketPage,
  },
  {
    path: CARD_ROUTE,
    Component: CardPage,
  },
  {
    path: PATIENT_PROFILE_ROUTE,
    Component: PatientProfilePage,
  },
  {
    path: PATIENT_SPECIALISTS_ROUTE,
    Component: SpecialistsPage,
  },
];

export const specialistRoutes = [
  {
    path: SCHEDULE_ROUTE,
    Component: SchedulePage,
  },
  {
    path: SPECIALIST_ROUTE,
    Component: FirstPage,
  },
  {
    path: SPECIALIST_PROFILE_ROUTE,
    Component: SpecialistProfilePage,
  },
  {
    path: SPECIALIST_PATIENTS_ROUTE,
    Component: PatientsPage,
  },
];

export const publicRoutes = [
  {
    path: SIGNIN_ROUTE,
    Component: SignIn,
  },
  {
    path: SIGNUP_ROUTE,
    Component: SignUp,
  },
];
