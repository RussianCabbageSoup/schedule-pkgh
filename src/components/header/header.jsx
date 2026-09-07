import { useEffect, useState } from "react";

const Header = ({ data }) => {
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const nextLessons = data
                .map(item => new Date(`${item.дата.slice(0, 10)}T${item.начало}`))
                .filter(d => d > now)
                .sort((a, b) => a - b);

            setTimeLeft(nextLessons[0] ? nextLessons[0] - now : null);
        }, 100);

        return () => clearInterval(interval);
    }, [data]);

    const getDate = () => {
        const today = new Date();
        const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

        const day = today.getDate();
        const month = today.getMonth();

        return `${day} ${months[month]}`;
    }

    const formatTime = (ms) => {
        const totalSec = Math.max(0, Math.floor(ms / 1000));
        const h = Math.floor(totalSec / 3600);
        const m = Math.floor((totalSec % 3600) / 60);
        const s = totalSec % 60;
        return `${h}ч ${m}м ${s}с`;
    }

    return (
        <div className="header">
            <div className="header__today">
                <p>Сейчас</p>
                <span>{getDate()}</span>
            </div>
            <div className="header__next-lesson">
                <p>До следующей пары</p>
                <span>{timeLeft === null ? "..." : formatTime(timeLeft)}</span>
            </div>
        </div>
    )
}

export default Header