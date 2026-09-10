import { makeAutoObservable } from "mobx";

export default class ScheduleStore {
    constructor() {
        this._schedules = [];
        this._week = 7;
        this._now = new Date();

        makeAutoObservable(this);
    }

    setSchedules(shedules) {
        this._schedules = shedules;
    }

    setWeek(week) {
        this._week = week;
    }

    setNow(date) {
        this._now = date; //this._now = new Date(date); this._now.setMinutes(this._now.getMinutes() + 504);
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
