import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ExampleTree from '../components/Trees/TreeExample';
import * as verticalTreeActions from '../actions/verticalTreeActions';
import * as asyncActions from '../actions/asyncActions';

function mapStateToProps(state) {
  return {
    treeData: state.verticalTreeData,
    ...state.async,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...verticalTreeActions,
      ...asyncActions,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExampleTree);
