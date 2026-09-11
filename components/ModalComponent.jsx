import UserFormComponent from "./UserFormComponent";
import './ModalComponent.css';

export default function ModalComponent({ cadastrarUsuario, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Criar usuário</h2>
                    {onClose && (
                        <button className="modal-close" onClick={onClose} aria-label="Fechar">
                            &times;
                        </button>
                    )}
                </div>
                <UserFormComponent onCadastrar={cadastrarUsuario} />
            </div>
        </div>
    );
}