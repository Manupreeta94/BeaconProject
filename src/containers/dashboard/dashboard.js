import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignInComponent from '../../components/user/signin';
import PasswordComponent from '../../components/user/retrieve_password';
import HomeComponent from '../../components/home/home';
import WarningComponent from '../../components/warning/warning';
import IncidentComponent from '../../components/incident/incident';
import MeasuresComponent from '../../components/measures/measures';
import WarningDetail from '../../components/warning/warning_detail';
import * as userActions from '../../components/user/actions';
import * as warningActions from '../../components/warning/actions';
import * as homeActions from '../../components/home/actions';

class DashBoardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      navigation: {
        state: { routeName },
      },
    } = this.props;
    if (routeName.includes('signin')) {
      return <SignInComponent {...this.props} />;
    } else if (routeName.includes('retrieve_password')) {
      return <PasswordComponent {...this.props} />;
    } else if (routeName.includes('home')) {
      return <HomeComponent {...this.props} />;
    } else if (routeName.includes('warning')) {
      return <WarningComponent {...this.props} />;
    } else if (routeName.includes('incident')) {
      return <IncidentComponent {...this.props} />;
    } else if (routeName.includes('measures')) {
      return <MeasuresComponent {...this.props} />;
    } else if (routeName.includes('details')) {
      return <WarningDetail {...this.props} />;
    }
    return null;
  }
}

function mapStateToProps(store) {
  return {
    loginResponse: store.userReducer.loginResponse,
    loginError: store.userReducer.loginError,
    warningListResponse: store.warningReducer.warningListResponse,
    warningListError: store.warningReducer.warningListError,
    readUnReadResponse: store.warningReducer.readUnReadResponse,
    readUnReadError: store.warningReducer.readUnReadError,
  };
}

function mapPropsToDispatch(dispatch) {
  return {
    actions: bindActionCreators({
      ...userActions,
      ...warningActions,
      ...homeActions
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapPropsToDispatch)(DashBoardContainer);
