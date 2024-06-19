import { useEffect } from "react";
import "./Modal.css";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

const Modal = () => {
  const { message, icon, show, onClose } = useContext(CartContext)
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 1000);
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
