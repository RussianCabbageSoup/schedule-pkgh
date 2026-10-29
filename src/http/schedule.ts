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
        let reason = '';

        if (axios.isAxiosError(error)) {
            if (error.response) {
                const { status, statusText, data } = error.response;
                const serverMessage = data && typeof data === 'object'
                    ? (data.message ?? data.error)
                    : undefined;

                reason = `сервер ответил HTTP ${status}${statusText ? ` ${statusText}` : ''}`;
                if (typeof serverMessage === 'string' && serverMessage) {
                    reason += `, ответ сервера: ${serverMessage}`;
                }
            } else if (error.code === 'ECONNABORTED') {
                const timeout = error.config?.timeout;
                reason = `превышено время ожидания ответа${timeout ? ` (${timeout} мс)` : ''}`;
            } else {
                reason = `нет связи с сервером или запрос заблокирован (код: ${error.code ?? 'неизвестен'})`;
            }
        } else {
            reason = `непредвиденная ошибка: ${error instanceof Error ? `${error.name}: ${error.message}` : String(error)}`;
        }

        const toSingleLine = (value: string) => value.replace(/\s+/g, ' ').trim();
        const origin = typeof window !== 'undefined' ? window.location.origin : 'не определён';
        const details = [
            `Причина: ${reason}`,
            `Источник: ${source}`,
            `Адрес: ${requestUrl || 'не определён'}`,
            `Origin: ${origin}`,
        ].map(toSingleLine);

        throw new Error(
            `Ошибка загрузки расписания\n${details.join('\n')}`,
            { cause: error },
        );
    }
}

export { fetchSchedule };   