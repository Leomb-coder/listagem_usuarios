import { useEffect, useState } from "react";
import axios from "axios";

const filtrarUsuarioPorTermo = (termo) => (usuario) => {
  const termoLower = termo.toLowerCase()

  return (
    usuario.name.toLowerCase().includes(termoLower) ||
    usuario.username.toLowerCase().includes(termoLower) ||
    usuario.email.toLowerCase().includes(termoLower)
  )
}

export default function App() {
  const url = "https://jsonplaceholder.typicode.com";
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [busca, setBusca] = useState("")

  const usuariosFiltrados = usuarios.filter(filtrarUsuarioPorTermo(busca))

  async function buscarUsuarios() {
    try {
      setCarregando(true);
      const response = await axios.get(`${url}/users`);
      const data = response.data;

      setUsuarios(data);
      console.log(data)
    } catch (error) {
      console.log("Error when fetching user: ", error);
      setError(`Users were not loaded - ${error.message}`);
      setUsuarios([])
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarUsuarios();
  }, []);

  return (
    <div>
      <h1>Catálogo de Usuários</h1>

      <input type="text" placeholder="Filtrar usuário..." onChange={(evento) => {setBusca(evento.target.value)}}/>

      {carregando && <p>Carregando usuários...</p>}

      <p>Usuários encontrados: {usuariosFiltrados.length}</p>

      {error && <p>{error}</p>}

      {!carregando && !error && (
        <ul>
          {usuariosFiltrados.map((usuario) => (
            <li key={usuario.id}>
              <hr />
              <strong>{usuario.name}</strong>
              <p>{usuario.email}</p>
              <p>{usuario.username}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
