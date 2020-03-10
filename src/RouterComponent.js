import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DashBoardContainer from './containers/dashboard/dashboard';
// import list_container from './containers/list_container';
const ConnectedRouter = connect()(Router);

console.disableYellowBox = true;

// const tabIcons = [
//   {
//     active: require("../img/search_active.png"),
//     inactive: require("../img/search_inactive.png")
//   },
//   {
//     active: require("../img/callender_active.png"),
//     inactive: require("../img/callender_inactive.png")
//   },
//   {
//     active: require("../img/chat_active.png"),
//     inactive: require("../img/chat_inactive.png")
//   },
//   {
//     active: require("../img/profile_active.png"),
//     inactive: require("../img/profile_inactive.png")
//   }
// ];

// const TabIcon0 = obj => {
//   return (
//     <Image source={obj.focused ? tabIcons[0].active : tabIcons[0].inactive} />
//   );
// };

// const TabIcon1 = obj => {
//   return (
//     <Image source={obj.focused ? tabIcons[1].active : tabIcons[1].inactive} />
//   );
// };

// const TabIcon2 = obj => {
//   return (
//     <Image source={obj.focused ? tabIcons[2].active : tabIcons[2].inactive} />
//   );
// };

// const TabIcon3 = obj => {
//   return (
//     <Image source={obj.focused ? tabIcons[3].active : tabIcons[3].inactive} />
//   );
// };

class RouterComponent extends Component {
  render() {
    return (
      <ConnectedRouter>
        <Scene key="root">
          <Scene
            key="signin"
            hideNavBar
            initial={true}
            // backButtonImage={require('../img/arrow_white.png')}
            // navigationBarStyle={{
            //   backgroundColor: '#FEAE1B',
            //   color: 'white',
            // }}
            // titleStyle={
            //   (style = {
            //     width: '100%',
            //     color: 'white',
            //   })
            // }
            // title={`Log In`}
            component={DashBoardContainer}
          />

          <Scene
            key="retrieve_password"
            // hideNavBar
            // initial={true}
            backButtonImage={require('../img/arrow.png')}
            navigationBarStyle={{
              backgroundColor: '#DAE9EA',
              color: 'black',
            }}
            titleStyle={
              (style = {
                width: '100%',
                color: 'black',
              })
            }
            title={`Retrieve Password`}
            component={DashBoardContainer}
          />

          <Scene
            key="details"
            // hideNavBar
            // initial={true}
            backButtonImage={require('../img/arrow.png')}
            navigationBarStyle={{
              backgroundColor: '#DAE9EA',
              color: 'black',
            }}
            titleStyle={
              (style = {
                width: '100%',
                color: 'black',
              })
            }
            title={`Details`}
            component={DashBoardContainer}
            onRight={() => { Actions.home({ type: 'reset' }) }}
            rightButtonImage={require('../img/home.png')}
          />

          <Scene
            key="home"
            // hideNavBar
            // initial={true}
            // backButtonImage={require('../img/arrow.png')}
            navigationBarStyle={{
              backgroundColor: '#DEEBF4',
              color: 'black',
            }}
            titleStyle={
              (style = {
                width: '100%',
                color: 'black',
              })
            }
            title={`Gebäudeinformationsservice`}
            component={DashBoardContainer}
            onRight={() => { Actions.signin() }}
            rightButtonImage={require('../img/logout.png')}
          />

          <Scene
            key="warning"
            //option 1
            // hideNavBar
            // initial={true}
            backButtonImage={require('../img/arrow.png')}
            navigationBarStyle={{
              backgroundColor: '#DEEBF4',
              color: 'black',
            }}
            titleStyle={
              (style = {
                width: '100%',
                color: 'black',
              })
            }
            title={`Warnung`}
            component={DashBoardContainer}
          // onRight={() => { Actions.signin() }}
          // rightButtonImage={require('../img/logout.png')}
          />

          <Scene
            key="incident"
            //option 2
            // hideNavBar
            // initial={true}
            backButtonImage={require('../img/arrow.png')}
            navigationBarStyle={{
              backgroundColor: '#DEEBF4',
              color: 'black',
            }}
            titleStyle={
              (style = {
                width: '100%',
                color: 'black',
              })
            }
            title={`Störung`}
            component={DashBoardContainer}
            onRight={() => { Actions.signin() }}
            rightButtonImage={require('../img/logout.png')}
          />

          <Scene
            key="measures"
            //option 3
            // hideNavBar
            // initial={true}
            backButtonImage={require('../img/arrow.png')}
            navigationBarStyle={{
              backgroundColor: '#DEEBF4',
              color: 'black',
            }}
            titleStyle={
              (style = {
                width: '100%',
                color: 'black',
              })
            }
            title={`Maßnahmen`}
            component={DashBoardContainer}
            onRight={() => { Actions.signin() }}
            rightButtonImage={require('../img/logout.png')}
          />

          {/* <Scene
            hideNavBar
            // initial={true}
            key="tabBar"
            tabs={true}
            tabBarPosition="bottom"
            lazy
            swipeEnabled={false}
            legacy={true}
            showLabel={false}
            headerLayoutPreset="center"
            tabBarStyle={{ backgroundColor: "#FFF" }}
            titleStyle={{ flex: 1, textAlign: "center" }}
          >
            <Scene
              key="home"
              title="Home"
              icon={TabIcon0}
              component={DashBoardContainer}
              tabBarStyle={{ backgroundColor: "#FFF" }}
              tabBarOnPress={obj => Actions.home()}
              navigationBarStyle={{ backgroundColor: '#DAE9EA' }}
              titleStyle={
                (style = {
                  width: "100%",
                  color: "black",
                  fontSize: 24,
                })
              }
              onRight={() => { Actions.signin() }}
              rightButtonImage={require('../img/logout.png')}
            />
            <Scene
              key="warning"
              title="Warning"
              icon={TabIcon1}
              component={DashBoardContainer}
              tabBarStyle={{ backgroundColor: "#FFF" }}
              tabBarOnPress={obj => Actions.warning()}
              navigationBarStyle={{ backgroundColor: '#DAE9EA' }}
              titleStyle={
                (style = {
                  width: "100%",
                  color: "black",
                  fontSize: 24
                })
              }
              onRight={() => { Actions.signin() }}
              rightButtonImage={require('../img/logout.png')}
            />
            <Scene
              key="disorder"
              title="Disorder"
              icon={TabIcon2}
              component={DashBoardContainer}
              tabBarStyle={{ backgroundColor: "#FFF" }}
              tabBarOnPress={obj => Actions.disorder()}
              navigationBarStyle={{ backgroundColor: '#DAE9EA' }}
              titleStyle={
                (style = {
                  width: "100%",
                  color: "black",
                  fontSize: 24
                })
              }
              onRight={() => { Actions.signin() }}
              rightButtonImage={require('../img/logout.png')}
            />
            <Scene
              key="activities"
              title="Activities"
              icon={TabIcon3}
              component={DashBoardContainer}
              tabBarStyle={{ backgroundColor: "#FFF" }}
              tabBarOnPress={obj => Actions.activities()}
              navigationBarStyle={{ backgroundColor: '#DAE9EA' }}
              titleStyle={
                (style = {
                  width: "100%",
                  color: "black",
                  fontSize: 24
                })
              }
              onRight={() => { Actions.signin() }}
              rightButtonImage={require('../img/logout.png')}
            />
          </Scene> */}
        </Scene>
      </ConnectedRouter>
    );
  }
}

function mapStateToProps(store) {
  return {};
}

function mapPropsToDispatch(dispatch) {
  return {
    actions: bindActionCreators(dispatch),
  };
}

export default connect(mapStateToProps, mapPropsToDispatch)(RouterComponent);
