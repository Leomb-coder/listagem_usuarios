import "./FailComponent.css";

export default function FailComponent({ onClose, children }) {
    return (
        <div className="fail-box">
            {onClose && (
                <button
                    className="modal-close"
                    onClick={onClose}
                    aria-label="Fechar"
                >
                    &times;
                </button>
            )}
            <div className="fail-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
                    <path
                        d="M6 6l12 12M18 6 6 18"
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