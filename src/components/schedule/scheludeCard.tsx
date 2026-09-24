import ScheludeCardItem from "./scheludeCardItem";
import { convertDate, formatTime } from "../../utils/dateUtil";
import { useAppContext } from "../../context";
import { observer } from "mobx-react-lite";
import type { ScheduleItem } from "../../http/schedule";

type ScheduleCardProps = {
    data: ScheduleItem[];
    todayFinished: boolean;
}

const ScheduleCard = observer(({ data, todayFinished }: ScheduleCardProps) => {
    const { schedules } = useAppContext();

    const now = schedules.now;

    const first = data[0];
    if (!first) return null;

    const firstLesson = Math.min(...data.map(item =>
        new Date(item.датаНачала).getTime()
    ));

    const lastLesson = Math.max(...data.map(item =>
        new Date(item.датаОкончания).getTime()
    ));

    const isCurrentDay = new Date(first.дата).getTime() < now.getTime();
    const isLessonsStart = new Date(firstLesson) < now;
    const isFinished = now > new Date(lastLesson);

    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const isNextDay = new Date(first.дата).toDateString() === tomorrow.toDateString();

    return (
        <div
            className={`schedule ${isFinished ?
                'day-end' : ''} ${isCurrentDay ?
                    'current-day-card' : isNextDay && todayFinished ?
                        'next-day-card' : 'another-day-card'}`}
        >
            <div className="schedule__title">
                <div className="schedule__title-date">
                    <p>{convertDate(first.дата)}</p>
                </div>
                <div className="schedule__title-class">
                    {first.день_недели}
                </div>
                {isCurrentDay && isLessonsStart
                    ? <div className={`schedule__title-remaining ${isFinished ? 'time-green' : 'time-red'}`}>
                        Осталось
                        <span>{formatTime(lastLesson - now.getTime())}</span>
                    </div>

                    : isCurrentDay && !isLessonsStart
                        ? <div className={`schedule__title-remaining ${isFinished ? 'time-green' : 'time-red'}`}>
                            До начала
                            <span>{formatTime(firstLesson - now.getTime())}</span>
                        </div>
                        : isNextDay && todayFinished && (
                            <div className={`schedule__title-remaining ${isFinished ? 'time-green' : 'time-red'}`}>
                                До начала
                                <span>{formatTime(firstLesson - now.getTime())}</span>
                            </div>
                        )
                }
            </div>
            <div className={`separator ${isCurrentDay ? 'current-day-separator' : ''}`}></div>
            <div className="schedule__body">
                {data.map(item =>
                    <ScheludeCardItem key={item.код} item={item} />
                )}
            </div>
        </div>
    )
});

export default ScheduleCard;
