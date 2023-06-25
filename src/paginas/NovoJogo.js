import { useState } from 'react';
import './NovoJogo.css';
import Campo from '../componentes/Campo';
import { aleatorio, aleatorioInteiro, novoGuid } from '../utils.js';

function NovoJogo() {
  const [listaOpcoes, setListaOpcoes] = useState([]);

  const novaOpcao = {
    id: 0,
    titulo: 'Nova opção...',
  };

  function adicionarNovaOpcao(){
    console.log(aleatorioInteiro(1000));

    setListaOpcoes(prev => {
      return [...prev, {
        id: 9,
        titulo: `Opção ${aleatorioInteiro(1000)}`
      }];
    })
    
  }

  return (
    <div className="NovoJogo">
      <article>
        <header>
          <Campo comportamento="h1" className="titulo">
            Título
          </Campo>
        </header>
        <main>
          <div className="lista-opcoes">
            {[...listaOpcoes, novaOpcao].map((opcao) => {
              if(opcao.id === 0){
                return <button key={opcao.id} onClick={adicionarNovaOpcao}>Adicionar</button>
              }

              return <Campo key={opcao.id} comportamento="h3" className="opcao">{opcao.titulo}</Campo>;
            })}
          </div>
        </main>
      </article>
    </div>
  );
}

export default NovoJogo;
