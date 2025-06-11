import { api } from "../api";

const listarDuvidas = async () => { 
    try {
        const resultado = await api.get("/classes/Duvidas", {
            });
        return resultado;
    } catch (erro) {
        throw new Error("Falha ao listar as dúvidas.");
    }
}

export {  listarDuvidas }