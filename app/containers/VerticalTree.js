// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import VerticalTree from '../components/VerticalTree';
import * as verticalTreeActions from '../actions/verticalTreeActions';
import * as asyncActions from '../actions/asyncActions';
import * as userCodeActions from '../actions/userCodeActions';

function mapStateToProps(state) {
  return {
    treeData: state.verticalTreeData,
    ...state.userCode,
    ...state.async,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...verticalTreeActions,
      ...asyncActions,
      ...userCodeActions
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VerticalTree);
