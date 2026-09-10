import { useContext, useState } from "react";
import { getMoscowTime } from "../../utils/dateUtil";
import ScheduleCard from "./scheludeCard";
import { Context } from "../../context";
import { fetchSchedule } from "../../http/schedule";
import Loader from "../UI/loader/loader";

const Schedule = () => {
    const today = getMoscowTime();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { schedules } = useContext(Context);


    const loadNext = async () => {
        try {
            setLoading(true);
            const data = await fetchSchedule(schedules.week);

            if (!data.rasp || data.rasp.length === 0) {
                setError('Нет данных на сделующую неделю');
                return
            }

            schedules.setSchedules([...schedules.schedules, ...data.rasp]);
            schedules.setWeek(schedules.week + 7);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const grouped = {};
    schedules.schedules.filter(item => item.дата.slice(0, 10) >= today).forEach(item => {
        const key = item.дата.slice(0, 10);
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(item);
    });

    return (
        <>
            <div className="schedule-list">
                {Object.entries(grouped).map(([date, items]) =>
                    <ScheduleCard key={date} data={items} />
                )}
            </div>
            {!error && (
                <div
                    role="button"
                    className="button"
                    onClick={loadNext}
                    disabled={loading}
                >
                    Следующая неделя
                </div>
            )}
            {error && (
                <div className="error-load">
                    {error}
                </div>
            )}
        </>
    )
}

export default Schedule