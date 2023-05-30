
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Inicio from './fragment/Inicio';
import Listar from './fragment/Listar';
import RegistrarActividades from './fragment/RegistrarActividades';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Inicio/>}/>
      <Route path='/listar' element={<Listar/>}/>
      <Route path='/agregar' element={<RegistrarActividades/>}/>
    </Routes>
  );
}

export default App;
