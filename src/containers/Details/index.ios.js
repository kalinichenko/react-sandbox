import React from 'react';
import { connect } from 'react-redux';
import { string, bool, shape } from 'prop-types';
import { Text, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { Link } from 'react-router-native';

import { getDetails } from '../../actions/details';
import { detailsSelector } from '../../selectors/details';

const DetailsType = shape({
  description: string.isRequired,
});

class Details extends React.Component {
  static propTypes = {
    data: DetailsType,
    error: string,
    isPending: bool,
    isFulfilled: bool,
    isRejected: bool,
  };

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
    let content;
    if (this.props.isFulfilled) {
      content = <Text>{this.props.data.description}</Text>;
    } else if (this.props.isRejected) {
      content = <Text>{this.props.error}</Text>;
    } else {
      content = <Text>Loading ...</Text>;
    }

    return (
      <View>
        <Header
          leftComponent={
            <Link to="/">
              <Icon name="chevron-left" color="#fff" />
            </Link>
          }
          centerComponent={{ text: 'REACT SANDBOX', style: { color: '#fff' } }}
        />
        {content}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { details: detailsSelector(state) };
}

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps.details[ownProps.match.params.id],
  loadData: () => {
    dispatchProps.getDetails(ownProps.match.params.id);
  },
});

export default connect(mapStateToProps, { getDetails }, mergeProps)(Details);
