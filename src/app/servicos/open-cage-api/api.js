import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_OPEN_CAGE_API_KEY;

const trazerLocalizacao = async (latitude, longitude) => {
    try {
        // const resposta = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&pretty=1&key=${API_KEY}`);
        // const estado = resposta.data.results[0].components.state_code;
        // const cidade = resposta.data.results[0].components.suburb;

        //return `Estou em ${cidade} - ${estado.toString().toUpperCase()}`;
        return "Estou em São Paulo - SP";
    } catch (erro) {
        console.error('Erro ao buscar localização:', erro);
    }
}

export {  trazerLocalizacao };