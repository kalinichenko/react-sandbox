
import Books from './containers/Books';
import Details from './containers/Details';

export default [
  {
    component: Books,
    path: '/books',
    exact: true,
  }, {
    component: Details,
    path: '/books/:id',
    exact: true,
  },
];
