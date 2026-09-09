import { useEffect, useState } from "react";
import ScheludeCardItem from "./scheludeCardItem";
import { convertDate, formatTime } from "../../utils/dateUtil";

const ScheduleCard = ({ data }) => {
    const now = new Date();
    const dayEnd = Math.max(...data.map(item =>
        new Date(`${item.дата.slice(0, 10)}T${item.конец}`)
    ));

    const isPass = now > new Date(dayEnd);
    const isCurrentDay = new Date(data[0].дата) < now

    return (
        <div className={`card ${isPass ? 'pass-card' : ''} ${isCurrentDay ? 'current-day-card' : 'another-day-card'}`}>
            <div className="card__head">
                <div className="card__head-date">
                    <p>{convertDate(data[0].дата)}</p>
                </div>
                <div className="card__head-class">
                    {data[0].день_недели}
                </div>
                {isCurrentDay && (
                    <div className={`card__head-left ${isPass ? 'time-green' : 'time-red'}`}>
                        Осталось
                        <span>{formatTime(dayEnd - now)}</span>
                    </div>
                )}
            </div>
            <div className={`separator ${isCurrentDay ? 'current-day-separator' : ''}`}></div>
            <div className="card__body">
                {data.map(item =>
                    <ScheludeCardItem key={item.код} item={item} />
                )}
            </div>
        </div>
    )
}

export default ScheduleCard;
