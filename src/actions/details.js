import xhr from '../xhr';
import { LOAD_DETAILS } from '../constants/details';

export const getDetails = id => (dispatch) => {
  const promise = xhr.get({
    path: '/api/books',
    type: LOAD_DETAILS,
    meta: { resourceId: id },
  });

  return dispatch(promise).catch(() => {
    // send error to the tracking system
  });
};
