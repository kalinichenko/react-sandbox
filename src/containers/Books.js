import React from 'react';
import {connect} from 'react-redux';
import {
  get,
  map,
} from 'lodash';
import {Link} from 'react-router-dom';
import {string, arrayOf, bool, shape} from 'prop-types';
import {getBooks} from '../actions/books';
import {booksSelector} from '../selectors/books';
import { BOOKS_REQUEST } from '../constants/books';
import {List, ListItem} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';

const BookType = shape({
  id: string.isRequired,
  isbn13: string.isRequired,
  title: string.isRequired,
});

const styles = {
  progress: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

class Books extends React.Component {
  static propTypes = {
    data: arrayOf(BookType),
    error: string,
    isPending: bool,
    isFulfilled: bool,
    isRejected: bool,
  }

  componentDidMount() {
    this.props.isFulfilled || this.props.isPending || this.props.getBooks();
  }

  render() {
    if (this.props.isFulfilled) {
      const books = map(this.props.data, (book) =>
        <Link to={book.id} key={book.id} style={{ textDecoration: 'none' }}>
          <ListItem>{book.title}</ListItem>
        </Link>
      );

      return <List>{books}</List>;
    } else if (this.props.isRejected) {
      return <span>{this.props.error}</span>
    }
    return <div style={styles.progress}><CircularProgress /></div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return booksSelector(state);
};

export default connect(mapStateToProps, {getBooks})(Books);
