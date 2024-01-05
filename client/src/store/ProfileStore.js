import {makeAutoObservable} from 'mobx'

export default class ProfileStore {

    constructor() {
        this._formData = {}
        this._photoForDB = null
        this._photoFromDevice = false
        makeAutoObservable(this)
    }

    setFormData(formData) {
        this._formData = formData
    }

    get formData() {
        return this._formData
    }

    setPhotoForDB(photo) {
        this._photoForDB = photo
    }

    get photoForDB() {
        return this._photoForDB
    }

    setPhotoFromDevice(state) {
        this._photoFromDevice = state
    }

    get photoFromDevice() {
        return this._photoFromDevice
    }
    
}