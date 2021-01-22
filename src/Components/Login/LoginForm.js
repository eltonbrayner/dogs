import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';

import { UserContext } from '../../UserContext';
import Error from '../Help/Error';

import styles from './LoginForm.module.css';
import stylesBtn from '../Forms/Button.module.css';

/*useForm
  useForm é um hook custom que, em resumo, retorna algumas funções:
    - value e setValue do useState 
    - onchange (que pega o value do target do input) e retorna com o setValue para o Value
    - error que recebe um setError caso o validate dê false em alguma das regras
    - validate é a função de validação (ex: username.validate() pode ser antes do fetch no submit)
    - onBlur chama a função validate pegando como parametro o value do proprio useHooks também
  ele é desestruturado dentro das propriedades do meu component custom Input

  Fetch API
  - Os parametros do fetch foram separadas (url, options[headers,body,etc])
  - A função do handleSubmit se tornou async, logo não precisa mais do .then e virou duas constantes response (que recebe o retorno do fetch como JSON) e JSON que recebe o retorno como objeto
*/

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const { userLogin, error, load } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {load ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error} />
      </form>
      <Link className={styles.perdeu} to="/login/perdeu">
        Perdeu a Senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
      </div>
      <Link className={stylesBtn.button} to="/login/criar">
        Cadastro
      </Link>
    </section>
  );
};

export default LoginForm;
