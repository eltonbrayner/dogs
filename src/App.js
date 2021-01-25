import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Components/Home';
import Login from './Components/Login/Login';

import { UserStorage } from './UserContext';
import User from './Components/User/User';
import ProtectedRoute from './Components/Help/ProtectedRoute';

//React Router Dom
//  Engloba todas os componentes
//  Header e Footer estarão presentes em todas as páginas
//  O contéudo vai transitar dentro das ROUTES e terão sempre Header e Footer
//
//  A rota login possui uma barra e um asteristico a mais (/*) no fim
//  Essas caractéristicas justificam que haverá subrotas no Login
//  Como por exemplo: login/criar, login/perdeu e login/resetar
//  Todas as subrotas estão descritas no arquivo Login.js
//  que tem como rota raiz/principal (/) o LoginForm.js

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login/*" element={<Login />} />
            <ProtectedRoute path="conta/*" element={<User />} />
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
