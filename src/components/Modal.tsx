import ReactDOM from "react-dom";

type ModalProps = {
  isOpen: boolean;
  requestClose: () => void;
  children?: React.ReactNode;
};

export default function Modal({ isOpen, requestClose, children }: ModalProps) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal" role="dialog">
      <div className="modal__backdrop" />
      <div className="modal__content">
        <button className="modal__content--close" onClick={requestClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal") as HTMLElement
  );
}
