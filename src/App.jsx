import { useEffect, useState } from "react";
import axios from "axios";
import HeaderComponent from "../components/HeaderComponent";
import UserListComponent from "../components/UserListComponent";
import LoadingComponent from "../components/LoadingComponent";
import UserCardComponent from "../components/UserCardComponent";
import "./App.css";

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

  const usuariosFiltrados = usuarios.filter(filtrarUsuarioPorTermo(busca));

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

      <p className="user-count">Usuários encontrados: {usuarios.length}</p>

      {error && <p className="error-message">{error}</p>}

      {!carregando && !error && (
        <>
          {usuariosFiltrados.length > 0 ? (
            <UserListComponent>
              {usuariosFiltrados.map((usuario) => (
                <UserCardComponent key={usuario.id} usuario={usuario} />
              ))}
            </UserListComponent>
          ) : (
            <p className="empty-message">Nenhum usuário encontrado.</p>
          )}
        </>
      )}
    </div>
  );
}
