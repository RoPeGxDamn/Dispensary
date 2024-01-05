import {$authHost, $host} from './index'

export const fetchOutpatientCards = async () => {
    const {data} = await $authHost.get('api/card/all')
    return data
}

export const createOutpatientCard = async (id) => {
    const {data} = await $authHost.post(`api/card/${id}`)
    return data
}

export const getOneOutpatientCard = async (id) => {
    const {data} = await $authHost.get(`api/card/${id}`)
    return data
}

export const getPatients = async () => {
    const {data} = await $authHost.get('api/card')
    return data
} 