import {makeAutoObservable} from 'mobx'

export default class BasketStore {
    constructor() {
        this._selectedType = null
        this._selectedDate = null
        this._selectedTime = null
        this._name = null
        makeAutoObservable(this)
    }

    setSelectedType(type) {
        this._selectedType = type
    }

    get selectedType() {
        return this._selectedType
    }

    setSelectedDate(date) {
        this._selectedDate = date
    }

    get selectedDate() {
        return  this._selectedDate
    }

    setSelectedTime(time) {
        this._selectedTime  = time
    }

    get selectedTime() {
        return this._selectedTime
    }

    setName(name) {
        this._name = name
    }

    get name() {
        return this._name
    }

}