import { useEffect, type ReactNode } from "react";

const Modal = ({ children }: { children: ReactNode }, showModal: boolean) => {
    useEffect(() => {
        if (!showModal) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = prev; };
    }, [showModal]);

    return (
        <>
            <div className="overlay"></div>
            {children}
        </>, document.body
    )
};

export default Modal;