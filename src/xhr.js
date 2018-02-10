
import fetchPonyfill from 'fetch-ponyfill';
import { get } from 'lodash';

const { fetch } = fetchPonyfill(Promise);
const origin = get(global || window, 'location.origin', 'http://localhost:3000');

export default {
  get: ({
    type,
    path,
    meta,
  }) => {
    const resourceId = get(meta, 'resourceId');
    const fullPath = resourceId ? `${path}/${resourceId}` : path;
    const promise = fetch(`${origin}${fullPath}`)
      .then((res) => {
        if (res.status >= 400) {
          throw new Error('Bad response from server');
        }
        return res.json();
      })
      .then((res) => {
        if (res.error) {
          throw new Error(res.error);
        }
        return res;
      });

    return {
      type,
      meta,
      payload: promise,
    };
  },
};
