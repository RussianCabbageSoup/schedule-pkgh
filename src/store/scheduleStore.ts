import { makeAutoObservable } from "mobx";
import type { ScheduleItem } from "../http/schedule";
import { getItem } from "../utils/localStorage";

export default class ScheduleStore {
    _schedules: ScheduleItem[] = [];
    _week: number = 7;
    _now: Date = new Date(); // '2026-09-11T08:26:00'

    _showTeacher = getItem('showTeacher', true);
    _showSubject = getItem('showSubject', false);
    _showAnimation = getItem('showAnimation', true);

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

    setShowTeacher(bool: boolean) {
        this._showTeacher = bool;
        localStorage.setItem('showTeacher', String(bool));
    }

    setShowSubject(bool: boolean) {
        this._showSubject = bool;
        localStorage.setItem('showSubject', String(bool));
    }

    setShowAnimation(bool: boolean) {
        this._showAnimation = bool;
        localStorage.setItem('showAnimation', String(bool));
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

    get showTeacher(): boolean {
        return this._showTeacher;
    }

    get showSubject(): boolean {
        return this._showSubject;
    }

    get showAnimation(): boolean {
        return this._showAnimation;
    }
}
