export default function LoadingComponent({ loading }) {
    return loading && <p className="loading-message">Carregando usuários...</p>;
}
