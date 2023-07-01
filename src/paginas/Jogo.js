import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
//import NovoJogo from './NovoJogo';
import Campo from '../componentes/Campo';
import './Jogo.css';
import '../shared.css';
import jogos, { adicionarJogo, atualizarJogo } from '../banco-dados.js';
import { aleatorioInteiro, novoGuid } from '../utils.js';

function Jogo() {
  const { id } = useParams();
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const modo = parsed.modo;

  const navigate = useNavigate();

  const [jogo, setJogo] = useState(null);

  const [faseAtual, setFaseAtual] = useState(undefined);
  const [pilhaIdFases, setPilhaIdFases] = useState([]);

  const gerarNovaFase = (idFase) => {
    return {
      id: idFase ?? novoGuid(),
      titulo: `[Escreva o título aqui...]`,
      opcoes: [],
    };
  };

  useEffect(() => {
    const jogoEncontrado = jogos.find((j) => j.id === id);

    if (jogoEncontrado) {
      setJogo(jogoEncontrado);
      return;
    }

    const idFaseInicial = novoGuid();

    const novaFase = gerarNovaFase(idFaseInicial);

    const novoJogo = {
      id: id,
      nome: `Jogo #${aleatorioInteiro(1000)}`,
      idFaseInicial: idFaseInicial,
      fases: [novaFase],
    };

    console.log('1111');
    //adicionarJogo(novoJogo);

    setJogo(novoJogo);
    return;
  }, [id]);

  if (!jogo) {
    return <div>Loading...</div>;
  }

  if (!faseAtual) {
    const fase = jogo.fases.find((f) => f.id === jogo.idFaseInicial);
    setFaseAtual(fase);
    setPilhaIdFases((prev) => [...prev, jogo.idFaseInicial]);
    return;
  }

  const selecionarOpcao = (idFaseDestino) => {
    const fase = jogo.fases.find((f) => f.id === idFaseDestino);
    setFaseAtual(fase);
    setPilhaIdFases((prev) => [...prev, idFaseDestino]);
  };

  const voltarFaseAnterior = () => {
    const idFaseAnterior = pilhaIdFases.at(-2);
    if (!idFaseAnterior) {
      return <center>Fase anterior não encontrada</center>;
    }

    const fase = jogo.fases.find((f) => f.id === idFaseAnterior);
    setFaseAtual(fase);

    setPilhaIdFases((prev) => prev.slice(0, -1));
  };

  const sairJogo = () => {
    navigate('/');
  };

  const salvarTituloFase = (id, novoTitulo) => {
    setJogo((prevJogo) => {
      prevJogo.fases = prevJogo.fases.map((fase) => {
        if (fase.id === id) {
          fase.titulo = novoTitulo;
        }

        return fase;
      });

      atualizarJogo(prevJogo.id, prevJogo);
      return prevJogo;
    });
  };

  const salvarOpcaoFase = (id, novoTextoOpcao) => {
    setJogo((prevJogo) => {
      prevJogo.fases = prevJogo.fases.map((fase) => {
        if (fase.id === faseAtual.id) {
          fase.opcoes = fase.opcoes.map((opcao) => {
            if (opcao.id === id) {
              opcao.texto = novoTextoOpcao;
            }

            return opcao;
          });
        }

        return fase;
      });

      atualizarJogo(prevJogo.id, prevJogo);
      return prevJogo;
    });
  };

  const ehModoEditar = () => {
    return modo === 'editar';
  };

  const adicionarNovaOpcao = () => {
    setJogo((prevJogo) => {
      prevJogo.fases = prevJogo.fases.map((fase) => {
        const qtdeMaxOpcoes = 4;

        if (fase.id === faseAtual.id) {
          if (fase.opcoes.length < qtdeMaxOpcoes) {
            fase.opcoes.push({
              id: novoGuid(),
              texto: `Opção #${aleatorioInteiro(1000)}`,
              idFaseDestino: novoGuid(),
            });
          }
          else{
            alert(`Não é possível adicionar mais que ${qtdeMaxOpcoes} opções!!!`)
          }
        }

        return fase;
      });

      const novaFase = gerarNovaFase();

      prevJogo.fases = [...prevJogo.fases, novaFase];

      atualizarJogo(prevJogo.id, prevJogo);
      return prevJogo;
    });
    return;
  };

  return (
    <div className="Jogo">
      <article>
        <header>
          <Campo
            comportamento="h1"
            className="titulo"
            editavel={ehModoEditar()}
            key={faseAtual.id}
            id={faseAtual.id}
            onEdit={salvarTituloFase}
          >
            {faseAtual.titulo}
          </Campo>
        </header>
        <main>
          <div className="lista-opcoes">
            {[...faseAtual.opcoes, null].map((opcao) => {
              if (opcao === null) {
                return ehModoEditar() ? (
                  <button onClick={adicionarNovaOpcao} className="botao">
                    Adicionar opção
                  </button>
                ) : (
                  <></>
                );
              }

              return ehModoEditar() ? (
                <div className="opcao">
                  <Campo
                    key={opcao.id}
                    id={opcao.id}
                    comportamento="h3"
                    editavel={ehModoEditar()}
                    onEdit={salvarOpcaoFase}
                  >
                    {opcao.texto}
                  </Campo>
                  <button
                    className="botao"
                    onClick={() => selecionarOpcao(opcao.idFaseDestino)}
                  >
                    Selecionar
                  </button>
                </div>
              ) : (
                <Campo
                  key={opcao.id}
                  id={opcao.id}
                  comportamento="h3"
                  className="botao-opcao"
                  editavel={ehModoEditar()}
                  onEdit={salvarOpcaoFase}
                  onClick={() => selecionarOpcao(opcao.idFaseDestino)}
                >
                  {opcao.texto}
                </Campo>
              );
            })}
          </div>
        </main>
        <footer>
          {pilhaIdFases.length <= 1 ? (
            <button className="botao" onClick={sairJogo}>
              Sair
            </button>
          ) : (
            <>
              <button className="botao" onClick={voltarFaseAnterior}>
                Voltar
              </button>
              <button className="botao" onClick={sairJogo}>
                Sair
              </button>
            </>
          )}
        </footer>
      </article>
    </div>
  );
}

export default Jogo;
