import React from 'react';
import FeedPhotosItem from './FeedPhotosItem';
import useFetch from '../../Hooks/useFetch';
import { PHOTOS_GET } from '../../api';
import Error from '../Help/Error';
import Load from '../Help/Load';
import styles from './FeedPhotos.module.css';

const FeedPhotos = () => {
  const { data, load, error, request } = useFetch();

  React.useEffect(() => {
    async function fetchPhotos() {
      //User 0 = todos os usuários
      const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: 0 });
      const { reponse, json } = await request(url, options);
      console.log(json);
    }

    fetchPhotos();
  }, [request]);

  if (error) return <Error error={error} />;
  if (load) return <Load />;
  if (data)
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.map((el) => (
          <FeedPhotosItem key={el.id} photo={el} />
        ))}
      </ul>
    );
  else return null;
};

export default FeedPhotos;
