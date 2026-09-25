import { memo, useEffect, useState, type MouseEvent } from "react";
import icon from "../../assets/icons/pen_edit_pencil_modify_icon_149413.svg";
import { createPortal } from "react-dom";
import { checkAuth, signUp } from "../../http/user";
import succesIcon from "../../assets/icons/emblemdefault_103756.svg";

const Note = () => {
    const [showModal, setShowModal] = useState(false);
    const [showRegistr, setRegisrtr] = useState(false);

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [uError, setUError] = useState<string>('');
    const [pError, setPError] = useState<string>('');
    const [regError, setRegError] = useState<string>('');

    const [success, setSuccess] = useState<boolean>();
    const [authLoading, setAuthLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        let mounted = true;
        checkAuth()
            .then((data) => {
                if (mounted) setSuccess(Boolean(data?.username));
            })
            .finally(() => {
                if (mounted) setAuthLoading(false);
            });
        return () => { mounted = false; };
    }, []);

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

        setUError('');
        setPError('');
        setRegError('');
        setSubmitting(true);

        try {
            const response = await signUp(username, password);
            if (response.username) {
                setRegisrtr(false);
                setSuccess(true);
            }
        } catch (error) {
            setRegError(error instanceof Error ? error.message : 'Не получилось зарегистрироваться');
        } finally {
            setSubmitting(false);
        }
    };

    const openModal = () => {
        setShowModal(true);
        setRegisrtr(false);
        setUError('');
        setPError('');
    };

    const closeModal = () => {
        setShowModal(false);
        setRegisrtr(false);
        setUError('');
        setPError('');
    };

    return (
        <>
            {authLoading
                ? <span className="note__loader" />
                : <button className="note" onClick={openModal}>
                    <img src={icon} alt="заметка" />
                </button>
            }
            {showModal && createPortal(
                <div className="modal">
                    <div className="overlay"
                        onClick={closeModal}
                        onTouchMove={closeModal}
                    ></div>
                    {success
                        ? <div className="modal__body">
                            <p>Победа</p>
                            <img src={succesIcon} alt="" />
                            <span>Можно будет сразу заметки делать когда они будут (если будут)</span>
                            <button onClick={closeModal}>Закрыть</button>
                        </div>
                        : !showRegistr && <div className="modal__body">
                            <p>Функия заметок на этапе разработки</p>
                            <button
                                style={{ background: '#44a527', color: '#000' }}
                                onClick={() => setRegisrtr(true)}
                            >Предрегистрация</button>
                            <button onClick={closeModal}>Закрыть</button>
                        </div>
                    }
                    {showRegistr && (
                        <div className="modal__body">
                            <p>Можно будет заметки делать сразу</p>
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
                            {submitting
                                ? <span className="spinner" />
                                : regError
                                    ? <p className="modal__error">{regError}</p>
                                    : <button onClick={(e) => handleClick(e)}>Регистрация</button>
                            }
                        </div>
                    )}
                </div>,
                document.body
            )}
        </>
    )
};

export default memo(Note);