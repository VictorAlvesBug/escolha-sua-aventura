import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from 'react-router-dom';
import '../shared.css';
import './Home.css';

function Home() {
  const listaJogosFake = [
    {
      id: 'abcde',
      nome: 'Meu Primeiro Jogo',
      eventoClick: () => {
        console.log('1');
      },
    },
    {
      id: 'fghij',
      nome: 'Joguinho super difícil',
      eventoClick: () => {
        console.log('2');
      },
    },
    {
      id: 'jlkmn',
      nome: 'Esse aqui é meu preferido',
      eventoClick: () => {
        console.log('3');
      },
    },
  ];

  const novoJogo = {
    id: 'novo-jogo',
    nome: 'Novo Jogo',
    eventoClick: () => {
      console.log('Você criou um jogo!');
    },
  };

  return (
    <div className="Home">
      <header className="botoes">
        <button className="botao botao-criar js-btn-criar">
          Criar novo Jogo
        </button>
      </header>
      <main className="lista-jogos">
        {[...listaJogosFake, novoJogo].map((jogo) => {
          return (
            <NavLink key={jogo.id} to={`/jogo/${jogo.id}`} className="item-jogo">
              <span>{jogo.nome}</span>
            </NavLink>
          );
        })}
      </main>
    </div>
  );
}

export default Home;
