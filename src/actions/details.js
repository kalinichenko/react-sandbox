import xhr from '../xhr';
import {LOAD_DETAILS} from '../constants/details';

export const getDetails = (id) => (dispatch, getState) => {
  const promise = xhr.get({
    path: '/api/books',
    type: LOAD_DETAILS,
    meta: {resourceId: id}
  });

  dispatch(promise).catch(error => {
    // send error to the tracking system
  });
}
