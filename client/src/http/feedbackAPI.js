import {$authHost, $host} from './index'

export const createFeedback = async (title, body, rating, patientId, specialistId, publicStatus) => {
    const {data} = await $authHost.post('api/feedback', {title, body, rating, patientId, specialistId, publicStatus})
    return data
}

export const getFeedbackOfSpecialist = async (id) => {
    const {data} = await $authHost.get(`api/feedback/specialist/${id}`)
    return data
}

