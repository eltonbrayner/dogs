import React from 'react';

/*useMedia
-Hooks para capturar o tamanho/mudança da tela do usuário.
-Recebe media (que é o tamanho desejado da tela pra comparação)
a comparação é feita através do matchMedia que vai devolver dizendo true ou false em relação ao max-width ou min-width retornado no media.
Se, por exemplo, for passado 40rem de max-width e a tela for menor que isso então ele devolve true
-Essa função, changeMatch, foi adicionado ao evento de resize através do EventListener.
Sempre que houver um resize da tela esse evento é disparado e consequentemente a função.
-É necessário, sempre que passar um eventlistener pro DOM, remover ele no return.
-Como dependência o useMedia recebe o match
 */

const useMedia = (media) => {
  const [match, setMatch] = React.useState(null);
  React.useEffect(() => {
    function changeMatch() {
      const { matches } = window.matchMedia(media);
      setMatch(matches);
    }

    changeMatch();

    window.addEventListener('resize', changeMatch);
    return () => {
      window.removeEventListener('resize', changeMatch);
    };
  }, [media]);
  return match;
};

export default useMedia;
