import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import Jogo from './paginas/Jogo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jogo/:id" element={<Jogo />} />
      </Routes>
    </Router>
  );
}

export default App;

/*

App que permite criar um jogo de escolha sua aventura.

--> Tela de Menu:
 - Lista de jogos criados
 - Botão de criar novo jogo

--> Tela de Novo Jogo:
 - Seção para escrever o texto do fase atual
 - Botão para adicionar opção selecionável (vai para outro fase)

*/