import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../UserContext';

import { ReactComponent as MinhasFotos } from '../../Assets/feed.svg';
import { ReactComponent as Estatisticas } from '../../Assets/estatisticas.svg';
import { ReactComponent as AdicionarFoto } from '../../Assets/adicionar.svg';
import { ReactComponent as Sair } from '../../Assets/sair.svg';

import styles from './UserHeaderNav.module.css';
/*  Imagens SVG
As imagens em SVG são importadas com o ReactComponent e recebem um alias ("apelido").
Dessa forma elas se tornam tags e ficam mais faceis de manipular. 
Podendo até passar propriedades pra elas e manipular cor, tamanho, etc...

    NavLink
Assim como o Link ele serve para redirecionar o usuário para determinada página (to="/pagina")
Porém recebe uma propriedade a mais (activeClassName) que possibilita estilizar quando a página estiver ativa através de CSS (Dar uma estilização diferente)
-End
É preciso passar a props END no principal NavLink devido o caminho (/conta) para que os outros links também não fiquem ativos por ter /conta no path to
-activeClassName
Essa props define o estilo do botão quando o link do mesmo for acessado.
É uma forma de destacar a página que o usuário se encontra.
*/

const UserHeaderNav = () => {
  const [mobile, setMobile] = React.useState(null);
  const { userLogout } = React.useContext(UserContext);
  return (
    <nav className={styles.nav}>
      <NavLink to="/conta" end activeClassName={styles.active}>
        <MinhasFotos />
        {mobile && 'Minhas Fotos'}
      </NavLink>
      <NavLink to="/conta/estatisticas" activeClassName={styles.active}>
        <Estatisticas />
        {mobile && 'Estatísticas'}
      </NavLink>
      <NavLink to="/conta/postar" activeClassName={styles.active}>
        <AdicionarFoto />
        {mobile && 'Adicionar Foto'}
      </NavLink>
      <button onClick={userLogout}>
        <Sair />
        {mobile && 'Sair'}
      </button>
    </nav>
  );
};

export default UserHeaderNav;
