import { useEffect, useMemo, useState } from "react";
import "./css/Todo.css";

export default function Todo({ user }) {
    const storageKey = useMemo(
        () => (user && user.usuario ? `todos_${user.usuario}` : null),
        [user]
    );

    const [items, setItems] = useState([]);
    const [text, setText] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [filter, setFilter] = useState('all');
    const [editID, setEditID] = useState(null);
    const [editTxt, setEditTxt] = useState("");

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

    const ClearCompleted = () => {
        setItems((prev) => prev.filter((it) => !it.done));
    };

    const EditingToDo = (id, text) => {
        setEditID(id);
        setEditTxt(text);
    };

    const SavedEdit = (id) => {
        setItems((prev) =>
            prev.map((it) => (it.id === id ? { ...it, text: editTxt } : it))
        );
        setEditID(null);
        setEditTxt("");
    };

    const FilteredToDo = items.filter((it) => {
        if (filter === 'pending') return !it.done;
        if (filter === 'done') return it.done;
        return true;
    });

    // Barra para que el usuario pueda ver el progreso de sus tareas
    const completedCount = items.filter(item => item.done).length;
    const totalCount = items.length;
    const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

    if (!isLoaded) {
        return <div>Cargando tareas...</div>;
    }

    return (
        <>
            <h2>Lista de Tareas - {user?.usuario}</h2>

            {/* Barra de progreso */}
            {totalCount > 0 && (
                <div className="progreso__tareas">
                    <div className="barra__progreso">
                        <div
                            className="barra__relleno"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <span className="txt__barra__tareas">{completedCount} de {totalCount} tareas completadas ({progress}%)</span>
                </div>
            )}

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
                    {FilteredToDo.map((item) => (
                        <li key={item.id} className="itemsMap">
                            <input
                                type="checkbox"
                                checked={item.done || false}
                                onChange={() => toggleTodo(item.id)}
                                aria-label={`Marcar "${item.text}"`}
                            />

                            {editID === item.id ? (
                                <input
                                    type="text"
                                    value={editTxt}
                                    onChange={(e) => setEditTxt(e.target.value)}
                                    onBlur={() => SavedEdit(item.id)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            SavedEdit(item.id);
                                        }
                                    }}
                                    autoFocus
                                />
                            ) : (
                                <span
                                    className="textCheckbox"
                                    style={{
                                        textDecoration: item.done ? "line-through" : "none",
                                        opacity: item.done ? 0.6 : 1,
                                    }}
                                >
                                    {item.text}
                                </span>
                            )}

                            <button
                                className="editar__tareas"
                                onClick={() => EditingToDo(item.id, item.text)}
                                aria-label="Editar"
                            >
                                ✏️
                            </button>
                        </li>
                    ))}

                    {FilteredToDo.length === 0 && (
                        <li className="texto-listas">
                            {filter === 'all' && "No hay tareas"}
                            {filter === 'pending' && "No hay tareas pendientes"}
                            {filter === 'done' && "No hay tareas completadas"}
                        </li>
                    )}

                    <div className="Filtered-Tasks">
                        <button onClick={() => setFilter('all')}>Todas</button>
                        <button onClick={() => setFilter('pending')}>Pendientes</button>
                        <button onClick={() => setFilter('done')}>Completadas</button>
                    </div>
                </ul>

            </div>

        </>
    );
}
