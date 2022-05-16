let moedas;
let currencyOne;
let currencyTwo;
let campoUm;
let campoDois;
let graphRange;
let moedaDisplay;
let chart;

async function fetchMoedas() {
    const res = await fetch("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?$top=100&$format=json&$select=simbolo,nomeFormatado").then(res => {
        return res.json();
    }).catch(error => console.log(error))
    moedas = res.value
    moedas.push({ simbolo: "BRL", nomeFormatado: "Real" })
    moedas.sort((a, b) => a.nomeFormatado.localeCompare(b.nomeFormatado))
}

function addMoedasOptionsInSelects() {
    function createOption(moeda) {
        const displayName = `${moeda.simbolo} - ${moeda.nomeFormatado}`
        const option = document.createElement("option");
        option.value = moeda.simbolo;
        option.innerText = displayName;
        return option;
    }
    for (const moeda of moedas) {
        currencyOne.appendChild(createOption(moeda))
        currencyTwo.appendChild(createOption(moeda))
    }

}

function updateMoedaDisplay(value, moeda) {
    moedaDisplay.innerText = `${moeda.simbolo} ${value} ${moeda.nomeFormatado}`
}



async function calc(campo) {
    if (currencyOne.value && currencyTwo.value && (!isNaN(Number(campoUm.value)) || !isNaN(Number(campoDois.value)))) {
        const valorCotacao1 = await fetchCotacao(currencyOne.value, new Date());
        const valorCotacao2 = await fetchCotacao(currencyTwo.value, new Date());
        if (campo == 1) {
            const taxaConversao = valorCotacao1 / valorCotacao2;
            campoDois.value = (campoUm.value * taxaConversao).toFixed(2);
            updateMoedaDisplay(campoDois.value, moedas.find(m => m.simbolo === currencyTwo.value))
        } else {
            const taxaConversao = valorCotacao2 / valorCotacao1;
            campoUm.value = (campoDois.value * taxaConversao).toFixed(2);
            updateMoedaDisplay(campoUm.value, moedas.find(m => m.simbolo === currencyOne.value))
        }
    }
}

function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    return month + '-' + day + '-' + year;
}

async function fetchCotacao(currency, date) {
    if (currency == 'BRL') {
        return 1;
    }
    let cotacao;
    while (!cotacao || !cotacao.value.length) {
        const result = await fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${currency}'&@dataCotacao='${getFormattedDate(date)}'&$top=100&$format=json&$select=cotacaoCompra`).then(res => {
            return res.json();
        }).catch(error => console.log(error))
        cotacao = result;
        date.setDate(date.getDate() - 1)
    }
    if (cotacao.value.length > 1) {
        const media = cotacao.value.reduce((total, next) => total + next.cotacaoCompra, 0) / cotacao.value.length;
        return media;
    }
    return cotacao.value[0].cotacaoCompra
}

async function fetchGraph() {
    if (currencyOne.value && currencyTwo.value) {
        let date = new Date()
        date.setDate(date.getDate() - graphRange.value+1)
        const graphMapUm = [];
        for (let i = 0; i < graphRange.value; i++) {
            graphMapUm.push({ data: getFormattedDate(date), valor: fetchCotacao(currencyOne.value, date) })
            date.setDate(date.getDate() + 1)
        }
        date = new Date()
        date.setDate(date.getDate() - graphRange.value)
        const graphMapDois = [];
        for (let i = 0; i < graphRange.value; i++) {
            graphMapDois.push({ data: getFormattedDate(date), valor: fetchCotacao(currencyTwo.value, date) })
            date.setDate(date.getDate() + 1)
        }
        const fulfilledUm = await Promise.all(graphMapUm.map(e => e.valor))
        const fulfilledDois = await Promise.all(graphMapDois.map(e => e.valor))

        chart.destroy()
        const ctx = document.getElementById('myChart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: graphMapUm.map(e => e.data),
                datasets: [{
                        label: currencyOne.value,
                        data: fulfilledUm,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        fill: false,
                        tension: 0.1
                    },
                    {
                        label: currencyTwo.value,
                        data: fulfilledDois,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        fill: false,
                        tension: 0.1
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        color: 'rgba(247, 255, 247, 1)'
                    },
                    y: {
                        beginAtZero: true,
                        color: 'rgba(247, 255, 247, 1)'
                    }
                }
            }
        });
    }
}

function initialData() {
    currencyOne = document.getElementById("moeda1");
    currencyTwo = document.getElementById("moeda2");
    campoUm = document.getElementById("value");
    campoDois = document.getElementById("value2");
    graphRange = document.getElementById("graphrange");
    moedaDisplay = document.getElementById("moedaDisplay");
    const ctx = document.getElementById('myChart').getContext('2d');
    chart = new Chart(ctx)
}

async function onLoad() {
    initialData()
    await fetchMoedas()
    addMoedasOptionsInSelects()
}