import { getMoscowTime } from "../../utils/dateUtil";
import ScheduleCard from "./scheludeCard";

const Schedule = ({ data }) => {
    const today = getMoscowTime();

    const grouped = {};
    data.filter(item => item.дата.slice(0, 10) >= today).forEach(item => {
        const key = item.дата.slice(0, 10);
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(item);
    });

    return (
        <div className="schedule-list">
            {Object.entries(grouped).map(([date, items]) =>
                <ScheduleCard key={date} data={items} />
            )}
        </div>
    )
}

export default Schedule