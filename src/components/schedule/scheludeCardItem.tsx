import { observer } from "mobx-react-lite";
import { useAppContext } from "../../context";
import type { ScheduleItem } from "../../http/schedule";

type ScheduleCardItemProps = {
    item: ScheduleItem;
};

const ScheludeCardItem = observer(({ item }: ScheduleCardItemProps) => {
    const { schedules } = useAppContext();

    const now = schedules.now;

    const isFinished = now >= new Date(item.датаОкончания);

    const isLesson = schedules.showAnimation 
        && new Date(item.датаНачала) < now
        && new Date(item.датаОкончания) > now;

    const isQueue = schedules.showAnimation 
        && new Date(item.датаНачала) > now
        && new Date(item.датаНачала) <= new Date(now.getTime() + 30 * 60 * 1000);

    return (
        <div
            className={`lesson__item ${isFinished ?
                'lesson-end' : isLesson ?
                    'lesson-process' : isQueue ?
                        'lesson-wait' : ''}`}
        >
            <div className="schedule__body-start">{item.начало}-</div>
            <div className="schedule__body-end">{item.конец}:</div>
            <div className="schedule__body-classroom">
                <p>{item.аудитория} каб.</p>
                {schedules.showTeacher && (
                    <p>{item.преподаватель}</p>
                )}
                {schedules.showSubject && (
                    <p>{item.дисциплина}</p>
                )}
            </div>
        </div>
    )
});

export default ScheludeCardItem;