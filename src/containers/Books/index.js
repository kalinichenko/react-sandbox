import React from 'react';
import { connect } from 'react-redux';
import {
  map,
} from 'lodash';
import { Link } from 'react-router-dom';
import { string, arrayOf, bool, shape } from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import styled from 'styled-components';

import { getBooks } from '../../actions/books';
import { booksSelector } from '../../selectors/books';


const BookType = shape({
  id: string.isRequired,
  isbn13: string.isRequired,
  title: string.isRequired,
});

const Centered = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class Books extends React.Component {
  static propTypes = {
    data: arrayOf(BookType),
    error: string,
    isPending: bool,
    isFulfilled: bool,
    isRejected: bool,
  }

  static fetchData() {
    return getBooks();
  }

  componentDidMount() {
    const {
      isPending,
      isFulfilled,
      loadData,
    } = this.props;

    if (!isFulfilled && !isPending) {
      loadData();
    }
  }

  render() {
    if (this.props.isFulfilled) {
      const books = map(this.props.data, book =>
        (
          <Link
            to={`/books/${book.id}`}
            key={book.id}
            style={{ textDecoration: 'none' }}
          >
            <ListItem primaryText={book.title} secondaryText={book.isbn13} />
          </Link>
        ));
      return <List>{books}</List>;
    } else if (this.props.isRejected) {
      return <span>{this.props.error}</span>;
    }
    return <Centered><CircularProgress /></Centered>;
  }
}

const mapStateToProps = (state) => booksSelector(state);

export default connect(mapStateToProps, { loadData: getBooks })(Books);

