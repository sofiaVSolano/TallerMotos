import { useEffect, useState } from "react";
import "./css/Dashboard.css";


function Dashboard({ user }) {
    const hora = new Date().getHours();
    const [todasTareas, setTodasTareas] = useState({});
    let saludo = "";

    if (hora >= 6 && hora < 12) {
        saludo = "Buenos días";
    } else if (hora >= 12 && hora < 18) {
        saludo = "Buenas tardes";
    } else {
        saludo = "Buenas noches";
    }

    // Recorrer las tareas del localStorage
    useEffect(() => {
        const tareasPorUsuario = {};

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            if (key.startsWith("todos_")) {
                try {
                    const usuario = key.replace("todos_", "");
                    const tareas = JSON.parse(localStorage.getItem(key)) || [];

                    tareasPorUsuario[usuario] = tareas;
                } catch (error) {
                    console.log("Error en las tareas de", key, error);
                }
            }
        }
        setTodasTareas(tareasPorUsuario);
    }, []);

    const borrarTarea = (usuario, idTarea) => {
        const nuevasTareas = todasTareas[usuario].filter((t) => t.id !== idTarea);
        localStorage.setItem(`todos_${usuario}`, JSON.stringify(nuevasTareas));

        setTodasTareas((prev) => ({
            ...prev,
            [usuario]: nuevasTareas,
        }));
    };

    const borrarCompletadas = () => {
        const nuevasTareasPorUsuario = {};

        Object.entries(todasTareas).forEach(([usuario, tareas]) => {
            const pendientes = tareas.filter((t) => !t.done);
            nuevasTareasPorUsuario[usuario] = pendientes;
            localStorage.setItem(`todos_${usuario}`, JSON.stringify(pendientes));
        });

        setTodasTareas(nuevasTareasPorUsuario);
    };

    const totalTareas = Object.values(todasTareas).reduce(
        (acc, tareas) => acc + tareas.length,
        0
    );

    return (
        <div className="Main">
            <div className="saludo">
                <h2>
                    👋 {saludo}, {user?.usuario || "Sin nombre"} 👋
                </h2>
            </div>

            <div className="Tareas">
                <h3>Tareas de todos los usuarios</h3>
                {Object.keys(todasTareas).length === 0 && <p>No hay tareas guardadas</p>}



                {Object.entries(todasTareas).map(([usuario, tareas]) => {
                    const pendientes = tareas.filter((t) => !t.done).length;
                    const completadas = tareas.filter((t) => t.done).length;
                    const total = tareas.length;

                    return (
                        <div key={usuario} className="usuarioTareas">
                            <h4>
                                👤 {usuario} — Pendientes: {pendientes} | Completadas: {completadas} | Total: {total}
                            </h4>
                            {tareas.length > 0 ? (
                                <ul>
                                    {tareas.map((t) => (
                                        <li key={t.id}>
                                            <input type="checkbox" checked={t.done} readOnly />
                                            <span
                                                style={{
                                                    textDecoration: t.done ? "line-through" : "none",
                                                    opacity: t.done ? 0.6 : 1,
                                                }}
                                            >
                                                {t.text}
                                            </span>
                                            {user?.tipoUsuario === "Administrador" && (
                                                <button
                                                    className="borrar__tareas"
                                                    onClick={() => borrarTarea(usuario, t.id)}
                                                >
                                                    🗑️
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Sin tareas</p>
                            )}


                        </div>

                    );
                })}
            </div>

            {user?.tipoUsuario === "Administrador" && totalTareas > 0 && (
                <div className="pendientes" style={{ marginBottom: "1rem" }}>
                    <button onClick={borrarCompletadas}>
                        🗑️ Borrar Tareas Completadas
                    </button>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
