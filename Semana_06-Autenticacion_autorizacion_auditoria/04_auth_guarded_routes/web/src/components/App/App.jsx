import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Contacto } from '../Contacto/Contacto';
import { Login } from '../Login/Login';
import { Dashboard } from '../Dashboard/Dashboard';
import { Actors } from '../Actors/Actors';
import { Films } from '../Films/Films';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { UserProvider } from '../UserContext/UserContext';
import './App.css';

function App() {

  return (
    <UserProvider>
      <Router basename="/app">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/restricted/dashboard" element={
            <ProtectedRoute mustBeAdmin={false}>
              {<Dashboard />}
            </ProtectedRoute>
          } />
          <Route path="/restricted/actors" element={
            <ProtectedRoute mustBeAdmin={false}>
              {<Actors />}
            </ProtectedRoute>
          } />
          <Route path="/restricted/films" element={
            <ProtectedRoute mustBeAdmin={true}>
              {<Films />}
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
