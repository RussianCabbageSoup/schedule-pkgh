import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

const apiURL = import.meta.env.VITE_API_URL || '';  // прокси (только для Vercel)

const $host = axios.create({
    baseURL: apiURL,
    withCredentials: true
});

const $authHost = axios.create({
    baseURL: apiURL,
    withCredentials: true
});

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let refreshPromise: Promise<AxiosResponse> | null = null;

const errorInterceptor = async (error: AxiosError) => {
    const originalRequest = error.config as RetriableConfig | undefined;

    if (error.response?.status !== 401 || !originalRequest || originalRequest._retry) {
        return Promise.reject(error);
    }

    if (!refreshPromise) {
        refreshPromise = $host.post('api/user/refresh')
            .finally(() => { refreshPromise = null; });
    }

    try {
        await refreshPromise;
        originalRequest._retry = true;        
        return $authHost(originalRequest);
    } catch (err) {
        return Promise.reject(err);
    }
};

$authHost.interceptors.response.use(
    (response) => response,
    errorInterceptor
);

export { $host, $authHost };