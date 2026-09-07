const ScheludeCardItem = ({ item }) => {
    let group;
    if (item.дисциплина === 'лаб Проектирование и разработка веб-приложений, п/г 1') {
        group = 'Группа 1'
    }

    if (item.дисциплина === 'лаб Проектирование и разработка веб-приложений, п/г 2') {
        group = 'Группа 2'
    }

    return (
        <div className="card__lesson" key={item.код}>
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