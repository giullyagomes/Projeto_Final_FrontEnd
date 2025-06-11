import { api } from "../api";

const cadastroUsuario = async (sessionToken, nome, sobrenome, email, cpf, dataNascimento, celular, senha) => {
    try {
        const body = {
            username: email,
            nome: nome,
            sobrenome,
            email,
            cpf,
            data_nascimento: dataNascimento,
            celular,
            password: senha,
        };
        const resultado = await api.post("/classes/_User", body, {
            headers: {
                "X-Parse-Session-Token": sessionToken,
                "Content-Type": "application/json"
            }
        });
        return resultado;
    } catch (erro) {
        throw new Error("Falha ao cadastrar o usuário.");
    }
}

export { cadastroUsuario };