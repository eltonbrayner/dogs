import React from 'react';
import { TOKEN_POST, USER_GET, TOKEN_VALIDATE_POST } from './api';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [load, setLoad] = React.useState(false);
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoad(true);
      const { url, options } = TOKEN_POST({ username, password });
      const tokenRes = await fetch(url, options);
      if (!tokenRes.ok) throw new Error(`Error: ${token.res.statusText}`);
      const { token } = await tokenRes.json();
      window.localStorage.setItem('token', token);
      await getUser(token);
      navigate('/conta');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoad(false);
    }
  }

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  /*Foi solicitado, pelo React no console do navageador, o uso do useCallBack.
  Antes era uma função e agora virou uma constante que recebe o useCallBack asyncrono
  Dentro da função está chamando o NAVIGATE, que é uma função declarada fora do código
  então é preciso passar essa função como dependência dentro das chaves.*/
  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoad(false);
      setLogin(false);
      window.localStorage.removeItem('token');
      navigate('/login');
    },
    [navigate], //é preciso passar como dependência qualquer função ou estado criado do lado de fora e usada dentro do userCallBack
  );

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoad(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error('Token inválido');
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoad(false);
        }
      } else {
        setLogin(false);
      }
    }

    autoLogin();
  }, [userLogout]); //é preciso passar como dependência qualquer função ou estado criado do lado de fora e usada dentro do userEffect

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, load, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
