import Home from './../Home/Home';
import List from './../Actors/List';
import Chosen from './../Actors/Chosen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/chosen" element={<Chosen/>} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
