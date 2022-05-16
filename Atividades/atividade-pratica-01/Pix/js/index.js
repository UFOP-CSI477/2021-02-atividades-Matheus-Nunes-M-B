let received = 0;
let sent = 0;
function SelectBank(date){
    const bank = document.getElementById("banks")
    const banklist = []
    for (const index in date) {
        const { code, name } = date[index];
        banklist.push({code, name})
    }
    
    banklist.sort((a, b) => a.name.localeCompare(b.name))

    for (const bankname of banklist) {
        const option = document.createElement("option");
        const displayname = bankname.code ? `${bankname.code} - ${bankname.name}` : bankname.name
        option.value = displayname;
        option.innerHTML = displayname;
        bank.appendChild(option);
    }
}

function onload(){
    fetch("https://brasilapi.com.br/api/banks/v1")
        .then(response => response.json())
        .then(date => SelectBank(date))
        .catch(error => console.error())
    const dateinput = document.getElementById("dateinput")
    dateinput.value = new Date().toISOString().split('T')[0];

    const form = document.querySelector('#pix')
    form.onsubmit = submit
}
function submit(event) {
    event.preventDefault()
    const transferOperation = document.querySelector("#operation").value
    const transferValue = +document.querySelector("#value-key").value
    if (transferOperation === "Enviar") {
        sent += transferValue
    }else {
        received += transferValue 
    }
    alert(`Tipo da chave escolhida: ${document.querySelector("#keytype").value}
        \nChave: ${document.querySelector("#key").value}
        \nValor da transferencia: R$ ${transferValue}
        \nData da transferencia: ${document.querySelector("#dateinput").value}
        \nBanco selecionado: ${document.querySelector("#banks").value}
        \nTipo de operacao selecionada: ${document.querySelector("#operation").value}
        \nValores enviados: R$${sent}
        \nValores recebidos: R$${received}
        \nSaldo final: ${received - sent}`)
}

function settype(type, title) {
    const element = document.getElementById(type)
    const activeelements = document.getElementsByClassName("active")
    for (let i = 0; i < activeelements.length; i++) {
        activeelements[i].classList.remove("active")
    }
    element.classList.add("active")
    const key = document.getElementById("keytype")
    key.value = title
}

function resetPixForm() {
    document.getElementById('pix').reset();
    settype('CPF/CNPJ', 'CPF/CNPJ')
}