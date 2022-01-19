import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import s from './Searchbar.module.css';

class SearchBar extends Component {
  static propTypes = {
    inputValue: PropTypes.string,
  };

  state = {
    inputValue: '',
  };

  handleChange = event => {
    this.setState({ inputValue: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    //что бы не отправлять запрос, если пользователь ничего не ввел
    if (this.state.inputValue.trim() === '') {
      toast.warn('Введите ваш запрос');
      return;
    }
    this.props.onSubmit(this.state.inputValue); //значение инпута
    this.reset();
  };

  reset = () => {
    this.setState({ inputValue: '' });
  };
  render() {
    const { inputValue } = this.state;

    return (
      <header className={s.searchbar}>
        <form onSubmit={this.handleSubmit} className={s.searchForm}>
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
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  currentPage: PropTypes.number,
  searchQuery: PropTypes.string,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  showModal: PropTypes.bool,
  bigImageUrl: PropTypes.string,
  imageStatus: PropTypes.string,
};

export default SearchBar;
