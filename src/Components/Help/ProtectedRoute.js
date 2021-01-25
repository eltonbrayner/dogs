import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { UserContext } from '../../UserContext';

/* Rota protegida
  Verifica no useContext se o estado está true (esse estado é alterado sempre entre login e logoff)
  Caso true retorna o componente Route (que é o padrão na rota App.js) com todas as props passadas pra esse componente (ProtectedRoute)
  Caso false manda o usuário pra página de login e em caso do estado está como null será retornado null também.
*/

const ProtectedRoute = (props) => {
  const { login } = React.useContext(UserContext);

  if (login) return <Route {...props} />;
  else if (login === false) return <Navigate to="/login" />;
  else return null;
};

export default ProtectedRoute;
