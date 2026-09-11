import { useState } from "react";
import "./UserFormComponent.css";

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
        <form className="user-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
            />

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(evento) => setUsername(evento.target.value)}
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(evento) => setEmail(evento.target.value)}
            />

            <input
                type="text"
                placeholder="Telefone"
                value={telefone}
                onChange={(evento) => setTelefone(evento.target.value)}
            />

            <button type="submit" className="user-form-submit">
                Cadastrar
            </button>
        </form>
    );
}
