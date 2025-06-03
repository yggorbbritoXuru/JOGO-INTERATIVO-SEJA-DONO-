// script.js
let nomeUsuario = '';
let startTime;
let ranking = [];

// Fetch ranking data from JSON file (replace with your actual URL)
const rankingURL = "https://jogo-seja-dono.vercel.app/ranking.json";
const perguntas = [
    {
        pergunta: "O que é uma cooperativa de crédito?",
        opcoes: [
            "Uma empresa privada que visa lucro para acionistas",
            "Uma ONG sem fins lucrativos",
            "Uma associação de pessoas que se unem para beneficiar-se financeiramente de forma coletiva",
            "Um banco estatal"
        ],
        respostaCorreta: "c"
    },
    {
        pergunta: "Qual destes é um dos princípios do cooperativismo?",
        opcoes: [
            "Lucro acima de tudo",
            "Participação democrática",
            "Hierarquia centralizada",
            "Concorrência entre associados"
        ],
        respostaCorreta: "b"
    },
    {
        pergunta: "O que diferencia uma cooperativa de crédito de um banco tradicional?",
        opcoes: [
            "O número de clientes",
            "O fato de não existir lucro",
            "O controle e decisões serem feitos pelos próprios associados",
            "A sede ser no exterior"
        ],
        respostaCorreta: "c"
    },
    {
        pergunta: "Quem são os donos de uma cooperativa de crédito?",
        opcoes: [
            "Os bancos centrais",
            "Grandes empresários",
            "Os associados",
            "O presidente da cooperativa"
        ],
        respostaCorreta: "c"
    },
    {
        pergunta: "Como um associado participa das decisões da cooperativa?",
        opcoes: [
            "Contratando um gerente",
            "Votando nas assembleias e sugerindo propostas",
            "Enviando e-mails para o gerente geral",
            "Através de representantes do governo"
        ],
        respostaCorreta: "b"
    },
    {
        pergunta: "O que significa 'sobra' em uma cooperativa de crédito?",
        opcoes: [
            "Um erro financeiro",
            "Um valor excedente que pertence aos associados e pode ser reinvestido ou distribuído",
            "Dinheiro perdido",
            "Empréstimos não pagos"
        ],
        respostaCorreta: "b"
    },
    {
        pergunta: "Qual é o papel social de uma cooperativa de crédito?",
        opcoes: [
            "Investir apenas em grandes empresas",
            "Financiar apenas quem tem alto poder aquisitivo",
            "Contribuir para o desenvolvimento da comunidade",
            "Atuar como um banco estatal"
        ],
        respostaCorreta: "c"
    },
    {
        pergunta: "Quem pode se tornar um associado de uma cooperativa de crédito?",
        opcoes: [
            "Apenas pessoas com CNPJ",
            "Somente funcionários públicos",
            "Qualquer pessoa que aceite os princípios do cooperativismo",
            "Apenas moradores da capital"
        ],
        respostaCorreta: "c"
    },
    {
        pergunta: "Participar de uma cooperativa significa:",
        opcoes: [
            "Ter uma conta bancária como em qualquer outro banco",
            "Ser cliente comum",
            "Ser parte de uma comunidade que toma decisões coletivas",
            "Ter acesso exclusivo a investimentos em ações"
        ],
        respostaCorreta: "c"
    },
    {
        pergunta: "Por que aprender sobre cooperativismo de forma interativa é importante?",
        opcoes: [
            "Porque torna o conteúdo mais difícil",
            "Porque jogos só servem para crianças",
            "Porque desperta o interesse, facilita o aprendizado e estimula a participação",
            "Porque substitui a educação formal"
        ],
        respostaCorreta: "c"
    }
];

function mostrarTela(numero) {
    const telas = document.querySelectorAll('.container > div');
    telas.forEach(tela => tela.classList.add('hidden'));

    const novaTela = document.getElementById('tela' + numero);
    if (novaTela) novaTela.classList.remove('hidden');

    if (numero === 6) {
        gerarPerguntas();
    }

      if (numero === 1) {
    const autores = document.getElementById('autores');

    // Set the content, including images:
    autores.innerHTML = `
      <h3>Autores</h3>
      <p>Ygor Brito, Iasmine Cabral e Matheus Souza</p>
      <p>Discente: Prof. Dr. Ítalo José Bastos Guimarães</p>
      <p>Desenvolvimento: 2025</p>

      <div class = "images">

      <img src="template/ppgAdm.png" alt="Logo PPGADM" width = "100px">
      <img src="template/IFGoRio.png" alt="Logo IFGoRio" width = "100px">
      </div>

      <p>PPGADM - Instituto Federal Goiano - Campus Rio Verde</p>
    `;
  }
}



function gerarPerguntas(){
    const quizForm = document.getElementById('quizForm');
    quizForm.innerHTML = ''; // Clear previous questions

    perguntas.forEach((perg, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `<h2>${perg.pergunta}</h2>`;

        perg.opcoes.forEach((opcao, opcaoIndex) => {
            const letra = String.fromCharCode(97 + opcaoIndex); // a, b, c...
            questionDiv.innerHTML += `
                <label>
                    <input type="radio" name="q${index+1}" value="${letra}"> ${opcao}
                </label><br>`;

        });
        quizForm.appendChild(questionDiv);
    });
}

function validarCadastro() {
    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const email = document.getElementById('email').value.trim();
    const erro = document.getElementById('erro');

    if (!nome || !telefone || !email) {
        erro.textContent = 'Todos os campos devem ser preenchidos!';
        return;
    }

    nomeUsuario = nome;
    erro.textContent = '';

    mostrarTela(6);
    startTime = new Date();
}


function calcularResultado() {
    let acertos = 0;
    let feedback = "";

    perguntas.forEach((pergunta, index) => {
        const respostaSelecionada = document.querySelector(`input[name="q${index + 1}"]:checked`);
        if (respostaSelecionada) {
            if (respostaSelecionada.value === pergunta.respostaCorreta) {
                acertos++;
                feedback += `<p>Pergunta ${index + 1}: Correto!</p>`;
            } else {
                feedback += `<p>Pergunta ${index + 1}: Incorreto. A resposta correta é ${pergunta.respostaCorreta.toUpperCase()}. </p>`;
            }
        } else {
            feedback += `<p>Pergunta ${index + 1}: Não respondida.</p>`;
        }
    });

    const pontuacao = acertos * 10;

    document.getElementById('resultadoNome').textContent = nomeUsuario || 'Usuário';
    document.getElementById('acertos').textContent = acertos;
    document.getElementById('pontuacao').textContent = pontuacao;
    document.getElementById('feedback').innerHTML = feedback;

    // Placeholder ranking (replace with actual ranking logic)
    let ranking = '';
    if (pontuacao === 100) ranking = '1º';
    else if (pontuacao >= 80) ranking = '2º';
    // ...


    document.getElementById("ranking").textContent = ranking;

    mostrarTela(7);
      // Prevent resubmission (optional)
      document.querySelector('#tela6 button').disabled = true;

      salvarRanking(nomeUsuario || 'Usuário', pontuacao); // Salva o ranking após o jogo
      atualizarRanking(); // Atualiza o ranking na tela 8

}



async function fetchRanking() {
    try {
        const response = await fetch(rankingURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        ranking = await response.json();
    } catch (error) {
        console.error("Error fetching ranking:", error);
        ranking = []; // Initialize with an empty array if fetching fails
    }
}

async function saveRanking(nome, pontuacao) {

    const novoRanking = {
        nome: nome,
        pontuacao: pontuacao,
        timestamp: new Date().getTime()
    };
    ranking.push(novoRanking);

    try {
      const response = await fetch(rankingURL, {
        method: 'POST',  // Use POST to add a new entry. Use PUT to update if you have a specific ID
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ranking), // Send the updated ranking
      });

      if (!response.ok) {
          console.error('Failed to update ranking:', response.status);
          // Optionally, handle the error, e.g., show a message to the user.
      } else {
          console.log('Ranking updated successfully');
      }

    } catch (error) {
        console.error("Error updating ranking data:", error);
    }
}


async function atualizarRanking() {

    await fetchRanking();
    // Sort the ranking by score (descending), then by timestamp (ascending), then by name
    ranking.sort((a, b) => {
        const scoreDiff = b.pontuacao - a.pontuacao;
        if (scoreDiff !== 0) return scoreDiff;

        const timeDiff = a.timestamp - b.timestamp; // Earlier time is better
        if (timeDiff !== 0) return timeDiff;

        return a.nome.localeCompare(b.nome);
    });



    const rankingList = document.getElementById('rankingList');
    rankingList.innerHTML = '';
    ranking.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${item.nome} - ${item.pontuacao} pontos`;
        rankingList.appendChild(listItem);
    });
}





mostrarTela(1); // Show welcome screen initially
fetchRanking(); // Load ranking data when the page loads

