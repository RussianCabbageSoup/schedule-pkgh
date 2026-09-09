const ScheludeCardItem = ({ item }) => {
    const now = new Date();

    const isFinished = now >= new Date(item.датаОкончания);

    const isLesson = new Date(item.датаНачала) < now
        && new Date(item.датаОкончания) > now

    const isQueue = new Date(item.датаНачала) > now
        && new Date(item.датаНачала) <= new Date(now.getTime() + 30 * 60 * 1000);

    return (
        <div className={`lesson__item ${isFinished ? 'lesson-end' : isLesson ? 'lesson-process' : isQueue ? 'lesson-wait' : ''}`} key={item.код}>
            <div className="schedule__body-start">{item.начало}-</div>
            <div className="schedule__body-end">{item.конец}:</div>
            <div className="schedule__body-classroom">
                <p>{item.аудитория} каб.</p>
                <p>{item.преподаватель}</p>
            </div>
        </div>
    )
}

export default ScheludeCardItem;