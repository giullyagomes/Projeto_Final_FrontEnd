import { api } from "../api";

const buscarVendedorPorId = async (sessionToken, id) => {
    try {
        const where = encodeURIComponent(JSON.stringify({ objectId: id }));
        const resultado = await api.get(`/classes/Vendedor?where=${where}`, {
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

export { buscarVendedorPorId };