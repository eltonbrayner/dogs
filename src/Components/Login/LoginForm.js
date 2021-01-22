import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import { TOKEN_POST, USER_GET } from '../../api';

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

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    token && getUser(token);
  }, []);

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      const { url, options } = TOKEN_POST({
        username: username.value,
        password: password.value,
      });
      const response = await fetch(url, options);
      const json = await response.json();

      window.localStorage.setItem('token', json.token);
      getUser(json.token);
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button>Entrar</Button>
      </form>
      <Link to="/login/criar">Cadastro</Link>
    </section>
  );
};

export default LoginForm;
