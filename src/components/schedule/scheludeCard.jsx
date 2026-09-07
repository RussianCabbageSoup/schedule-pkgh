import { useEffect, useState } from "react";
import ScheludeCardItem from "./scheludeCardItem";

const ScheduleCard = ({ data }) => {
    const convertDate = (date) => {
        const d = new Date(date);
        const day = d.getDate();
        const mon = d.getMonth();

        const mouths = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

        return `${day} ${mouths[mon]}`;
    }

    const isTomorrow = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return new Date(data[0].дата).toDateString() === tomorrow.toDateString();
    }

    return (
        <div className="card">
            <div className="card__head">
                <div className="card__head-date">
                    {isTomorrow()
                        ? <p>{convertDate(data[0].дата)} (Завтра)</p>
                        : <p>{convertDate(data[0].дата)}</p>
                    }
                </div>
                <div className="card__head-class">
                    {data[0].день_недели}
                </div>
            </div>
            <div className="separator"></div>
            <div className="card__body">
                {data.map(item =>
                    <ScheludeCardItem key={item.код} item={item} />
                )}
            </div>
        </div>
    )
}

export default ScheduleCard;
