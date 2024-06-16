import { useEffect } from "react";
import "./Modal.css";
import PropTypes from "prop-types";

const Modal = ({ message, icon, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        <div>{icon}</div>
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  message: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
