// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import * as asyncActions from '../actions/asyncActions';
import * as tutorialActions from '../actions/tutorialActions';
import * as userCodeActions from '../actions/userCodeActions';

function mapStateToProps(state) {
  return {
    tutorialActive: state.tutorial.get('active'),
    highlightHelp: state.tutorial.get('highlightHelp'),
    delay: state.async.delay,
    themeIndex: state.userCode.themeIndex,
    themeOptions: state.userCode.themeOptions
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...tutorialActions,
      setDelay: asyncActions.setDelay,
      darkenTheme: userCodeActions.darken,
      lightenTheme: userCodeActions.lighten
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);