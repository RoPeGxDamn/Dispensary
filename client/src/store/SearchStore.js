import { makeAutoObservable } from "mobx";

export default class SearchStore {
  constructor() {
    this._searchStatus = false;
    makeAutoObservable(this);
  }

  setSearchStatus(value) {
    this._patientFullName = value;
  }
  get searchStatus() {
    return this._patientFullName;
  }
}
