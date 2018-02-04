require('es6-promise').polyfill();
import 'isomorphic-fetch';
import {get} from 'lodash';

export default {
  get: ({type, url, meta, dispatch}) => {
    const resourceId = get(meta, 'resourceId');
    const _url = resourceId ? `${url}/${resourceId}` : url;
    const promise = fetch(_url)
      .then(res => {
        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }
        return res.json();
      })
      .then(res => {
        if (res.error) {
          throw new Error(res.error);
        }
        return res;
      })

    return {
      type,
      meta,
      payload: promise,
    };
  },
}
