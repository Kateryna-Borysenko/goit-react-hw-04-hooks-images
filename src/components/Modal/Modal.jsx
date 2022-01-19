import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    //включила в зависимость
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    //выполнить один раз при componentDidMount() при создании
    // console.log('useEffect при маунте');
    window.addEventListener('keydown', handleKeyDown);

    //ф-ция очистки
    return () => {
      // вызов как componentDidMount() перед удалением
      window.removeEventListener('keydown', handleKeyDown);
      // console.log('useEffect при анмаунте');
    };

    //и 1 раз при анмаунте компонента
  }, [onClose]);

  const onBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={onBackdropClick}>
      <div className={s.modal}>{children}</div>
    </div>,
    modalRoot,
  );
};

export default Modal;
