import { useState } from "react";
import "./css/Login.css";

export default function Login({ onlogin }) {
    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [registrando, setRegistrando] = useState(false);
    const [tipoUsuario, setTipoUsuario] = useState("Usuario"); // valor por defecto válido

    const handleSubmit = (e) => {
        e.preventDefault();

        if (registrando) {
            const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
            const existe = usuarios.find(u => u.usuario === usuario);

            if (existe) {
                setMensaje("El usuario ya existe. Elige otro");
                return;
            }

            usuarios.push({ usuario, clave, tipoUsuario });
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            setMensaje("Usuario Registrado. Ya puedes iniciar sesión");
            setRegistrando(false);
            setClave("");
            return;
        }

        const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
        const datos = usuarios.find(u => u.usuario === usuario && u.clave === clave);

        if (datos) {
            localStorage.setItem("sesion", "activa");
            localStorage.setItem("usuario", JSON.stringify(datos));
            setMensaje("Bienvenido " + datos.usuario);
            onlogin?.();
        } else {
            setMensaje("Usuario o contraseña incorrecto");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>{registrando ? "Registro" : "Inicio Sesión"}</h1>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={clave}
                        onChange={(e) => setClave(e.target.value)}
                        required
                    />

                    {registrando && (
                        <>
                            <label htmlFor="TipoUsuario" className="label-usuario">
                                Tipo Usuario:
                            </label>
                            <select
                                id="TipoUsuario"
                                value={tipoUsuario}
                                onChange={(e) => setTipoUsuario(e.target.value)}
                            >
                                <option value="Administrador">Administrador</option>
                                <option value="Usuario">Usuario</option>
                            </select>
                        </>
                    )}

                    <button type="submit">
                        {registrando ? "Registrar" : "Iniciar Sesión"}
                    </button>
                </form>

                <button
                    onClick={() => {
                        setRegistrando(!registrando);
                        setMensaje("");
                        setTipoUsuario("Usuario");
                    }}
                    className="toggle-register"
                >
                    {registrando ? "Ya está registrado" : "Crear nueva Cuenta"}
                </button>

                {mensaje && <p className="mensaje">{mensaje}</p>}
            </div>
        </div>
    );
}
