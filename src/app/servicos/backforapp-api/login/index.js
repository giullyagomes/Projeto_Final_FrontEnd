import { api } from "../api";

const fazerLogin = async (email, senha) => {
    try {
        const resultado = await api.post(`/login?username=${encodeURIComponent(email)}&password=${encodeURIComponent(senha)}`);
        return resultado;
    } catch (erro) {
        throw new Error("Falha ao fazer login.")
    }
}

export { fazerLogin };