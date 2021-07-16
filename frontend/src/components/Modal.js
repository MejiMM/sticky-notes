import React from "react";
import "../styles/Modal.css";

/**
 * 
 * @param {Boolean} param0 True or false value that allows handling the modal window
 * @param {Function} param1 Close the modal window
 * @param {ObjectConstructor} param2 JSX code for the view
 * @returns PopUp component
 */
const Modal = ({ isOpen, closeModal, children }) => {
  /**
   * 
   * @param {Event} e Detect the click somewhere outside the modal window
   * @returns Stops the event propagation so that it only closes when the click goes out of modal
   */
  const handleModalDialogClick = (e) => e.stopPropagation();

  return (
    <article className={`modal ${isOpen && "modal-open"}`} onClick={closeModal}>
      <div className="modal__dialog" onClick={handleModalDialogClick}>
        {children}
      </div>
    </article>
  );
};

export default Modal;
