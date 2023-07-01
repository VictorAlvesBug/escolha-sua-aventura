import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from 'react-router-dom';
import '../shared.css';
import './Home.css';
import jogos, { atualizarJogo } from '../banco-dados.js';
import { novoGuid } from '../utils.js';
import Campo from '../componentes/Campo';

function Home() {

const salvarNomeJogo = (id, nomeJogo) => {
  console.log(id, nomeJogo)
  jogos.forEach(jogo => {
    if(jogo.id === id){
      jogo.nome = nomeJogo;
    }

    atualizarJogo(id, jogo);
    //return jogo;
  });
};

  return (
    <div className="Home">
      <header>
        <h2>Meus Jogos</h2>
      </header>
      <main className="lista-jogos">
        {[...jogos, null].map((jogo) => {
          if (!jogo) {
            const idNovoJogo = novoGuid();

            return (
              <NavLink
                key={`${idNovoJogo}-novo`}
                to={`/jogo/${idNovoJogo}?modo=editar`}
                className="item-jogo-opcao"
              >
                Novo Jogo
              </NavLink>
            );
          }

          return (
            <div className="item-jogo">
              <Campo
                comportamento="h3"
                editavel={true}
                id={jogo.id}
                onEdit={salvarNomeJogo}
              >
                {jogo.nome}
              </Campo>
              <div className="item-jogo-opcoes">
                <NavLink
                  key={`${jogo.id}-editar`}
                  to={`/jogo/${jogo.id}?modo=editar`}
                  className="item-jogo-opcao"
                >
                  Editar
                </NavLink>
                <NavLink
                  key={`${jogo.id}-jogar`}
                  to={`/jogo/${jogo.id}?modo=jogar`}
                  className="item-jogo-opcao"
                >
                  Jogar
                </NavLink>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default Home;
