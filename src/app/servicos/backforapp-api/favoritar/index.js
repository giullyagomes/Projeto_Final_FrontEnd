import { api } from "../api";

const favoritar = async (idVeiculo, idUsuario) => {
  try {
    const where = encodeURIComponent(JSON.stringify({ id_veiculo: idVeiculo, id_usuario: idUsuario }));
    const busca = await api.get(`/classes/Favoritos?where=${where}`);
    const favoritoExistente = busca.data.results[0];

    if (favoritoExistente) {
      await api.delete(`/classes/Favoritos/${favoritoExistente.objectId}`);
      return { removido: true };
    } else {
      const response = await api.post(`/classes/Favoritos/`, {
        id_veiculo: idVeiculo,
        id_usuario: idUsuario   
      });
      return { adicionado: true, data: response.data };
    }
  } catch (error) {
    console.error("Erro ao alternar favorito:", error);
    throw error;
  }
}

const trazerTodosOsFavoritos = async (id) => {
  try {
    const where = encodeURIComponent(JSON.stringify({ id_usuario: id }));
    const response = await api.get(`/classes/Favoritos?where=${where}`);
    return response;
  } catch (error) {
    console.error("Erro ao trazer todos os favoritos:", error);
    throw error;
  }
}

export { favoritar, trazerTodosOsFavoritos }