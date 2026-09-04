export default function UserCardComponent({ usuario }) {
  return (
    <li className="user-card">
      <strong className="user-name">{usuario.name}</strong>
      <p className="user-email">{usuario.email}</p>
      <p className="user-username">@{usuario.username}</p>
    </li>
  );
}