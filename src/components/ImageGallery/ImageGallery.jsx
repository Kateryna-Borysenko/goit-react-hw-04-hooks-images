import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ images, onClick }) => (
  <ul className={s.imageGallery}>
    <ImageGalleryItem images={images} onClick={onClick} />
  </ul>
);

ImageGallery.propTypes = {
  children: PropTypes.node,
};

export default ImageGallery;
