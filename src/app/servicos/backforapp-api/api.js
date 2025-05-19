import axios from 'axios';

axios.defaults.headers = {
    "X-Parse-Application-Id": process.env.NEXT_PUBLIC_X_Parse_Application_Id,
    "X-Parse-REST-API-Key": process.env.NEXT_PUBLIC_X_Parse_REST_API_Key,
    "X-Parse-Revocable-Session": process.env.NEXT_PUBLIC_X_Parse_Revocable_Sessio
}

const fazerLogin = async (email, senha) => {
    try {
        const resultado = await axios.post(`https://parseapi.back4app.com/login?username=${encodeURIComponent(email)}&password=${encodeURIComponent(senha)}`);
        return resultado;
    } catch (erro) {
        throw new Error("Falha ao fazer login.")
    }
}

export { fazerLogin };