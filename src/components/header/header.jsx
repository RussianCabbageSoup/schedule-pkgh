import { useContext, useEffect, useState } from "react";
import { formatTime, getCurrentDate } from "../../utils/dateUtil";
import { Context } from "../../context";

const Header = () => {
    const [timeLeft, setTimeLeft] = useState(null);

    const { schedules } = useContext(Context);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const nextLessons = schedules.schedules
                .map(item => new Date(`${item.дата.slice(0, 10)}T${item.начало}`))
                .filter(d => d > now)
                .sort((a, b) => a - b);
            setTimeLeft(nextLessons[0] ? nextLessons[0] - now : null);
        }, 100);

        return () => clearInterval(interval);
    }, [schedules.schedules]);

    return (
        <div className="header">
            <div className="header__today">
                <p>Сейчас</p>
                <span>{getCurrentDate()}</span>
            </div>
            <div className="header__next-lesson">
                <p>До следующей пары</p>
                <span>{timeLeft === null ? "..." : formatTime(timeLeft)}</span>
            </div>
        </div>
    )
}

export default Header