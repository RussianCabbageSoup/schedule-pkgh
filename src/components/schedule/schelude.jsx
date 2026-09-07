import ScheduleCard from "./scheludeCard";

const Schedule = ({ data }) => {
    const grouped = {};
    data.forEach(item => {
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