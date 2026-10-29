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
    дисциплина: string;
}

export interface ApiResponse {
    rasp: ScheduleItem[];
}

interface fetchScheduleArg {
    now: Date,
    step?: number,
    useProxy: boolean
}

const fetchSchedule = async ({ now = new Date(), step = 0, useProxy = true }: fetchScheduleArg): Promise<ApiResponse> => {
    try {
        const day = getMoscowTime(now, step);
        if (useProxy) {
            const { data } = await axios.get(`${import.meta.env.VITE_CLIENT_URL}api/schedules`, {
                params: { day },
            });
            return data.data;
        } else {
            const { data } = await axios.get(import.meta.env.VITE_PKGH_URL + `${day}`, {
                timeout: 10000
            });
            return data.data;
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
            throw new Error('Превышено время ожидания (10 сек). Попробуйте ещё раз или смените прокси');
        }
        throw new Error(`Ошибка загрузки расписания: ${error instanceof Error ? error.message : ''}`);
    }
}

export { fetchSchedule };   