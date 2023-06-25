import './NovoJogo.css';

function NovoJogo() {
  const listaOpcoesFake = [
    { id: 1, titulo: 'opt1' },
    { id: 2, titulo: 'opt2' },
    { id: 3, titulo: 'opt3' },
  ];

  const novaOpcao = {
    id: 0,
    titulo: '',
  };

  return (
    <div className="NovoJogo">
      <article>
        <h1>Titulo</h1>
        <ul className="lista-opcoes">
          {[...listaOpcoesFake, novaOpcao].map((opcao) => {
            if (opcao.id === 0) {
              return (
                <li key={opcao.id}>
                  <input />
                </li>
              );
            }

            return <li key={opcao.id}>{opcao.titulo}</li>;
          })}
        </ul>
      </article>
    </div>
  );
}

export default NovoJogo;
