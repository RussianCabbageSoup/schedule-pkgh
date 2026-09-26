import axios from "axios";
import { $authHost, $host } from ".";

const signUpMessages: Record<number, string> = {
    400: "Проверь имя и пароль",
    403: "Запрос с этого адреса запрещён",
    404: "Сервер не найден",
    409: "Пользователь с таким именем уже есть",
    422: "Пароль не подходит",
    500: "Ошибка на сервере, попробуй позже",
};

export interface UserData {
    username?: string;
}


const getErrorMessage = (error: unknown) => {
    if (!axios.isAxiosError(error)) return "Что-то пошло не так";

    if (!error.response) return "Нет связи с сервером";

    return signUpMessages[error.response.status] ?? "Что-то пошло не так";
};

export const signUp = async (username: string, password: string): Promise<UserData> => {
    try {
        const { data } = await $host.post('/api/user/sign-up', {
            username,
            password
        });
        return data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const checkAuth = async (): Promise<UserData> => {
    try {
        const { data } = await $authHost.get('/api/user/me/auth');
        return data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};
