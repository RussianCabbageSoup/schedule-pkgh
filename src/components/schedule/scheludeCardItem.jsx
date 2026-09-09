const ScheludeCardItem = ({ item }) => {
    const now = new Date();

    const isPass = now >= new Date(item.датаОкончания);

    const isLesson = new Date(item.датаНачала) < now
        && new Date(item.датаОкончания) > now

    const isQueue = new Date(item.датаНачала) > now
        && new Date(item.датаНачала) <= new Date(now.getTime() + 30 * 60 * 1000);

    return (
        <div className={`card__lesson ${isPass ? 'pass' : isLesson ? 'lesson' : isQueue ? 'queue' : ''}`} key={item.код}>
            <div className="card__body-begin">{item.начало} - </div>
            <div className="card__body-end">{item.конец}:</div>
            <div className="card__body-class">
                <p>{item.аудитория} каб.</p>
            </div>
        </div>
    )
}

export default ScheludeCardItem;