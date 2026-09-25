import { memo, useEffect, useState, type MouseEvent } from "react";
import icon from "../../assets/icons/pen_edit_pencil_modify_icon_149413.svg";
import { createPortal } from "react-dom";
import { signUp } from "../../http/user";

const Note = () => {
    const [showModal, setShowModal] = useState(false);
    const [showRegistr, setRegisrtr] = useState(false);

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [uError, setUError] = useState<string>('');
    const [pError, setPError] = useState<string>('');

    useEffect(() => {
        if (!showModal) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = prev; };
    }, [showModal]);

    const handleClick = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();

        if (!username) {
            setUError('Хотя бы 1 символ надо');
            return;
        }

        if (!password || password.length < 8) {
            setPError('8 символов любых');
            return;
        }

        const response = await signUp(username, password);
        setUError('');
        setPError('');
        console.log(response);
    };

    return (
        <>
            <button className="note" onClick={() => {
                setShowModal(true)
                setRegisrtr(false)
            }}>
                <img src={icon} alt="заметка" />
            </button>
            {showModal && createPortal(
                <div className="modal">
                    <div className="overlay"
                        onClick={() => setShowModal(false)}
                        onTouchMove={() => setShowModal(false)}
                    ></div>
                    <div className="modal__body">
                        <p>Функия заметок на этапе разработки</p>
                        <button
                            style={{ background: '#44a527', color: '#000' }}
                            onClick={() => setRegisrtr(true)}
                        >Скоро</button>
                        <button onClick={() => setShowModal(false)}>Закрыть</button>
                    </div>

                    {/* {showRegistr && (
                        <div className="modal__body">
                            <p>Можно будет заметки делать</p>
                            <form>
                                <div className="block">
                                    <label>Имя</label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <span>{uError}</span>
                                </div>
                                <div className="block">
                                    <label>Пароль какой-нибудь</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span>{pError}</span>
                                </div>
                            </form>
                            <button onClick={(e) => handleClick(e)}>Регистрация</button>
                        </div>
                    )} */}
                </div>,
                document.body
            )}
        </>
    )
};

export default memo(Note);