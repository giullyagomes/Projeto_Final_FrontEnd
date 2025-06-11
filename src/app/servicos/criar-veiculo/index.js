import { api } from "../backforapp-api/api";

const criarVeiculo = async (veiculo, idVendedor) => { 
    try {
        const resultado = await api.post("/classes/Veiculo", {
            categoria: veiculo.categoria,
            modelo: veiculo.modelo,
            marca: veiculo.marca,
            ano: veiculo.ano,
            preco: veiculo.preco,
            tipo_veiculo: veiculo.tipo,
            tipo_combustivel: veiculo.combustivel,
            cidade_venda: veiculo.cidadeVenda,
            estado_venda: veiculo.estadoVenda,
            cor: veiculo.cor,
            tipo_cambio: veiculo.cambio,
            fotos: veiculo.fotos.split(","),
            id_vendedor: idVendedor,
            quilometragem: veiculo.quilometragem.toString(),
        }
        );
        return resultado.data;
    } catch (erro) {
        throw new Error("Falha ao criar o veículo.");
    }
}

export { criarVeiculo };