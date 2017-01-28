// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import * as asyncActions from '../actions/asyncActions';
import * as tutorialActions from '../actions/tutorialActions';

function mapStateToProps(state) {
  return {
    tutorialActive: state.tutorial.get('active'),
    highlightHelp: state.tutorial.get('highlightHelp'),
    delay: state.async.delay,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...tutorialActions,
      setDelay: asyncActions.setDelay,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
