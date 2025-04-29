const dataPath = 'src/data/all-items.json';

const getData = async () => {
    const data = fetch(dataPath)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Erro ao carregar o arquivo JSON: ${response.statusText}`);
        }
        return response.json();
    })
    .then((jsonData) => {
        console.log('Dados do JSON:', jsonData);
    })
    .catch((error) => {
        console.error('Erro ao processar o JSON:', error);
    });
    return data;
};

console.log(getData());