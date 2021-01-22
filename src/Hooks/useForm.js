import React from 'react';

/*Esse Hooks ele centraliza em um unico arquivo 3 funções: value e setValue (do useState) e onChange
Essas 3 funções são retornadas e atribuidas a variavel que estiver recebendo o hook.
Logo, o código fica mais legivel e separado recebendo os atributos desse hooks da seguinte forma:
const username = useForm();
dentro do username há a função setValeu, há o value e a função onChange que passa pro setValue o valor recebido através do target.

validator[type]
  Essa é uma busca, dentro de um objeto, com uma STRING. Seria a mesma coisa de fazer: 
  validator['email'] pois a variavel type retorna uma string.

regex.test(value)
  test é a função que faz uso do regex e testa se a mesma está dentro das regras do regex.

função validate
  A função é repassada no return desse custom hooks como um metodo que ativa a si mesmo e será chamada dessa forma:
    username.validate()
  Nessa função o objetivo é verificar se o valor informado no input:
    - é maior do que zero
    - tem alguma regex cadastrada para verificação
    - se está de acordo com as regras da regex
  Caso esteja fora de uma dessas regras ele retorna false e finaliza a função setando um erro
  Caso esteja tudo certo ele retorna true e seta null no erro

onBlur
  é uma propriedade do input que, esse hook, será desestruturado sobre o input.
  Essa propriedade vai recebendo um metodo validate(value), ou seja, sempre que o foco sair sobre o input ela ativará esse metodo

onChange
  dentro da função foi inserido também o validate pois, enquanto o usuário digita, o formulário vai validar o valor. (caso exista um erro -> error && validate(target.value))
  com isso o usuário não precisa clicar fora pra só assim verificar se está tudo ok ou errado
  e quando já estiver digitando, após o erro, vai sair a mensagem caso ele acerta as regras solicitadas.
*/

const validator = {
  email: {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha um email valido',
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message:
      'A senha precisa ter 1 caracter maísculo, 1 minúsculo e 1 digito. Com no mínimo 8 caracteres.',
  },
};

const useForm = (type) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(null);

  function onChange({ target }) {
    error && validate(target.value);
    setValue(target.value);
  }

  function validate(value) {
    if (type === false) return true;
    if (value.length === 0) {
      setError('Preencha um valor.');
      return false;
    } else if (validator[type] && !validator[type].regex.test(value)) {
      setError(validator[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  return {
    value,
    setValue,
    error,
    onChange,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
