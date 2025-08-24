import { useState } from "react";

export default function Login({ onlogin }) {
    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [registrando, setRegistrando] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Registrar varios usuario
        if (registrando) {
            const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

            const existe = usuarios.find(u => u.usuario === usuario);
            if (existe) {
                setMensaje("El usuario ya existe. Elige otro");
                return;
            }

            // Guardar varios usuarios
            usuarios.push({ usuario, clave });
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            setMensaje("Usuario Registrado. Ya puedes iniciar sesión");
            setRegistrando(false);
            setClave("");
            return;
        }

        // Iniciar sesión
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
        <div style={{
            width: "100vw",
            height: "30vw",
            display: "flex",
            justifyContent: "center",
        }}>
            <div style={{ justifyContent: "center", textAlign: "center", marginTop: "50px", fontFamily: "Arial" }}>
                <h1>{registrando ? "Registro" : "Inicio Sesión"}</h1>
                <form onSubmit={handleSubmit}>

                    <div>
                        <input
                            type="text"
                            placeholder="Usuario"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            style={{ padding: "8px", margin: "5px" }}
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={clave}
                            onChange={(e) => setClave(e.target.value)}
                            style={{ padding: "8px", margin: "5px" }}
                            required
                        />
                    </div>

                    <button type="submit" style={{ textAlign: "center", marginTop: "10px", padding: "8px 20px", fontFamily: "Arial" }}>
                        {registrando ? "Registrar" : "Iniciar Sesión"}
                    </button>
                </form>

                <button
                    onClick={() => { setRegistrando(!registrando); setMensaje(""); }}
                    style={{ marginTop: "10px" }}
                >
                    {registrando ? "Ya está registrado" : "Crear nueva Cuenta"}
                </button>

                {mensaje && <p>{mensaje}</p>}
            </div>
        </div>
    );
}
