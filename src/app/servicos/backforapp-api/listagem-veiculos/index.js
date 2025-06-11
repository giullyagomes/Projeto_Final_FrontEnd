import { api } from "../api";

const listarCarros = async () => {
    try {
        const where = encodeURIComponent(JSON.stringify({ tipo_veiculo: "Carro" }));
        const resultado = await api.get(`/classes/Veiculo?where=${where}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return resultado;
    } catch (erro) {
        throw new Error("Falha ao listar os carros.");
    }
}

const listarCarrosPorId = async (sessionToken, id) => {
    try {
        const where = encodeURIComponent(JSON.stringify({ tipo_veiculo: "Carro", objectId: id }));
        const resultado = await api.get(`/classes/Veiculo?where=${where}`, {
            headers: {
                "X-Parse-Session-Token": sessionToken,
                "Content-Type": "application/json"
            }
        });
        return resultado;
    } catch (erro) {
        throw new Error("Falha ao listar os carros.");
    }
}

export { listarCarros, listarCarrosPorId };