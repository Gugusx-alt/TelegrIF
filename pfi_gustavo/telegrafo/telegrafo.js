//ASCII para Código Morse
const codigomorse = {
    'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 
    'f': '..-.', 'g': '--.', 'h': '....', 'i': '..', 'j': '.---', 
    'k': '-.-', 'l': '.-..', 'm': '--', 'n': '-.', 'o': '---', 
    'p': '.--.', 'q': '--.-', 'r': '.-.', 's': '...', 't': '-', 
    'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-', 'y': '-.--', 
    'z': '--..', '1': '.----', '2': '..---', '3': '...--', 
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', 
    '8': '---..', '9': '----.', '0': '-----', ' ': '/'
};

//Morse para ASCII
const morseAscii = {
    ".-": "A", "-...": "B", "-.-.": "C", "-..": "D", ".": "E",
    "..-.": "F", "--.": "G", "....": "H", "..": "I", ".---": "J",
    "-.-": "K", ".-..": "L", "--": "M", "-.": "N", "---": "O",
    ".--.": "P", "--.-": "Q", ".-.": "R", "...": "S", "-": "T",
    "..-": "U", "...-": "V", ".--": "W", "-..-": "X", "-.--": "Y",
    "--..": "Z", "-----": "0", ".----": "1", "..---": "2", "...--": "3",
    "....-": "4", ".....": "5", "-....": "6", "--...": "7", "---..": "8", "----.": "9"
};

// Histórico 
let historico = [];

// Função para criptografar texto em Morse
function criptografarParaMorse(texto) {
    return texto.toLowerCase().split('').map(char => codigomorse[char] || '').join(' ');
}

// Função para decodificar código Morse para ASCII
function decodeMorse(codigomorse) {
    const morseLista = codigomorse.trim().split(" ");
    let messagemdesc = "";
    
    morseLista.forEach(symbol => {
        if (morseAscii[symbol]) {
            messagemdesc += morseAscii[symbol];
        } else {
            messagemdesc += "?";
        }
    });

    return messagemdesc;
}

// Função para atualizar o histórico 
function atualizarHistorico() {
    const historicoLista = document.getElementById('historicoLista');
    historicoLista.innerHTML = ''; 

    historico.forEach((registro, index) => {
        const li = document.createElement('li');
        li.textContent = `${registro.tipo}: ${registro.input} → ${registro.resultado}`;
        historicoLista.appendChild(li);
    });
}

// Evento para clicar no botão "Criptografar"
document.getElementById('Criptografar').addEventListener('click', function (event) {
    event.preventDefault();
    const palavra = document.getElementById('palavra').value.trim();
    if (!palavra) {
        alert("Digite uma palavra para criptografar.");
        return;
    }
    const resultadoMorse = criptografarParaMorse(palavra);
    document.getElementById('resultado').value = resultadoMorse;

    
    historico.push({
        tipo: 'Criptografar',
        input: palavra,
        resultado: resultadoMorse
    });
});

// Evento para clicar no botão "Decodificar"
document.getElementById("decodificar").addEventListener("click", function(event) {
    event.preventDefault();
    const morseInput = document.getElementById("morsedado").value.trim();
    if (!morseInput) {
        alert("Digite um código Morse para decodificar.");
        return;
    }

    const messagemdesc = decodeMorse(morseInput);
    document.getElementById("ascii").value = messagemdesc;

    
    historico.push({
        tipo: 'Decodificar',
        input: morseInput,
        resultado: messagemdesc
    });
});

// Evento no botão "Histórico"
document.getElementById('btnHistorico').addEventListener('click', function() {
    document.getElementById('modalHistorico').style.display = 'block';
    atualizarHistorico(); // Atualiza o conteúdo do modal
});


document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('modalHistorico').style.display = 'none';
});


window.onclick = function(event) {
    const modal = document.getElementById('modalHistorico');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};
