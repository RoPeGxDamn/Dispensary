import {$authHost, $host} from './index'

export const fetchDiagnoses = async () => {
    const {data} = await $authHost.get('api/diagnosis')
    return data
}

export const createDiagnosis = async (name, cipher) => {
    const {data} = await $authHost.post('api/diagnosis', {name, cipher})
    return data
}

export const deleteDiagnosis = async (id) => {
    const {data} = await $authHost.delete(`api/diagnosis/${id}`)
    return data
}

export const editDiagnosis = async (id, name, cipher) => {
    const {data} = await $authHost.put(`api/diagnosis/${id}`, {name, cipher})
    return data
}

export const filterDiagnosis = async (id, name, cipher) => {
    const {data} = await $authHost.post(`api/diagnosis/filter`, {id, name, cipher})
    return data
}

export const filterDiagnosesForAdmin = async (name, cipher) => {
    const {data} = await $authHost.post('api/diagnosis/filter/diagnoses', {name, cipher})
    return data
}
