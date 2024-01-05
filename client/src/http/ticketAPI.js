import { $authHost, $host } from "./index";

export const fetchTickets = async () => {
  const { data } = await $authHost.get("api/ticket");
  return data;
};

export const editTicket = async (
  id,
  visitDate,
  visitTime,
  patientId,
  specialistId
) => {
  const { data } = await $authHost.put(`api/ticket/${id}`, {
    visitDate,
    visitTime,
    patientId,
    specialistId,
  });
  return data;
};

export const createTicket = async (
  visitDate,
  visitTime,
  patientId,
  specialistId
) => {
  const { data } = await $authHost.post("api/ticket", {
    visitDate,
    visitTime,
    patientId,
    specialistId,
  });
  return data;
};

export const deleteTicket = async (id) => {
  const { data } = await $authHost.put(`api/ticket/history/${id}`);
  return data;
};

export const cancelTicket = async (id) => {
  const { data } = await $authHost.delete(`api/ticket/${id}`);
  return data;
};

export const getOneTicket = async (id) => {
  const { data } = await $authHost.get(`api/ticket/${id}`);
  return data;
};

export const getTicketsForSpecialist = async (id) => {
  const { data } = await $authHost.get(`api/ticket/specialist/${id}`);
  return data;
};

export const getTicketsForPatient = async (id) => {
  const { data } = await $authHost.get(`api/ticket/patient/${id}`);
  return data;
};

export const filterTickets = async (
  date,
  time,
  surname,
  name,
  patronymic,
  patientId
) => {
  const { data } = await $authHost.post("api/ticket/filter", {
    date,
    time,
    surname,
    name,
    patronymic,
    patientId,
  });
  return data;
};

export const getOccupiedTickets = async (visitDate, specialistId) => {
  const { data } = await $authHost.post("api/ticket/occupied", {
    visitDate,
    specialistId,
  });
  return data;
};

export const getActiveOrInactiveTickets = async (id, state) => {
  const { data } = await $authHost.post(`api/ticket/filter/${id}`, { state });
  return data;
};

export const filterSchedule = async (
  specialistId,
  surname,
  name,
  patronymic,
  visitDate,
  visitTime
) => {
  const { data } = await $authHost.post("api/ticket/filter/schedule", {
    specialistId,
    surname,
    name,
    patronymic,
    visitDate,
    visitTime,
  });
  return data;
};
