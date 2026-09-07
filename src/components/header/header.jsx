const Header = () => {
    const getDate = () => {
        const today = new Date();
        const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

        const day = today.getDate();
        const month = today.getMonth();

        return `${day} ${months[month]}`;
    }

    return(
        <div className="header">
            <p>Сейчас</p>
            <span>{getDate()}</span>
        </div>
    )
}

export default Header