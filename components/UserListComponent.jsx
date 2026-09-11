import UserCardComponent from "./UserCardComponent";

export default function UserListComponent({ usuarios, onSelecionarUsuario }) {
    return (
        <div className="user-list">
            {usuarios.map((usuario) => (
                <UserCardComponent
                    key={usuario.id}
                    usuario={usuario}
                    onSelecionarUsuario={onSelecionarUsuario}
                />
            ))}
        </div>
    );
}