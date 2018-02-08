import React from 'react';
import {connect} from 'react-redux';
import {
  get,
  map,
} from 'lodash';
import {string, arrayOf, bool, shape} from 'prop-types';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Header, List, ListItem } from "react-native-elements";
import { Link } from 'react-router-native';

import {getBooks} from '../../actions/books';
import {booksSelector} from '../../selectors/books';
import { BOOKS_REQUEST } from '../../constants/books';

const BookType = shape({
  id: string.isRequired,
  isbn13: string.isRequired,
  title: string.isRequired,
});

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
    let content = <Text>Loading ...</Text>;

    if (this.props.isFulfilled) {
      const books = map(this.props.data, book => {
        return {...book, key: book.id}
      });

      content = (
        <List>
          <FlatList
            data={books}
            renderItem={({item}) => (
              <Link to={item.id}>
                <ListItem title={item.title} subtitle={item.isbn13} />
              </Link>
            )}
          />
        </List>
      );
    } else if (this.props.isRejected) {
      content = <Text>{this.props.error}</Text>;
    }

    return (
      <View>
        <Header centerComponent={{ text: 'REACT SANDBOX', style: { color: '#fff' } }}/>
        {content}
      </View>
    );

  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state, ownProps) => {
  return booksSelector(state);
};

export default connect(mapStateToProps, {getBooks})(Books);
