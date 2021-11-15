import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import ListarCalles from './views/ListarCalles';
import EditarCalle from './views/EditarCalle';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ListarCalles/>} />
        <Route exact path="/editarcalle/:id" element={<EditarCalle/>}/>
        <Route exact path="/agregar" element={<EditarCalle/>}/>
      </Routes>
    </Router>
  );
}

export default App;
