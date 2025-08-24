import { useEffect, useMemo, useState } from "react";
import "./css/Todo.css";

export default function Todo({ user }) {
    const storageKey = useMemo(
        () => (user && user.usuario ? `todos_${user.usuario}` : null),
        [user]
    );

    const [items, setItems] = useState([]);
    const [text, setText] = useState("");
    const [isLoaded, setIsLoaded] = useState(false); //Agrego el nuevo estado para las tareas

    // Se carga solo si hay un usuario disponible
    useEffect(() => {
        if (!storageKey) {
            setItems([]);
            setIsLoaded(true);
            return;
        }

        try {
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                const parsed = JSON.parse(saved);
                const validItems = parsed.filter(item =>
                    item && item.id && item.text !== undefined
                );
                setItems(validItems);
            } else {
                setItems([]);
            }
        } catch (error) {
            console.error("Error loading todos:", error);
            setItems([]);
        } finally {
            setIsLoaded(true);
        }
    }, [storageKey]);

    useEffect(() => {
        if (!storageKey || !isLoaded) return;

        try {
            if (items.length > 0) {
                localStorage.setItem(storageKey, JSON.stringify(items));
            } else {
                localStorage.removeItem(storageKey);
            }
        } catch (error) {
            console.error("Error saving todos:", error);
        }
    }, [items, storageKey, isLoaded]);

    const addTodo = (e) => {
        e.preventDefault();
        const txt = text.trim();
        if (!txt) return;

        setItems((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                text: txt,
                done: false,
                ts: Date.now()
            },
        ]);

        setText("");
    };

    const toggleTodo = (id) => {
        setItems((prev) =>
            prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it))
        );
    };

    const RemoveTodo = (id) => {
        setItems((prev) => prev.filter((it) => it.id !== id));
    };

    const ClearCompleted = () => {
        setItems((prev) => prev.filter((it) => !it.done));
    };

    if (!isLoaded) {
        return <div>Cargando tareas...</div>;
    }

    return (
        <>
            <h2>Lista de Tareas Pendientes - {user?.usuario}</h2>

            <div className="agregar__tareas">
                <form onSubmit={addTodo} style={{ display: "flex", gap: "0.5rem" }}>
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Nueva tarea"
                        aria-label="Nueva tarea"
                    />
                    <button type="submit">Agregar Tarea</button>
                </form>
            </div>

            <div className="lista__tareas">
                <ul className="ListaTarea">
                    {items.length === 0 && <li>No hay tareas</li>}

                    {items.map((item) => (
                        <li key={item.id} className="itemsMap">
                            <input
                                type="checkbox"
                                checked={item.done || false}
                                onChange={() => toggleTodo(item.id)}
                                aria-label={`Marcar "${item.text}"`}
                            />

                            <span
                                className="textCheckbox"
                                style={{
                                    textDecoration: item.done ? "line-through" : "none",
                                    opacity: item.done ? 0.6 : 1
                                }}
                            >
                                {item.text}
                            </span>
                            <button
                                className="borrar__tareas"
                                onClick={() => RemoveTodo(item.id)}
                                aria-label="Eliminar"
                            >
                                🗑️
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {items.length > 0 && (
                <div className="pendientes">
                    <button onClick={ClearCompleted}>Borrar Tareas Completadas</button>
                    <p>
                    </p>
                </div>
            )}
        </>
    );
}