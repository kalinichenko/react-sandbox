import xhr from '../xhr';
import { LOAD_BOOKS } from '../constants/books';

export const getBooks = () => (dispatch) => {
  const promise = xhr.get({
    type: LOAD_BOOKS,
    path: '/api/books',
  });
  dispatch(promise).catch(() => {
    // send error to the tracking system
  });
};
