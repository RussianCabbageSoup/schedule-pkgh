import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { fetchSchedule } from "../../http/schedule";
import ScheduleCard from "./scheludeCard";
import Loader from "../UI/loader/loader";

const Schedule = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getSchedule = async () => {
        setLoading(true);
        try {
            const data = await fetchSchedule();
            console.log(data);
            setData(data.rasp);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getSchedule();
    }, []);

    if (loading) {
        return <Loader />
    }

    if (error) {
        return (
            <div className="error">
                <p>Произошла ошибка: {error}</p>
                <div
                    onClick={() => window.location.reload()}
                >
                    Перезагрузить страницу
                </div>
                <p>Или</p>
                <Link to="https://pkgh.ru/">Перейти на официальный сайт</Link>
            </div>
        )
    }

    if (data !== null) {
        const grouped = {};
        data.forEach(item => {
            const key = item.дата.slice(0, 10);
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(item);
        });

        return (
            <div className="slides">
                {Object.entries(grouped).map(([date, items]) =>
                    <ScheduleCard key={date} data={items} />
                )}
            </div>
        )
    }

    return (
        <Loader />
    )
}

export default Schedule