import { useState } from 'react';
//import './NovoJogo.css';
import Campo from '../componentes/Campo';
import { aleatorio, aleatorioInteiro, novoGuid } from '../utils.js';

function NovoJogo() {
  const [listaOpcoes, setListaOpcoes] = useState([]);

  const novaOpcao = {
    id: '',
    titulo: 'Nova opção...',
  };

  function adicionarNovaOpcao(){
    setListaOpcoes(prev => {
      return [...prev, {
        id: novoGuid(),
        titulo: `Opção #${aleatorioInteiro(1000)}`
      }];
    })
  }

  return (
    <div className="NovoJogo">
      <article>
        <header>
          <Campo comportamento="h1" className="titulo">
            Jogo #{aleatorioInteiro(1000)}
          </Campo>
        </header>
        <main>
          <div className="lista-opcoes">
            {[...listaOpcoes, novaOpcao].map((opcao) => {
              if(opcao.id === ''){
                return <button key={opcao.id} onClick={adicionarNovaOpcao} className="botao">Adicionar opção</button>
              }

              return (
                <div className="opcao">
                  <Campo key={opcao.id} comportamento="h3">{opcao.titulo}</Campo>
                  <button className="botao">Selecionar</button>
                </div>
              );
            })}
          </div>
        </main>
      </article>
    </div>
  );
}

export default NovoJogo;
