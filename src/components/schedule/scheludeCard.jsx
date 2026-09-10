import { useContext, useEffect, useState } from "react";
import ScheludeCardItem from "./scheludeCardItem";
import { convertDate, formatTime } from "../../utils/dateUtil";
import { Context } from "../../context";
import { observer } from "mobx-react-lite";

const ScheduleCard = observer(({ data, todayFinished }) => {
    const { schedules } = useContext(Context);

    const now = schedules.now;

    const firstLesson = Math.min(...data.map(item =>
        new Date(item.датаНачала)
    ));

    const lastLesson = Math.max(...data.map(item =>
        new Date(item.датаОкончания)
    ));

    const isCurrentDay = new Date(data[0].дата) < now;
    const isLessonsStart = new Date(firstLesson) < now;
    const isFinished = now > new Date(lastLesson);

    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const isNextDay = new Date(data[0].дата).toDateString() === tomorrow.toDateString();

    return (
        <div
            className={`schedule ${isFinished ?
                'day-end' : ''}  ${isCurrentDay ?
                    'current-day-card' : 'another-day-card'}`}
        >
            <div className="schedule__title">
                <div className="schedule__title-date">
                    <p>{convertDate(data[0].дата)}</p>
                </div>
                <div className="schedule__title-class">
                    {data[0].день_недели}
                </div>
                {isCurrentDay && isLessonsStart
                    ? <div className={`schedule__title-remaining ${isFinished ? 'time-green' : 'time-red'}`}>
                        Осталось
                        <span>{formatTime(lastLesson - now)}</span>
                    </div>

                    : isCurrentDay && !isLessonsStart
                        ? <div className={`schedule__title-remaining ${isFinished ? 'time-green' : 'time-red'}`}>
                            До начала
                            <span>{formatTime(firstLesson - now)}</span>
                        </div>
                        : isNextDay && todayFinished && (
                            <div className={`schedule__title-remaining ${isFinished ? 'time-green' : 'time-red'}`}>
                                До начала
                                <span>{formatTime(firstLesson - now)}</span>
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
