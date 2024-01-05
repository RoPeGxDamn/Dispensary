import {makeAutoObservable} from 'mobx'

export default class DataGridStore {
    constructor() {
        this._selectedRow = {}
        this._selectedRowCount = 0 
        this._arrayOfId = []
        makeAutoObservable(this)
    }

    setSelectedRow(selectedRow) {
        this._selectedRow = selectedRow
    }

    setSelectedRowCount(selectedRowCount) {
        this._selectedRowCount = selectedRowCount
    }

    setArrayOfId(arrayOfId) {
        this._arrayOfId = arrayOfId
    }
    get selectedRow() {
        return this._selectedRow
    }

    get selectedRowCount() {
        return this._selectedRowCount
    }

    get arrayOfId() {
        return this._arrayOfId
    }
}