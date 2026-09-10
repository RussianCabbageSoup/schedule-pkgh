import { useContext, useEffect, useState } from "react";
import { formatTime, getCurrentDate } from "../../utils/dateUtil";
import { Context } from "../../context";

const Header = () => {
    const [timeLeft, setTimeLeft] = useState(null);
    const [isLesson, setIsLesson] = useState(false);

    const { schedules } = useContext(Context);
    const now = schedules.now;

    useEffect(() => {
        const interval = setInterval(() => {
            const currentLesson = schedules.schedules.find(item => {
                const start = new Date(item.датаНачала);
                const end = new Date(item.датаОкончания);
                return start <= now && end > now;
            });

            if (currentLesson) {
                setIsLesson(true);
                setTimeLeft(new Date(currentLesson.датаОкончания) - now);
                return;
            } else {
                setIsLesson(false);
            }

            const nextLessons = schedules.schedules
                .map(item => new Date(item.датаНачала))
                .filter(d => d > now)
                .sort((a, b) => a - b);
            setTimeLeft(nextLessons[0] ? nextLessons[0] - now : null);
        }, 300);

        return () => clearInterval(interval);
    }, [schedules.schedules]);

    return (
        <div className="header">
            <div className="header__today">
                <p>Сейчас</p>
                <span>{getCurrentDate(now)}</span>
            </div>
            <div className={`header__next-lesson ${isLesson ? 'green-text' : ''}`}>
                {isLesson
                    ? <p>До конца пары</p>
                    : <p>До следующей пары</p>
                }
                <span>{timeLeft === null ? "..." : formatTime(timeLeft)}</span>
            </div>
        </div>
    )
}

export default Header