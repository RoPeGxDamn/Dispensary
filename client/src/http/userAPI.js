import {$authHost, $host} from './index'
import jwt_decode from 'jwt-decode'

export const signUpPatient = async (user) => {
    const {data} = await $host.post('api/user/registration', user)
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const signUpSpecialist = async (user) => {
    const {data} = await $host.post('api/user/registration', user)
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const signIn = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const fetchUsers = async () => {
    const {data} = await $authHost.get('api/user')
    return data
}

export const deleteUser = async (id) => {
    const {data} = await $authHost.delete(`api/user/${id}`)
    return data
}

export const editUser = async (id, email, password) => {
    const {data} = await $authHost.put(`api/user/${id}`, {email, password})
    return data
}

export const getOneUser = async (id) => {
    const {data} = await $host.get(`api/user/${id}`)
    return data
}

export const editPatientProfile = async (formData) => {
    const {data} = await $authHost.put('api/user/patient/edit', formData)
    return data
}

export const editSpecialistProfile = async (formData) => {
    const {data} = await $authHost.put('api/user/specialist/edit', formData)
    return data
}