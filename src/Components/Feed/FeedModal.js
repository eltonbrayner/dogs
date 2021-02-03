import React from 'react';
import { PHOTO_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import styles from './FeedModal.module.css';

const FeedModal = ({ photo }) => {
  const { data, error, load, request } = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id);
    request(url, options);
  }, [photo, request]);

  return <div className={styles.modal}></div>;
};

export default FeedModal;
