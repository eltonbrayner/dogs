import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import LoginCreate from './LoginCreate';
import LoginForm from './LoginForm';
import LoginPassLost from './LoginPassLost';
import LoginPassReset from './LoginPassReset';

import styles from './Login.module.css';

/*Esse arquivo Login existe para setar as subrotas que há
  Nessa página aparece, por padrão, o header e o footer (conforme App.js)
  E o seu conteúdo principal é dinamico e trafega por essas subrotas
  Ao acessar a página o que é renderizaro é a rota raiz ("/") LoginForm
  as demais são acessadas pelo componente Link que pertence a biblioteca react-router-dom
*/

const Login = () => {
  const { login } = React.useContext(UserContext);

  if (login) return <Navigate to="/conta" />;
  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="criar" element={<LoginCreate />} />
          <Route path="perdeu" element={<LoginPassLost />} />
          <Route path="resetar" element={<LoginPassReset />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
