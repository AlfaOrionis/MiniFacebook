import React from "react";
import ReactDOM from "react-dom";

const Backdrop: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const el = document.getElementById("modal-root");
  console.log(el);
  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "99",
        width: "100vw",
        height: "100vh",
        backgroundColor: "transparent",
      }}
      onClick={onClick}
    ></div>,
    el!
  );
};

export default Backdrop;
