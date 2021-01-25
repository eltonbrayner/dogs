import React from 'react';

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [load, setLoad] = React.useState(false);

  //Função request criada dentro do useCallback para não ser renderizada sempre que as demais propriedades foram chamadas.
  //Foi passado uma arrow function asincrona e anonima.
  const request = React.useCallback(async (url, options) => {
    let response;
    let json;
    try {
      setError(null);
      setLoad(true);
      response = await fetch(url, options);
      json = await response.json();
      if (response.ok === false) throw new Error(json.message);
    } catch (error) {
      json = null; //Caso exista algum erro o setData (do finally) vai ser null
      setError(error.message);
    } finally {
      setData(json);
      setLoad(false);
      return {
        response,
        json,
      };
    }
  }, []);

  return {
    data,
    error,
    load,
    request,
  };
};

export default useFetch;
