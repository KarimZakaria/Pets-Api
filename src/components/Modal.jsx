import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const currentRef = useRef(null);

  if (!currentRef.current) {
    currentRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(currentRef.current);
    return () => modalRoot.removeChild(currentRef.current);
  }, []);

  return createPortal(children, currentRef.current);
};

export default Modal;
