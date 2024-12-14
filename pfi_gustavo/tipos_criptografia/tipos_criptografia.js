// Função para carregar as publicações
function carregarPublicacoes() {
  fetch('http://127.0.0.1:5000/publicacoes')
      .then(response => response.json()) // Converte a resposta em JSON
      .then(publicacoes => {
          const container = document.getElementById('publicacoes-container');
          container.innerHTML = ''; // Limpa o container antes de adicionar as publicações
          publicacoes.forEach(pub => {
              const div = document.createElement('div');
              div.classList.add('publicacao');
              div.innerHTML = `
                  <h3>${pub.titulo}</h3>
                  <p>${pub.descricao}</p>
                  <img src="${pub.imagem}" alt="Imagem da publicação" />
              `;
              container.appendChild(div);
          });
      })
      .catch(error => {
          console.error('Erro ao carregar publicações:', error);
      });
}

// Função para criar uma nova publicação
function criarPublicacao(event) {
  event.preventDefault(); 

  const formData = new FormData();
  formData.append('titulo', document.getElementById('titulo').value);
  formData.append('descricao', document.getElementById('descricao').value);
  formData.append('imagem', document.getElementById('imagem').files[0]);

  fetch('http://127.0.0.1:5000/publicar', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json()) 
  .then(publicacao => {
      if (publicacao.titulo) {
          // Limpa os campos após a publicação
          document.getElementById('titulo').value = '';
          document.getElementById('descricao').value = '';
          document.getElementById('imagem').value = '';

          // Exibe a nova publicação na lista
          carregarPublicacoes();
      } else {
          console.error('Erro ao criar a publicação:', publicacao);
      }
  })
  .catch(error => {
      console.error('Erro ao enviar a publicação:', error);
  });
}

// Chama a função para carregar as publicações quando a página for carregada
document.addEventListener('DOMContentLoaded', carregarPublicacoes);

// Adiciona o evento de submissão do formulário
document.getElementById('form-publicacao').addEventListener('submit', criarPublicacao);

// Função para abrir o a tela de criação de publicação
document.getElementById('btn-add-pub').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'block';
});

// Função para fechar a tela
document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'none';
});
