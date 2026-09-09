import { useEffect, useState } from "react";
import ScheludeCardItem from "./scheludeCardItem";
import { convertDate, formatTime } from "../../utils/dateUtil";

const ScheduleCard = ({ data }) => {
    const now = new Date();
    const dayEnd = Math.max(...data.map(item =>
        new Date(`${item.дата.slice(0, 10)}T${item.конец}`)
    ));

    const isFinished = now > new Date(dayEnd);
    const isCurrentDay = new Date(data[0].дата) < now

    return (
        <div className={`schedule ${isFinished ? 'day-end' : ''} ${isCurrentDay ? 'current-day-card' : 'another-day-card'}`}>
            <div className="schedule__title">
                <div className="schedule__title-date">
                    <p>{convertDate(data[0].дата)}</p>
                </div>
                <div className="schedule__title-class">
                    {data[0].день_недели}
                </div>
                {isCurrentDay && (
                    <div className={`schedule__title-remaining ${isFinished ? 'time-green' : 'time-red'}`}>
                        Осталось
                        <span>{formatTime(dayEnd - now)}</span>
                    </div>
                )}
            </div>
            <div className={`separator ${isCurrentDay ? 'current-day-separator' : ''}`}></div>
            <div className="schedule__body">
                {data.map(item =>
                    <ScheludeCardItem key={item.код} item={item} />
                )}
            </div>
        </div>
    )
}

export default ScheduleCard;
