import { $authHost, $host } from "./index";

export const fetchSpecialists = async () => {
  const { data } = await $authHost.get("api/specialist");
  return data;
};

export const editSpecialist = async (
  id,
  surname,
  name,
  patronymic,
  gender,
  workExperience,
  specialty,
  about,
  dateOfBirth
) => {
  const { data } = await $authHost.put(`api/specialist/${id}`, {
    surname,
    name,
    patronymic,
    gender,
    workExperience,
    specialty,
    about,
    dateOfBirth,
  });
  return data;
};

export const filterSpecialists = async (specialty) => {
  const { data } = await $authHost.post("api/specialist/filter", {
    specialty
  });
  return data;
};

export const getOneSpecialist = async (id) => {
  const { data } = await $authHost.get(`api/specialist/${id}`);
  return data;
};

export const getSpecialistId = async (id) => {
  const { data } = await $authHost.get(`api/specialist/store/${id}`);
  return data;
};

export const filterSpecialistsForAdmin = async (surname, name, patronymic, specialty) => {
  const {data} = await $authHost.post('api/specialist/filter/specialists', {surname, name, patronymic, specialty})
  return data
}

export const setSchedule = async (specialistId, startTime, endTime, interval) => {
  const {data} = await $authHost.put('api/specialist/schedule', {specialistId, startTime, endTime, interval})
  return data
}
