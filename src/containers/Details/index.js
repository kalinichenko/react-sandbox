import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import { string, bool, shape } from 'prop-types';
import styled from 'styled-components';

import { getDetails } from '../../actions/details';
import {
  detailsSelector,
} from '../../selectors/details';

const Centered = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
  }

  static fetchData(match) {
    return getDetails(match.params.id);
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
    const {
      isRejected,
      isFulfilled,
      data,
      error,
    } = this.props;

    if (isFulfilled) {
      return <span>{data.description}</span>;
    } else if (isRejected) {
      return <span>{error}</span>;
    }
    return <Centered><CircularProgress /></Centered>;
  }
}

function mapStateToProps(state) {
  return { details: detailsSelector(state) };
}

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps.details[ownProps.match.params.id],
  loadData: () => { dispatchProps.getDetails(ownProps.match.params.id); },
});

export default connect(mapStateToProps, { getDetails }, mergeProps)(Details);
