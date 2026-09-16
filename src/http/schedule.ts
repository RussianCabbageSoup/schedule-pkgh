import axios from "axios";
import { getMoscowTime } from "../utils/dateUtil";

export interface ScheduleItem {
    дата: string;
    датаНачала: string;
    датаОкончания: string;
    день_недели: string;
    код: number;
    начало: string;
    конец: string;
    аудитория: string;
    преподаватель: string;
}

export interface ApiResponse {
    rasp: ScheduleItem[];
}

const fetchSchedule = async (now: Date = new Date(), step: number = 0): Promise<ApiResponse> => {
    try {
        const day = getMoscowTime(now, step);
        const { data } = await axios.get(import.meta.env.VITE_API_URL + `${day}`);
        return data.data;
    } catch (error) {
        throw new Error('Произошла ошибка');
    }
}

export { fetchSchedule };