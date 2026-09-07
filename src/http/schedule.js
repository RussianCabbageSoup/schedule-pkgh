import axios from "axios";

const fetchSchedule = async () => {
    try {
        const today = new Intl.DateTimeFormat('en-CA', {
            timeZone: 'Europe/Moscow',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(new Date());
        console.log(today);
        const { data } = await axios.get(`https://erp.pkgh.ru/api/Rasp?idGroup=13067&sdate=${today}`);
        return data.data;
    } catch (error) {
        throw new Error('failed get Schedule');
    }
}

export { fetchSchedule };