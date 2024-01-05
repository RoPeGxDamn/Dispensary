import {makeAutoObservable} from 'mobx'

export default class TicketStore {

    constructor() {
        this._specialist = null
        this._specialty = null
        this._visitDate = null
        this._visitTime = null
        this._allTickets = []
        this._orderedTickets = []
        this._editMode = false
        makeAutoObservable(this)
    }

    setVisitDate(visitDate) {
        this._visitDate = visitDate
    }
    get visitDate() {
        return this._visitDate
    }

    setVisitTime(visitTime) {
        this._visitTime = visitTime
    }
    get visitTime() {
        return this._visitTime
    }

    setSpecialist(specialist) {
        this._specialist = specialist
    }
    get specialist() {
        return this._specialist
    }

    setSpecialty(specialty) {
        this._specialty = specialty
    }
    get specialty() {
        return this._specialty
    }

    setEditMode(editMode) {
        this._editMode = editMode
    }

    get editMode() {
        return this._editMode
    }

    setAllTickets(tickets) {
        this._allTickets  = tickets
    }

    get allTickets() {
        return this._allTickets
    }

    setOrderedTickets(tickets) {
        this._orderedTickets = tickets
    }

    get orderedTickets() {
        return this._orderedTickets
    }

}