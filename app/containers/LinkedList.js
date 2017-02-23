// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LinkedList from '../components/LinkedLists/LinkedList';
import * as linkedListActions from '../actions/linkedListActions';
import * as asyncActions from '../actions/asyncActions';
import * as userCodeActions from '../actions/userCodeActions';

function mapStateToProps(state) {
  return {
    linkedListList: state.linkedListData,
    theme: state.userCode.theme,
    userCode: state.userCode.linkedListCode,
    isDoublyLinked: state.userCode.doublyLinked,
    ...state.async,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...linkedListActions,
      ...asyncActions,
      ...userCodeActions
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedList);
