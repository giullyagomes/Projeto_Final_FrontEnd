import { api } from "../api";

const trazerDadosUsuario = async (sessionToken) => {
    try {
        const resultado = await api.get("/users/me", {
            headers: {
                "X-Parse-Session-Token": sessionToken,
                "Content-Type": "application/json"
            }
        });
        return resultado;
    } catch (erro) {
        throw new Error("Falha ao trazer os dados do usuário.");
    }
}

const trazerQuantidadeFavoritos = async (id) => {
    try {
        const resultado = await api.get(`/classes/Favoritos?where=${encodeURIComponent(JSON.stringify({ id_usuario: id } ))}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return resultado;
    } catch (erro) {
        throw new Error("Falha ao trazer a quantidade de favoritos.");
    }
}

export { trazerDadosUsuario, trazerQuantidadeFavoritos }