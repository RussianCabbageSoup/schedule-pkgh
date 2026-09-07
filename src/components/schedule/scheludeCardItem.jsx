const ScheludeCardItem = ({ item }) => {
    let group;
    if (item.дисциплина === 'лаб Проектирование и разработка веб-приложений, п/г 1') {
        group = 'Группа 1'
    }

    if (item.дисциплина === 'лаб Проектирование и разработка веб-приложений, п/г 2') {
        group = 'Группа 2'
    }

    const now = new Date();
    const isPass = now > new Date(`${item.дата.slice(0, 10)}T${item.конец}`);

    return (
        <div className={`card__lesson ${isPass ? 'pass' : ''}`} key={item.код}>
            <div className="card__body-begin">{item.начало} - </div>
            <div className="card__body-end">{item.конец}:</div>
            <div className="card__body-class">
                <p>{item.аудитория} каб.</p>
                {group && (
                    <span>({group})</span>
                )}
            </div>
        </div>
    )
}

export default ScheludeCardItem;