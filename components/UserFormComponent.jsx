import { useState } from "react";

export default function UserFormComponent({ onCadastrar }) {
    const [nome, setNome] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");

    function handleSubmit(evento) {
        evento.preventDefault();
        const novoUsuario = {
            name: nome,
            username: username,
            email: email,
            phone: telefone,
        };

        onCadastrar(novoUsuario);
        limparFormulario();
    }

    function limparFormulario() {
        setNome("");
        setUsername("");
        setEmail("");
        setTelefone("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(evento) => {
                    setNome(evento.target.value);
                }}
            ></input>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(evento) => {
                    setUsername(evento.target.value);
                }}
            ></input>

            <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(evento) => {
                    setEmail(evento.target.value);
                }}
            ></input>

            <input
                type="text"
                placeholder="Telefone"
                value={telefone}
                onChange={(evento) => {
                    setTelefone(evento.target.value);
                }}
            ></input>

            <button type="submit">Cadastrar</button>
        </form>
    );
}
