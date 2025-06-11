import { api } from "../api";

const listarMotos = async (sessionToken) => {
    try {
        const where = encodeURIComponent(JSON.stringify({ tipo_veiculo: "Moto" }));
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

const listarMotoPorId = async (sessionToken, id) => {
    try {
        const where = encodeURIComponent(JSON.stringify({ tipo_veiculo: "Moto", objectId: id }));
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

export { listarMotoPorId, listarMotos };