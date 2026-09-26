import { useEffect, useRef, useState } from "react";
import { getMoscowTime } from "../../utils/dateUtil";
import ScheduleCard from "./scheludeCard";
import { useAppContext } from "../../context";
import { fetchSchedule, type ScheduleItem } from "../../http/schedule";
import { observer } from "mobx-react-lite";
import Loader from "../UI/loader/loader";

const Schedule = observer(() => {
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pendingScroll, setPendingScroll] = useState<number | null>(null);

    const listRef = useRef<HTMLDivElement | null>(null);

    const { schedules } = useAppContext();

    const now = schedules.now;
    const isSunday = now.getDay() === 0;
    const today = getMoscowTime(now);

    const grouped: Record<string, ScheduleItem[]> = {};
    
    schedules.schedules.filter(item => item.дата.slice(0, 10) >= today).forEach(item => {
        const key = item.дата.slice(0, 10);
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(item);
    });

    const loadInitial = async () => {
        setInitialLoading(true);
        setError(null);
        try {
            const data = await fetchSchedule(schedules.now);

            if (!data.rasp) {
                setError('Не удалось загрузить расписание');
                return
            }

            schedules.setSchedules(data.rasp);
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
        } finally {
            setInitialLoading(false);
        }
    }

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
            setError(error instanceof Error ? error.message : String(error));
        } finally {
            setLoading(false);
        }
    }

    const todayItems = grouped[today];
    const todayFinished = todayItems
        ? now > new Date(Math.max(...todayItems.map(i => new Date(i.датаОкончания).getTime())))
        : isSunday;

    useEffect(() => {
        loadInitial();
    }, []);

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
            {initialLoading
                ? <div className="loader-screen">
                    <Loader />
                </div>
                : <>
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
                            {schedules.schedules.length === 0
                                ? <div style={{ width: '100%', display: 'flex' }}>
                                    <button
                                        className="button"
                                        onClick={loadInitial}
                                    >
                                        Повторить
                                    </button>
                                </div>
                                : null
                            }
                        </div>
                        : loading
                            ? <div className="loading-btn"></div>
                            :
                            <div style={{ width: '100%', display: 'flex' }}>
                                <button
                                    className="button"
                                    onClick={loadNext}
                                    disabled={loading}
                                >
                                    Следующая неделя
                                </button>
                            </div>
                    }
                </>
            }
        </>
    )
});

export default Schedule