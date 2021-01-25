import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Feed from '../Feed/Feed';
import UserHeader from './UserHeader';
import UserPhotoPost from './UserPhotoPost';
import UserStats from './UserStats';

/*Esse arquivo User existe para setar as subrotas que há
  Nessa página aparece, por padrão, o header e o footer (conforme App.js)
  Além do UserHeader que é o Header dentro da area do Usuário
  E o seu conteúdo principal é dinamico e trafega por essas subrotas
  Ao acessar a página o que é renderizaro é a rota raiz ("/") que está como Feed
  as demais são acessadas pelo componente Link que pertence a biblioteca react-router-dom
*/

const User = () => {
  return (
    <section className="container">
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="postar" element={<UserPhotoPost />} />
        <Route path="estatisticas" element={<UserStats />} />
      </Routes>
    </section>
  );
};

export default User;
