import { useEffect, useState } from "react";
import axios from "axios";
import HeaderComponent from "../components/HeaderComponent";
import UserListComponent from "../components/UserListComponent";
import LoadingComponent from "../components/LoadingComponent";
import UserDetailsComponent from "../components/UserDetailsComponent";
import UserFormComponent from "../components/UserFormComponent";
import "./App.css";
import NovoUsuarioComponent from "../components/NovoUsuarioComponent";
import ModalComponent from "../components/ModalComponent";

const filtrarUsuarioPorTermo = (termo) => (usuario) => {
    const termoLower = termo.toLowerCase();

    return (
        usuario.name.toLowerCase().includes(termoLower) ||
        usuario.username.toLowerCase().includes(termoLower) ||
        usuario.email.toLowerCase().includes(termoLower)
    );
};

export default function App() {
    const url = "https://jsonplaceholder.typicode.com";
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [busca, setBusca] = useState("");
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [novoUsuario, setNovoUsuario] = useState(null);
    const [modalOpen, setModalOpen] = useState(null);

    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }

    const usuariosFiltrados = usuarios.filter(filtrarUsuarioPorTermo(busca));

    async function buscarUsuario(id) {
        try {
            const response = await axios.get(`${url}/users/${id}`);
            const data = response.data;
            setUsuarioSelecionado(data);
        } catch (error) {
            console.log("Erro ao buscar usuário: ", error);
        }
    }

    async function buscarUsuarios() {
        try {
            setCarregando(true);
            const response = await axios.get(`${url}/users`);
            const data = response.data;

            setUsuarios(data);
            console.log(data);
        } catch (error) {
            console.log("Error when fetching user: ", error);
            setError(`Users were not loaded - ${error.message}`);
            setUsuarios([]);
        } finally {
            setCarregando(false);
        }
    }

    function limparDetalhesUsuario() {
        setUsuarioSelecionado(null);
    }

    async function cadastrarUsuario(usuario) {
        try {
            const response = await axios.post(`${url}/users`, usuario);

            const data = response.data;
            setNovoUsuario(data);
        } catch (error) {
            console.log("Erro ao cadastrar usuário: ", error);
        }
    }

    useEffect(() => {
        buscarUsuarios();
    }, []);

    return (
        <div className="app-container">
            <HeaderComponent>Catálogo de Usuários</HeaderComponent>

            <input
                className="search-input"
                type="text"
                placeholder="Filtrar usuário..."
                onChange={(evento) => setBusca(evento.target.value)}
            />

            <LoadingComponent loading={carregando}></LoadingComponent>

            <p className="user-count">
                Usuários encontrados: {usuarios.length}
            </p>

            {error && <p className="error-message">{error}</p>}

            {!carregando && !error && (
                <>
                    {usuariosFiltrados.length > 0 ? (
                        <UserListComponent
                            usuarios={usuariosFiltrados}
                            onSelecionarUsuario={buscarUsuario}
                        />
                    ) : (
                        <p className="empty-message">
                            Nenhum usuário encontrado.
                        </p>
                    )}

                    {usuarioSelecionado && (
                        <UserDetailsComponent
                            usuario={usuarioSelecionado}
                            onFecharDetalhes={limparDetalhesUsuario}
                        />
                    )}

                    {novoUsuario && (
                        <NovoUsuarioComponent novoUsuario={novoUsuario} />
                    )}

                    {/* Botão para abrir modal */}
                    <button onClick={toggleModal}>Criar usuário</button>

                    {modalOpen && (
                        <ModalComponent cadastrarUsuario={cadastrarUsuario} onClose={toggleModal}/>
                    )}
                </>
            )}
        </div>
    );
}
