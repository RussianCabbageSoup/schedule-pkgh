import { makeAutoObservable } from "mobx";

export default class ScheduleStore {
    constructor() {
        this._schedules = [];
        this._week = 7;
        this._now = new Date(); // '2026-09-10T10:00:00'

        makeAutoObservable(this);
    }

    setSchedules(shedules) {
        this._schedules = shedules;
    }

    setWeek(week) {
        this._week = week;
    }

    get schedules() {
        return this._schedules;
    }

    get week() {
        return this._week;
    }

    get now() {
        return this._now
    }
}
