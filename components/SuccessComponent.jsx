import "./SuccessComponent.css";

export default function SuccessComponent({ onClose, children }) {
    return (
        <div className="success-box">
            {onClose && (
                <button
                    className="modal-close"
                    onClick={onClose}
                    aria-label="Fechar"
                >
                    &times;
                </button>
            )}
            <div className="success-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
                    <path
                        d="M20 6 9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <h3>{children}</h3>
        </div>
    );
}