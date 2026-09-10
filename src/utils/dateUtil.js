import { DATE } from "../constants/date";

export const getCurrentDate = (now = new Date()) => {
    const day = now.getDate();
    const month = now.getMonth();

    return `${day} ${DATE.months[month]}`;
}

export const formatTime = (ms, withSec = false) => {
    const totalSec = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);

    if (withSec) {
        const s = totalSec % 60;
        return `${h}ч ${m}м ${s}с`;
    }

    return `${h}ч ${m}м`;
}

export const convertDate = (date = '') => {
    const d = new Date(date);
    const day = d.getDate();
    const mon = d.getMonth();

    return `${day} ${DATE.months[mon]}`;
}

export const getMoscowTime = (now = new Date(), step = 0) => {
    const date = new Date(now);
    date.setDate(date.getDate() + step);

    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Europe/Moscow',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(date);
}