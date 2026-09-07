import ScheduleCard from "./scheludeCard";

const Schedule = ({ data }) => {
    const today = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Europe/Moscow',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(new Date());

    const grouped = {};
    data.filter(item => item.дата.slice(0, 10) >= today).forEach(item => {
        const key = item.дата.slice(0, 10);
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(item);
    });

    return (
        <div className="slides">
            {Object.entries(grouped).map(([date, items]) =>
                <ScheduleCard key={date} data={items} />
            )}
        </div>
    )
}

export default Schedule