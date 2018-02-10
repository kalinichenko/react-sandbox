
import { LOAD_BOOKS_PENDING, LOAD_BOOKS_FULFILLED, LOAD_BOOKS_REJECTED } from '../constants/books';

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_BOOKS_PENDING:
      return {
        isPending: true,
      };

    case LOAD_BOOKS_FULFILLED:
      return {
        isFulfilled: true,
        data: action.payload.data,
      };

    case LOAD_BOOKS_REJECTED:
      return {
        isRejected: true,
        error: action.payload.message,
      };

    default:
      return state;
  }
};
