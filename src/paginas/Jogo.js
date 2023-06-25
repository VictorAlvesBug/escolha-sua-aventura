import { useParams } from 'react-router-dom';
import NovoJogo from './NovoJogo';
import '../shared.css';

function Jogo() {
  const { id } = useParams();

  if (id === 'novo-jogo') {
    return <NovoJogo />;
  }
  return <div>Jogo</div>;
}

export default Jogo;
