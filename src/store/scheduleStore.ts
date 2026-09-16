import { makeAutoObservable } from "mobx";
import type { ScheduleItem } from "../http/schedule";

export default class ScheduleStore {
    _schedules: ScheduleItem[] = [];
    _week: number = 7;
    _now: Date = new Date(); //'2026-09-11T08:26:00'

    constructor() {
        makeAutoObservable(this);
    }

    setSchedules(shedules: ScheduleItem[]): void {
        this._schedules = shedules;
    }

    setWeek(week: number): void {
        this._week = week;
    }

    setNow(date: Date): void {
        this._now = date;
    }

    get schedules(): ScheduleItem[] {
        return this._schedules;
    }

    get week(): number {
        return this._week;
    }

    get now(): Date {
        return this._now
    }
}
