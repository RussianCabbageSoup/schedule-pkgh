import { useEffect, useState } from "react";
import { useAppContext } from "../../context";
import settingIcon from "../../assets/icons/setting.png";
import closeIcon from "../../assets/icons/close_111152.svg";
import Overlay from "../UI/overlay/Overlay";

const Sidebar = () => {

    const { schedules } = useAppContext();

    const [showTeacher, setShowTeacher] = useState(schedules.showTeacher);
    const [showSubject, setShowSubject] = useState(schedules.showSubject);
    const [showAnimation, setShowAnimation] = useState(schedules.showAnimation);
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
                    <Overlay />
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
                            <div className="sidebar_menu-title">Настойки</div>
                            <ul className="setting">
                                <li className="setting__row">
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
                                </li>
                                <li className="setting__row">
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
                                </li>
                                <li className="setting__row">
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
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Sidebar;