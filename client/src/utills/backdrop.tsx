import React from "react";
import ReactDOM from "react-dom";

const Backdrop: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const el = document.getElementById("modal-root");
  console.log(el);
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={onClick}></div>,
    el!
  );
};

export default Backdrop;
