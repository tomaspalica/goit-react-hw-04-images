import { useEffect } from "react";
import css from '../css/Modal.module.css'
export const Modal= ({modalAlt,modalSrc, handleClose}) => {
    useEffect(() => {
        const handleKeyDown = evt => {
            if (evt.keyCode === 27) {
               handleClose()}
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [])
   
    



    return (
    <div className={css.overlay} onClick={handleClose}>
  <div className={css.modalContent}>
    <img className={css.modalImg} src={modalSrc} alt={modalAlt} />
  </div>
</div>
)}