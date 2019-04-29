import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LinkedList from '../components/LinkedLists/LinkedList';
import * as linkedListActions from '../actions/linkedListActions';
import * as asyncActions from '../actions/asyncActions';
import * as userCodeActions from '../actions/userCodeActions';
import * as windowActions from '../actions/windowActions';

function mapStateToProps(state) {
  return {
    linkedListList: state.linkedListData,
    theme: state.userCode.theme,
    userCode: state.userCode.linkedListCode,
    isDoublyLinked: state.userCode.doublyLinked,
    aceErrors: state.userCode.aceErrors,
    ...state.async,
    ...state.windowReducers
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...linkedListActions,
      ...asyncActions,
      ...userCodeActions,
      ...windowActions
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedList);
