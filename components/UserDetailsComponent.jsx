export default function UserDetailsComponent({ usuario, onFecharDetalhes }) {
    return (
        <div>
            <h2>Detalhes do usuário</h2>

            <p>
                <strong>Nome: </strong>
                {usuario.name}
            </p>
            <p>
                <strong>Email: </strong>
                {usuario.email}
            </p>
            <p>
                <strong>Cidade: </strong>
                {usuario.address.city}
            </p>
            <p>
                <strong>Telefone: </strong>
                {usuario.phone}
            </p>
            <p>
                <strong>Website: </strong>
                {usuario.website}
            </p>

            <button onClick={() => {onFecharDetalhes()}}>Fechar detalhes</button>
        </div>
    );
}
