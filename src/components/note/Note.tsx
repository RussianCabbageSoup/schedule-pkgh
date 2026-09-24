import { memo, useState } from "react";
import icon from "../../assets/icons/pen_edit_pencil_modify_icon_149413.svg";
import { createPortal } from "react-dom";

const Note = () => {
    const [showModal, setShowModal] = useState(false);
    console.log(showModal);

    return (
        <>
            <button className="note" onClick={() => setShowModal(true)}>
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
                        <button onClick={() => setShowModal(false)}>OK</button>
                    </div>
                </div>,
                document.body
            )}
        </>
    )
};

export default memo(Note);