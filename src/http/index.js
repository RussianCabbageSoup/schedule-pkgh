import axios from "axios";

const $host = axios.create({
    baseURL: 'https://erp.pkgh.ru/api/Rasp?idGroup=13067&sdate=2026-09-07',
    timeout: 10000 
});

export { $host };