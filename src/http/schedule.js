import axios from "axios";
import { getMoscowTime } from "../utils/dateUtil";

const fetchSchedule = async (step = 0) => {
    try {
        const day = getMoscowTime(step);
        const { data } = await axios.get(import.meta.env.VITE_API_URL + `${day}`);
        return data.data;
    } catch (error) {
        throw new Error('Произошла ошибка');
    }
}

export { fetchSchedule };