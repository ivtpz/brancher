// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import VerticalTree from '../components/VerticalTree';
import * as verticalTreeActions from '../actions/verticalTreeActions';
import * as asyncActions from '../actions/asyncActions';
import * as tutorialActions from '../actions/tutorialActions';

function mapStateToProps(state) {
  return {
    treeData: state.verticalTreeData,
    userCode: state.userCode,
    tutorialActive: state.tutorial.get('active'),
    tutorialLength: state.tutorial.get('totalPopUps'),
    currentlyDisplayedTutorial: state.tutorial.get('current'),
    ...state.async,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...verticalTreeActions,
      ...asyncActions,
      ...tutorialActions
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VerticalTree);
