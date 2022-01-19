import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchBar from 'components/Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from 'services/api';

import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Spinner from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import Loader from 'react-loader-spinner';
import 'App.module.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bigImageUrl, setBigImageUrl] = useState('');
  const [imageStatus, setImageStatus] = useState('loading');

  const onSearchHandle = query => {
    setSearchQuery(query);
    setCurrentPage(1);
    setImages([]);
    // console.log(query);
    // console.log(api);
  };

  //запрос
  useEffect(() => {
    // если прошлый запрос не равен текущему, то отправляем запрос
    // componentDidUpdate(prevProps, prevState) {
    //   if (prevState.searchQuery !== this.state.searchQuery) {
    //     this.fetchImages();
    //     // console.log('prevProps', prevState.searchQuery);
    //     // console.log('prevState', this.state.searchQuery);
    //   }
    // }
    //!проверка - не нравится как работает отрисовывает чистую страницу
    if (!searchQuery) {
      return;
    }

    setIsLoading(true);
    const fetchImagesGallery = async () => {
      const options = {
        searchQuery,
        currentPage,
      };
      try {
        const data = await api.fetchImages(options);
        if (data.data.total === 0) {
          toast.error('Нет совпадений с запросом');
          return;
        }
        const filteredData = data.data.hits.map(hit => {
          // console.log(data);
          return {
            id: hit.id,
            webformatURL: hit.webformatURL,
            largeImageURL: hit.largeImageURL,
          };
        });
        setImages(prevImages => [...prevImages, ...filteredData]);
      } catch (err) {
        console.log(err);
        toast.error('Ошибка');
      } finally {
        setIsLoading(false);
      }
    };
    fetchImagesGallery();
  }, [currentPage, searchQuery]);

  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  //Modal start

  const onImageClick = url => {
    setBigImageUrl(url);
    toggleModal();
    setImageStatus('loading');
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const onImageLoaded = () => {
    setImageStatus('loaded');
  };

  //показать кнопку только в том случае, если длина  массива > 0 и нет загрузки
  const shouldRenderLoadMoreBtn = images.length > 0 && !isLoading;
  return (
    <div>
      {showModal && (
        <Modal onClose={toggleModal}>
          {imageStatus === 'loading' && (
            <Loader type="ThreeDots" color="#fff" height={80} width={80} />
          )}
          <img src={bigImageUrl} alt="" onLoad={onImageLoaded} />
        </Modal>
      )}

      <SearchBar onSubmit={onSearchHandle} />
      <ImageGallery images={images} onClick={onImageClick} />
      {isLoading && <Spinner />}
      {shouldRenderLoadMoreBtn && <Button onClick={loadMore} />}
      <ToastContainer autoClose={3000} />
    </div>
  );
};

App.propTypes = {
  searchQuery: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.object),
  currentPage: PropTypes.number,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  showModal: PropTypes.bool,
  bigImageUrl: PropTypes.string,
  imageStatus: PropTypes.string,
};

export default App;
