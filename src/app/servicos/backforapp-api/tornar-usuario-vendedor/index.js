import axios from "axios";

const tornarUsuarioVendedor = async (id, sessionToken) => {
    try {
        const resultado = await axios.put(
            `https://parseapi.back4app.com/classes/_User/${id}`,
            {
                tipo: "vendedor"
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Parse-Application-Id": "K9uPsRuFvBzLDEaaPDwuxrxtxY94dZPDLmuwRaEm",
                    "X-Parse-REST-API-Key": "PoqZ54BGlFJnpJ1wTuvxSJ4gDvh2TbwjrxeeNrmN",
                    "X-Parse-Session-Token": sessionToken 
                }
            }
        );
        return resultado;
    } catch (erro) {
        throw new Error("Falha ao realizar a ação de tornar usuário vendedor." + erro);
    }
};

export { tornarUsuarioVendedor };