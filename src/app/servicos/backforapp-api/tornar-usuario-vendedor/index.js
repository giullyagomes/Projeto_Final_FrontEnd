import axios from "axios";

const buscarUsuario = async (id, sessionToken) => {
    const response = await axios.get(
        `https://parseapi.back4app.com/classes/_User/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                "X-Parse-Application-Id": "K9uPsRuFvBzLDEaaPDwuxrxtxY94dZPDLmuwRaEm",
                "X-Parse-REST-API-Key": "PoqZ54BGlFJnpJ1wTuvxSJ4gDvh2TbwjrxeeNrmN",
                "X-Parse-Session-Token": sessionToken
            }
        }
    );
    return response.data;
};

const tornarUsuarioVendedor = async (id, sessionToken) => {
    try {
        await axios.put(
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

        const usuario = await buscarUsuario(id, sessionToken);

        const { sessionToken: _sessionToken, tipo, objectId, createdAt, ACL, updatedAt, authData, username,  ...dadosVendedor } = usuario;

       const resultado =  await axios.post(
            `https://parseapi.back4app.com/classes/Vendedor`,
             {
                ...dadosVendedor,
                id_usuario: objectId,
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