import { $authHost, $host } from "./index";

export const fetchVisits = async () => {
  const { data } = await $authHost.get("api/visit");
  return data;
};

export const editVisit = async (id, diagnosisId) => {
  const { data } = await $authHost.put(`api/visit/${id}`, {
    diagnosisId,
  });
  return data;
};

export const createVisit = async (ticketId, diagnosisId) => {
  const { data } = await $authHost.post("api/visit", {
    ticketId,
    diagnosisId,
  });
  return data;
};

export const deleteVisit = async (id) => {
  const { data } = await $authHost.delete(`api/visit/${id}`);
  return data;
};

export const getVisitsForCard = async (id) => {
  const { data } = await $authHost.get(`api/visit/card/${id}`);
  return data;
};

// export const getTicketsWithDiagnosis = async (id) => {
//   const { data } = await $authHost.get(`api/visit/wdiagnosis/${id}`);
//   return data;
// };

// export const getTicketsWithoutDiagnosis = async (id) => {
//   const { data } = await $authHost.get(`api/visit/wtdiagnosis/${id}`);
//   return data;
// };

// export const getTicketsByCategories = async (
//   outpatientCardId,
//   date,
//   time,
//   fullname,
// ) => {
//   const [surname, name, patronymic] = fullname.split(" ");
//   const { data } = await $authHost.post("api/visit/ticket/category", {
//     outpatientCardId,
//     date,
//     time,
//     surname,
//     name,
//     patronymic,
//   });
//   return data;
// };

// export const getSpecialistVisits = async (id) => {
//   const { data } = await $authHost.get(`api/visit/all/${id}`);
//   return data;
// };

export const getVisitsByDate = async (visitDate, specialistId) => {
  const { data } = await $authHost.post("api/visit/date", {
    visitDate,
    specialistId,
  });
  return data;
};

// export const getVisitsByDateTime = async (
//   visitDate,
//   visitTime,
//   specialistId
// ) => {
//   const { data } = await $authHost.post("api/visit/datetime", {
//     visitDate,
//     visitTime,
//     specialistId,
//   });
//   return data;
// };

// export const editVisitDiagnosis = async (diagnosisId, visitId) => {
//   const {data} = await $authHost.post("api/visit/diagnosis", {visitId, diagnosisId})
//   return data
// }
