import xhr from '../xhr';
import {LOAD_BOOKS, LOAD_BOOKS_REJECTED} from '../constants/books';

export const getBooks = () => (dispatch, getState) => {
  const promise = xhr.get({
    type: LOAD_BOOKS,
    url: '/api/books',
  });
  dispatch(promise).catch(error => {
    // send error to the tracking system
  });
}
