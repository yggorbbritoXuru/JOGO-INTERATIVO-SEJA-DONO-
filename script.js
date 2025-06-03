// script.js
let nomeUsuario = '';
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

    mostrarTela(6); // <-- This line was missing!  Now it shows tela6 (the quiz)
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


function salvarRanking(nome, pontuacao) {
    let ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    ranking.push({ nome, pontuacao });
    // Ordenar o ranking por pontuação (decrescente) e depois por nome (alfabética)
    ranking.sort((a, b) => b.pontuacao - a.pontuacao || a.nome.localeCompare(b.nome));
    localStorage.setItem('ranking', JSON.stringify(ranking));
}


function atualizarRanking() {
    let ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    const rankingList = document.getElementById('rankingList');
    rankingList.innerHTML = '';

    ranking.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${item.nome} - ${item.pontuacao} pontos`;
        rankingList.appendChild(listItem);
    });
}

mostrarTela(1);