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
    const source = useProxy ? 'через прокси' : 'напрямую с сайта ПКГХ';
    let day = '';
    let requestUrl = '';

    try {
        day = getMoscowTime(now, step);
        requestUrl = useProxy
            ? `${import.meta.env.VITE_CLIENT_URL}api/schedules`
            : `${import.meta.env.VITE_PKGH_URL}${day}`;

        const { data } = await axios.get(requestUrl, useProxy
            ? { params: { day } }
            : { timeout: 10000 });

        return data.data;
    } catch (error) {
        const details = [
            `источник: ${source}`,
            `дата: ${day || 'не определена'}`,
            `адрес: ${requestUrl || 'не определён'}`,
        ];

        if (axios.isAxiosError(error)) {
            if (error.response) {
                const { status, statusText, data } = error.response;
                const serverMessage = data && typeof data === 'object'
                    ? (data.message ?? data.error)
                    : undefined;

                details.push(`HTTP ${status}${statusText ? ` ${statusText}` : ''}`);
                if (typeof serverMessage === 'string' && serverMessage) {
                    details.push(`ответ сервера: ${serverMessage}`);
                }
            } else if (error.code === 'ECONNABORTED') {
                const timeout = error.config?.timeout;
                throw new Error(
                    `Превышено время ожидания ответа${timeout ? ` (${timeout} мс)` : ''}. `
                    + `Проверьте соединение и повторите попытку (${details.join(', ')})`,
                    { cause: error },
                );
            } else {
                details.push(
                    `нет связи с сервером или запрос заблокирован `
                    + `(код: ${error.code ?? 'неизвестен'})`,
                );
            }
        } else {
            details.push(
                `непредвиденная ошибка: ${error instanceof Error ? `${error.name}: ${error.message}` : String(error)}`,
            );
        }

        throw new Error(`Ошибка загрузки расписания (${details.join(', ')})`, { cause: error });
    }
}

export { fetchSchedule };   