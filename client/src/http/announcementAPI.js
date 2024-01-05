import {$authHost, $host} from './index'

export const fetchAnnouncements = async () => {
    const {data} = await $authHost.get('api/announcement')
    return data
}

export const getAnnouncementsForReader = async (reader) => {
    const {data} = await $authHost.post('api/announcement/ads', {reader})
    return data
}

export const createAnnouncement = async (title, message, reader) => {
    const {data} = await $authHost.post('api/announcement', {title, message, reader})
    return data
}

export const deleteAnnouncement = async (id) => {
    const {data} = await $authHost.delete(`api/announcement/${id}`)
    return data
}

export const editAnnouncement = async (id, title, message, reader) => {
    const {data} = await $authHost.put(`api/announcement/${id}`, {title, message, reader})
    return data
}

export const filterAnnouncements = async (title, message, reader) => {
    const {data} = await $authHost.post(`api/announcement/filter`, {title, message, reader})
    return data
}
