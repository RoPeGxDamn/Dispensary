import {makeAutoObservable} from 'mobx'

export default class AdminStore {
    constructor() {
        this._users = []
        this._patients = []
        this._specialists = []
        this._visits = []
        this._diagnoses = []
        this._cards = []
        this._tickets = []
        this._feedback = []
        this._announcements = []
        this._specialties = [
            {id: 1, name: 'Врач лабораторной диагностики'},
            {id: 2, name: 'Врач-дерматовенеролог'}
        ]
        this._roles = [
            {id: 1, name: 'Специалист', value: 'SPECIALIST'},
            {id: 2, name: 'Пациент', value: 'PATIENT'}
        ]
        this._gender = [
            {id: 1, name: 'мужской'},
            {id: 2, name: 'женский'},
            {id: 3, name: 'другое'}
          ]
        this._disabilityGroups = [
            {id: 1, name: 'отсутствует'},
            {id: 2, name: '1-я группа'},
            {id: 3, name: '2-я группа'},
            {id: 4, name: '3-я группа'},
        ] 
        makeAutoObservable(this)
    }

    setUsers(users) {
        this._users = users
    }
    get users() {
        return this._users
    }

    setAnnouncements(value) {
        this._announcements = value
    }
    get announcements() {
        return this._announcements
    }

    setRoles(roles) {
        this._roles = roles
    }
    get roles() {
        return this._roles
    }

    setFeedback(feedback) {
        this._feedback = feedback
    }
    get feedback() {
        return this._feedback
    }

    setPatients(patients) {
        this._patients = patients
    }
    get patients() {
        return this._patients
    }

    setSpecialists(specialists) {
        this._specialists = specialists
    }
    get specialists() {
        return this._specialists
    }

    setVisits(visits) {
        this._visits = visits
    }
    get visits() {
        return this._visits
    }

    setTickets(tickets) {
        this._tickets = tickets
    }
    get tickets() {
        return this._tickets
    }

    setDiagnoses(diagnoses) {
        this._diagnoses = diagnoses
    }
    get diagnoses() {
        return this._diagnoses
    }

    setSpecialties(specialties) {
        this._specialties = specialties
    }
    get specialties() {
        return this._specialties
    }

    setGender(gender) {
        this._gender = gender
    }
    get gender() {
        return this._gender
    }

    setDisabilityGroups(groups) {
        this._disabilityGroups = groups
    }
    get disabilityGroups() {
        return this._disabilityGroups
    }
}