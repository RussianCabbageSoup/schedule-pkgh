import { useEffect, useState } from "react";
import { formatTime, getCurrentDate } from "../../utils/dateUtil";
import { useAppContext } from "../../context";
import { observer } from "mobx-react-lite";

const Header = observer(() => {
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [isLesson, setIsLesson] = useState(false);

    const { schedules } = useAppContext();

    useEffect(() => {
        const interval = setInterval(() => {
            schedules.setNow(new Date());
            const currentLesson = schedules.schedules.find(item => {
                const start = new Date(item.датаНачала);
                const end = new Date(item.датаОкончания);
                return start <= schedules.now && end > schedules.now;
            });

            if (currentLesson) {
                setIsLesson(true);
                setTimeLeft(new Date(currentLesson.датаОкончания).getTime() - schedules.now.getTime());
                return;
            } else {
                setIsLesson(false);
            }

            const nextLessons = schedules.schedules
                .map(item => new Date(item.датаНачала).getTime())
                .filter(d => d > schedules.now.getTime())
                .sort((a, b) => a - b);
            setTimeLeft(nextLessons[0] ? nextLessons[0] - schedules.now.getTime() : null);
        }, 300);

        return () => clearInterval(interval);
    }, [schedules.schedules]);

    return (
        <div className="header">
            <div className="header__today">
                <p>Сейчас</p>
                <span>{getCurrentDate(schedules.now)}</span>
            </div>
            <div className={`header__next-lesson ${isLesson ? 'green-text' : ''}`}>
                {isLesson
                    ? <p>До конца пары</p>
                    : <p>До следующей пары</p>
                }
                <span>{timeLeft === null ? "..." : formatTime(timeLeft, true)}</span>
            </div>
        </div>
    )
});

export default Header