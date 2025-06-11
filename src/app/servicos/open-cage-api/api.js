import axios from 'axios';

const API_KEY = "2b9886e6517a46bcb2d16ca0667d36b6";

const trazerLocalizacao = async (latitude, longitude) => {
    try {
        const resposta = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&pretty=1&key=${API_KEY}`);
        const estado = resposta.data.results[0].components.state_code;
        const cidade = resposta.data.results[0].components.suburb;

        return `Estou em ${estado.toString().toUpperCase()}`;
    } catch (erro) {
        console.error('Erro ao buscar localização:', erro);
    }
}

export {  trazerLocalizacao };