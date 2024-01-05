import {makeAutoObservable} from 'mobx'

export default class ScheduleStore {
    constructor() {
        this._selectedVisit = null
        makeAutoObservable(this)
    }

    setSelectedVisit(selectedVisit) {
        this._selectedVisit = selectedVisit
    }
    get selectedVisit() {
        return this._selectedVisit
    }
}