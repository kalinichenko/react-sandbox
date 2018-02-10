import React from 'react';
import { connect } from 'react-redux';
import {
  map,
} from 'lodash';
import { string, arrayOf, bool, shape } from 'prop-types';
import { Text, View, FlatList } from 'react-native';
import { Header, List, ListItem } from 'react-native-elements';
import { Link } from 'react-router-native';

import { getBooks } from '../../actions/books';
import { booksSelector } from '../../selectors/books';

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
    let content = <Text>Loading ...</Text>;

    if (this.props.isFulfilled) {
      const books = map(this.props.data, book => ({ ...book, key: book.id }));

      content = (
        <List containerStyle={{ marginTop: 0 }}>
          <FlatList
            data={books}
            renderItem={({ item }) => (
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
        <Header centerComponent={{ text: 'REACT SANDBOX', style: { color: '#fff' } }} />
        {content}
      </View>
    );
  }
}


const mapStateToProps = (state) => booksSelector(state);

export default connect(mapStateToProps, { loadData: getBooks })(Books);
