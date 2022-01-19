import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ images, onClick }) => (
  <>
    {images.map(({ id, webformatURL, largeImageURL }) => {
      return (
        <li key={id} className={s.imageGalleryItem}>
          <img
            className={s.imageGalleryItemImage}
            onClick={() => onClick(largeImageURL)}
            src={webformatURL}
            alt=""
          />
        </li>
      );
    })}
  </>
);

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
};

export default ImageGalleryItem;
