import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Dogs } from '../Assets/dogs.svg'; //Faz da img (svg) um componente

import { UserContext } from '../UserContext';

//React Router Dom (LINK)
//  Link é o componente responsavel por redirecionar para uma página especifica
//    aria-label: Da um nome a imagem melhorando a acessibilidade da página

//ClassName com Template String
//  nav recebeu 2 classes: a primeira dinamica com CSS Modules e a segunda statica da App.js

const Header = () => {
  const { data, userLogout } = React.useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Dogs - Home">
          <Dogs />
        </Link>
        {data ? (
          <Link className={styles.login} to="/conta">
            {data.nome}
            <button onClick={userLogout}>Sair</button>
          </Link>
        ) : (
          <Link className={styles.login} to="/login">
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
