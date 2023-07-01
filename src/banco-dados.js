const jogoExemplo = {
  id: '9d16517d31884b21b5ff04c4bf556351',
  nome: 'Jogo das carreiras',
  idFaseInicial: 'inicio',
  fases: [
    {
      id: 'inicio',
      titulo: 'Você é de Humanas ou de Exatas?',
      opcoes: [
        {
          id: 'humanas',
          texto: 'Humanas',
          idFaseDestino: 'humanas',
        },
        {
          id: 'exatas',
          texto: 'Exatas',
          idFaseDestino: 'exatas',
        },
      ],
    },
    {
      id: 'humanas',
      titulo: 'Gosta de ler?',
      opcoes: [
        {
          id: 'sim',
          texto: 'Sim',
          idFaseDestino: 'gosta-de-ler',
        },
        {
          id: 'nao',
          texto: 'Não',
          idFaseDestino: 'nao-gosta-de-ler',
        },
      ],
    },
    {
      id: 'exatas',
      titulo: 'Gosta de informática',
      opcoes: [
        {
          id: 'sim',
          texto: 'Sim',
          idFaseDestino: 'gosta-de-informatica',
        },
        {
          id: 'nao',
          texto: 'Não',
          idFaseDestino: 'nao-gosta-de-informatica',
        },
      ],
    },
    {
      id: 'gosta-de-ler',
      titulo: 'Você deveria fazer faculdade de Direito',
      opcoes: [],
    },
    {
      id: 'nao-gosta-de-ler',
      titulo: 'Sua faculdade ideal é Administração',
      opcoes: [],
    },
    {
      id: 'gosta-de-informatica',
      titulo: 'Recomendamos que faça Ciência da Computação',
      opcoes: [],
    },
    {
      id: 'nao-gosta-de-informatica',
      titulo:
        'Já pensou em ser professor de Matemática? Esta carreira parece ser bem promissora pra você',
      opcoes: [],
    },
  ],
};

function recuperarJogos(){
    const jogosExistem = Boolean(localStorage.getItem('jogos'));

    if(jogosExistem){
        return JSON.parse(localStorage.getItem('jogos'));
    }

    const jogos = [jogoExemplo];
    salvarJogos(jogos);
    console.log(jogos)
    return jogos;
}

function salvarJogos(jogos){
    const strJogos = JSON.stringify(jogos);
    localStorage.setItem('jogos', strJogos);
}

function adicionarJogo(jogo){
    const jogos = recuperarJogos();
    jogos.push(jogo);
    salvarJogos(jogos);
}

function atualizarJogo(id, jogoAtualizado){
    let jogos = recuperarJogos();
    jogos = jogos.map(jogo => {
      if(jogo.id === id){
        return jogoAtualizado;
      }

      return jogo;
    });
    salvarJogos(jogos);
}

const jogos = recuperarJogos();
export default jogos;

export {
    adicionarJogo,
    atualizarJogo
};