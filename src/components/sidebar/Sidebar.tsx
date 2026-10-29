import { useEffect, useState } from "react";
import { useAppContext } from "../../context";
import settingIcon from "../../assets/icons/setting.png";
import closeIcon from "../../assets/icons/close_111152.svg";
import Overlay from "../UI/overlay/Overlay";
import { observer } from "mobx-react-lite";

const Sidebar = observer(() => {

    const { schedules } = useAppContext();

    const [showTeacher, setShowTeacher] = useState(schedules.showTeacher);
    const [showSubject, setShowSubject] = useState(schedules.showSubject);
    const [showAnimation, setShowAnimation] = useState(schedules.showAnimation);
    const [useProxy, setUseProxy] = useState(schedules.useProxy);

    const [showSidebar, setShowSidebar] = useState(false);
    const [closing, setClosing] = useState(false);

    const closeSidebar = () => setClosing(true);

    useEffect(() => {
        if (!showSidebar) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = prev; };
    }, [showSidebar]);

    return (
        <>
            {!showSidebar && (
                <button
                    className="grapper"
                    onClick={() => setShowSidebar(true)}
                >
                    <img src={settingIcon} alt="открыть меню" />
                </button>
            )}
            {showSidebar && (
                <>
                    <div className="overlay"
                        onClick={closeSidebar}
                        onTouchMove={closeSidebar}
                    ></div>
                    <div
                        className={`sidebar ${closing ? 'sidebar-closing' : 'show-sidebar'}`}
                        onAnimationEnd={() => {
                            if (closing) {
                                setClosing(false);
                                setShowSidebar(false);
                            }
                        }}
                    >
                        <div className="sidebar_menu">
                            <button
                                className="close-btn"
                                onClick={closeSidebar}
                            >
                                <img src={closeIcon} alt="закрыть" />
                            </button>
                            <div className="sidebar_menu-title">Интерфейс</div>
                            <ul className="setting">
                                <li className="setting__row">
                                    <div className="setting__row-item">
                                        <p>Показать преподавателя</p>
                                        <button
                                            className={`setting__row-btn ${showTeacher ? 'setting-btn-active' : ''}`}
                                            onClick={() => {
                                                setShowTeacher(!showTeacher);
                                                schedules.setShowTeacher(!showTeacher);
                                            }}
                                        >
                                            <div></div>
                                        </button>
                                    </div>
                                </li>
                                <li className="setting__row">
                                    <div className="setting__row-item">
                                        <p>Показать предмет</p>
                                        <button
                                            className={`setting__row-btn ${showSubject ? 'setting-btn-active' : ''}`}
                                            onClick={() => {
                                                setShowSubject(!showSubject);
                                                schedules.setShowSubject(!showSubject);
                                            }}
                                        >
                                            <div></div>
                                        </button>
                                    </div>
                                </li>
                                <li className="setting__row" style={{ marginBottom: "1.2rem" }}>
                                    <div className="setting__row-item">
                                        <p>Показывать анимации для пар</p>
                                        <button
                                            className={`setting__row-btn ${showAnimation ? 'setting-btn-active' : ''}`}
                                            onClick={() => {
                                                setShowAnimation(!showAnimation);
                                                schedules.setShowAnimation(!showAnimation);
                                            }}
                                        >
                                            <div></div>
                                        </button>
                                    </div>
                                </li>
                            </ul>
                            <div className="sidebar_menu-title">Сеть</div>
                            <ul className="setting">
                                <li className="setting__row">
                                    <div className="setting__row-item">
                                        <p>Использовать прокси</p>
                                        <button
                                            className={`setting__row-btn ${useProxy ? 'setting-btn-active' : ''}`}
                                            onClick={() => {
                                                setUseProxy(!useProxy);
                                                schedules.setUseProxy(!useProxy);
                                            }}
                                        >
                                            <div></div>
                                        </button>
                                    </div>
                                    <div className="setting__note">
                                        Используется только для загрузки расписания.
                                        Если расписание не загружается стоит попробовать выключить
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </>
    )
})

export default Sidebar;