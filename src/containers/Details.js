import React from 'react';
import {connect} from 'react-redux';
import {get} from 'lodash';
import CircularProgress from 'material-ui/CircularProgress';
import {string, arrayOf, bool, shape} from 'prop-types';
import styled from 'styled-components';

import {getDetails} from '../actions/details';
import {
  detailsSelector,
} from '../selectors/details';

const Centered = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

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

  componentDidMount() {
    this.props.isFulfilled || this.props.isPending || this.props.getDetails();
  }

  render() {
    if (this.props.isFulfilled) {
      return <span>{this.props.data.description}</span>
    } else if (this.props.isRejected) {
      return <span>{this.props.error}</span>
    }
    return <Centered><CircularProgress /></Centered>;
  }
}

function mapStateToProps(state) {
  return { details: detailsSelector(state) }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...stateProps.details[ownProps.match.params.id],
    getDetails: () => {dispatchProps.getDetails(ownProps.match.params.id)},
  };
}

export default connect(mapStateToProps, {getDetails}, mergeProps)(Details);
