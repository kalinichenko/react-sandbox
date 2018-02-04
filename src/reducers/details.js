import {get} from 'lodash';

import {LOAD_DETAILS_PENDING, LOAD_DETAILS_FULFILLED, LOAD_DETAILS_REJECTED} from '../constants/details';

export default (state = {}, action) => {
  const resourceId = get(action.meta, 'resourceId');

  switch (action.type) {
    case LOAD_DETAILS_PENDING:
      return {
        ...state,
        [resourceId]: {
          isPending: true,
        }
      }

    case LOAD_DETAILS_FULFILLED:
      return {
        ...state,
        [resourceId]: {
          isFulfilled: true,
          data: action.payload.data
        }
      }

    case LOAD_DETAILS_REJECTED:
    return {
      ...state,
      [resourceId]: {
        isRejected: true,
        error: action.payload.message
      }
    }

    default:
      return state;
  }

};
