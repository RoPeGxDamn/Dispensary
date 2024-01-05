import {makeAutoObservable} from 'mobx'

export default class AuthStore {
    constructor() {
        this._isAuthenticated = false
        this._user = {}
        this._patient = null
        this._specialist = null
        makeAutoObservable(this)
    }

    setIsAuthenticated(bool) {
        this._isAuthenticated = bool
    }

    setUser(user) {
        this._user = user
    }

    setPatient(patient) {
        this._patient = patient
    }

    setSpecialist(specialist) {
        this._specialist = specialist
    }

    get isAuthenticated() {
        return this._isAuthenticated
    }

    get user() {
        return this._user
    }

    get patient() {
        return this._patient
    }

    get specialist() {
        return this._specialist
    }
}