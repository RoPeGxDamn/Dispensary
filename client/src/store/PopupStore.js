import {makeAutoObservable} from 'mobx'

export default class PopupStore {
    constructor() {
        this._reviewPopupOpen = false
        this._specialistProfilePopupOpen = false
        this._editPatientProfilePopupOpen = false
        this._patientProfilePopupOpen = false
        this._outpatientCardPopupOpen = false
        this._addDiagnosisPopupOpen = false
        this._createDiagnosisPopupOpen = false
        this._editDiagnosisPopupOpen = false
        this._createAnnouncementPopupOpen = false
        this._editAnnouncementPopupOpen = false
        this._createVisitPopupOpen = false
        this._editVisitPopupOpen = false
        this._editSpecialistProfilePopupOpen = false
        this._chooseSchedulePopupOpen = false
        makeAutoObservable(this)
    }

    setReviewPopupOpen(state) {
        this._reviewPopupOpen = state
    }
    get reviewPopupOpen() {
        return this._reviewPopupOpen
    }

    setSpecialistProfilePopupOpen(state) {
        this._specialistProfilePopupOpen = state
    }
    get specialistProfilePopupOpen() {
        return this._specialistProfilePopupOpen
    }

    setEditPatientProfilePopupOpen(state) {
        this._editPatientProfilePopupOpen = state
    }
    get editPatientProfilePopupOpen() {
        return this._editPatientProfilePopupOpen
    }

    setPatientProfilePopupOpen(state) {
        this._patientProfilePopupOpen = state
    }
    get patientProfilePopupOpen() {
        return this._patientProfilePopupOpen
    }

    setCreateDiagnosisPopupOpen(state) {
        this._createDiagnosisPopupOpen = state
    }
    get createDiagnosisPopupOpen() {
        return this._createDiagnosisPopupOpen
    }

    setEditDiagnosisPopupOpen(state) {
        this._editDiagnosisPopupOpen = state
    }
    get editDiagnosisPopupOpen() {
        return this._editDiagnosisPopupOpen
    }

    setCreateAnnouncementPopupOpen(state) {
        this._createDiagnosisPopupOpen = state
    }
    get createAnnouncementPopupOpen() {
        return this._createDiagnosisPopupOpen
    }

    setCreateVisitPopupOpen(state) {
        this._createVisitPopupOpen = state
    }
    get createVisitPopupOpen() {
        return this._createVisitPopupOpen
    }

    setEditVisitPopupOpen(state) {
        this._editVisitPopupOpen = state
    }
    get editVisitPopupOpen() {
        return this._editVisitPopupOpen
    }

    setEditAnnouncementPopupOpen(state) {
        this._editDiagnosisPopupOpen = state
    }
    get editAnnouncementPopupOpen() {
        return this._editDiagnosisPopupOpen
    }

    setOutpatientCardPopupOpen(state) {
        this._outpatientCardPopupOpen = state
    }
    get outpatientCardPopupOpen() {
        return this._outpatientCardPopupOpen
    }

    setAddDiagnosisPopupOpen(state) {
        this._addDiagnosisPopupOpen = state
    }
    get addDiagnosisPopupOpen() {
        return this._addDiagnosisPopupOpen
    }

    setEditSpecialistProfilePopupOpen(state) {
        this._editSpecialistProfilePopupOpen = state
    }
    get editSpecialistProfilePopupOpen() {
        return this._editSpecialistProfilePopupOpen
    }

    setChooseSchedulePopupOpen(value) {
        this._chooseSchedulePopupOpen = value
    }

    chooseSchedulePopupOpen() {
        return this._chooseSchedulePopupOpen
    }
    
}