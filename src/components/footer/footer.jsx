import { Link } from "react-router-dom"

const Footer = () => {
    return(
        <div className="footer">
            <p>Используются данные с офицального сайта</p>
            <Link to="https://pkgh.ru/">ПКГХ</Link>
        </div>
    )
}

export default Footer