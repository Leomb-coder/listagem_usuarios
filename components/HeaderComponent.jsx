export default function HeaderComponent({ children }) {
    return (
        <header className="app-header">
            <h1>{children}</h1>
        </header>
    )
}