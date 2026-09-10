import { DATE } from "../constants/date";

export const getCurrentDate = () => {
    const today = new Date();

    const day = today.getDate();
    const month = today.getMonth();

    return `${day} ${DATE.months[month]}`;
}

export const formatTime = (ms) => {
    const totalSec = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${h}ч ${m}м`;
}

export const convertDate = (date = '') => {
    const d = new Date(date);
    const day = d.getDate();
    const mon = d.getMonth();

    return `${day} ${DATE.months[mon]}`;
}

export const getMoscowTime = (step = 0) => {
    const now = new Date();
    now.setDate(now.getDate() + step);

    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Europe/Moscow',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(now);
}
