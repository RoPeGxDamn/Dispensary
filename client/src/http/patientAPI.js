import { $authHost, $host } from "./index";

export const fetchPatients = async () => {
  const { data } = await $authHost.get("api/patient");
  return data;
};

export const editPatient = async (
  id,
  surname,
  name,
  patronymic,
  gender,
  address,
  phoneNumber,
  placeOfWork,
  position,
  disability,
  dateOfBirth
) => {
  const { data } = await $authHost.put(`api/patient/${id}`, {
    surname,
    name,
    patronymic,
    gender,
    address,
    phoneNumber,
    placeOfWork,
    position,
    disability,
    dateOfBirth,
  });
  return data;
};

export const getOnePatient = async (id) => {
  const { data } = await $authHost.get(`api/patient/${id}`);
  return data;
};

export const getPatientId = async (id) => {
  const { data } = await $host.get(`api/patient/store/${id}`);
  return data;
};

export const filterPatients = async (surname, name, patronymic, address, dateOfBirth) => {
  const {data} = await $host.post('api/patient/filter',{surname, name, patronymic, address, dateOfBirth})
  return data
}
