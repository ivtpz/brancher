import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PopOver from '../components/Popover/PopOver';
import * as tutorialActions from '../actions/tutorialActions';

function mapStateToProps(state) {
  return {
    tutorialActive: state.tutorial.get('active'),
    currentlyDisplayedTutorial: state.tutorial.get('current'),
    delay: state.async.delay,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...tutorialActions,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PopOver);
