import axios from "axios";

const fetchSchedule = async () => {
    try {
        const today = new Date().toISOString().slice(0, 10);
        const { data } = await axios.get(`https://erp.pkgh.ru/api/Rasp?idGroup=13067&sdate=${today}`);
        return data.data;
    } catch (error) {
        throw new Error('failed get Schedule');
    }
}

export { fetchSchedule };