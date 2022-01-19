import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import s from './Searchbar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const reset = () => {
    setInputValue('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (inputValue.trim() === '') {
      toast.warn('Введите ваш запрос');
      return;
    }
    onSubmit(inputValue); //значение инпута
    reset();
  };

  return (
    <header className={s.searchbar}>
      <form onSubmit={handleSubmit} className={s.searchForm}>
        <button type="submit" className={s.searchFormButton}>
          <span className={s.searchFormButtonLabel}>
            <ImSearch />
          </span>
        </button>

        <input
          className={s.searchFormInput}
          type="text"
          value={inputValue}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={e => setInputValue(e.currentTarget.value.toLowerCase())}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  inputValue: PropTypes.string,
};

export default SearchBar;
