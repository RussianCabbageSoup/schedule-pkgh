import { useContext, useEffect, useRef, useState } from "react";
import { getMoscowTime } from "../../utils/dateUtil";
import ScheduleCard from "./scheludeCard";
import { Context } from "../../context";
import { fetchSchedule } from "../../http/schedule";

const Schedule = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pendingScroll, setPendingScroll] = useState(null);

    const listRef = useRef(null);

    const { schedules } = useContext(Context);

    const now = schedules.now;
    const isSunday = now.getDay() === 0;
    const today = getMoscowTime(now);

    const grouped = {};
    schedules.schedules.filter(item => item.дата.slice(0, 10) >= today).forEach(item => {
        const key = item.дата.slice(0, 10);
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(item);
    });

    const loadNext = async () => {
        const prevCount = Object.keys(grouped).length;
        setPendingScroll(prevCount);
        try {
            setLoading(true);
            const data = await fetchSchedule(schedules.now, schedules.week);

            if (!data.rasp || data.rasp.length === 0) {
                setError('Нет данных на следующую неделю');
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

    const todayItems = grouped[today];
    const todayFinished = todayItems
        ? now > new Date(Math.max(...todayItems.map(i => new Date(i.датаОкончания))))
        : isSunday;

    useEffect(() => {
        if(!loading && pendingScroll !== null) {
            requestAnimationFrame(() => {
                listRef.current?.children[pendingScroll]?.scrollIntoView({
                    behavior: 'smooth', 
                    block: 'center',
                });
                setPendingScroll(null);
            });
        }
    }, [loading, pendingScroll]);

    return (
        <>
            <div className="schedule-list" ref={listRef}>
                {Object.entries(grouped).map(([date, items]) =>
                    <ScheduleCard
                        key={date}
                        data={items}
                        todayFinished={todayFinished}
                    />
                )}
            </div>
            {error
                ? <div className="error-load">
                    {error}
                </div>
                : loading
                    ? <div className="loading-btn"></div>
                    :
                    <div
                        role="button"
                        className="button"
                        onClick={loadNext}
                        disabled={loading}
                    >
                        Следующая неделя
                    </div>
            }
        </>
    )
}

export default Schedule