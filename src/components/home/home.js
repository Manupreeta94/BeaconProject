import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
// import {colors, fonts} from '../../CommonStyles';
// import { isEmpty } from 'lodash';
import { Actions } from 'react-native-router-flux';
import { isNetworkAvailable } from '../../utils/helpers';
import Toast from 'react-native-simple-toast';

// import CellComponent from '../../components/cell_component/cell_component';

// const data = [{ title: "test", body: "testtt" }, { title: "test", body: "testtt" }]

export default class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      notifications: [],
      warning_count: '',
      accident_count: '',
      planned_count: '',
      warning_unread: '',
      accident_unread: '',
      plannedmeasures_unread: ''
    };
    this.willFocus = this.props.navigation.addListener("willFocus", () => {
      this.getNotificationCount();
    });
  }

  componentDidMount() {
    if (this.props.isFromLogin) {
      setTimeout(
        function () {
          Toast.show('Login Successful');
        }, 500
      );
    }
    this.saveFcmToken();
    // this.getNotificationCount();
  }

  getCount = () => {
    if (isNetworkAvailable) {
      this.setState({ spinner: !this.state.spinner });
      this.props.actions
        .getCount(this.props.loginResponse.userManagementResponse.userName)
        .then(response => {
          // console.log(" ressspo  ", response)
          this.setState({ spinner: false }, () => {
            if (response.notificationResponseCode == 10000) {
              this.setState({
                //warning_count: response.warningCount,
                //accident_count: response.accidentCount,
                //planned_count: response.plannedMeasuresCount,
                warning_unread: response.warningUnReadCount,
                accident_unread: response.accidentUnReadCount,
                plannedmeasures_unread: response.plannedMeasuresUnReadCount
              })
            } else {
              setTimeout(
                function () {
                  Toast.show('Failed to get count.');
                }, 500
              );
            }
          });
        })
        .catch(error => {
          this.setState({ spinner: false }, () => {
            Toast.show("Something went wrong. Please try again later!");
          });
        });
    } else {
      this.setState({ spinner: false }, () => {
        alert("You don't have internet connection, Please try again.");
      });
    }
  };

  getNotificationCount = () => {
    if (isNetworkAvailable) {
      this.setState({ spinner: !this.state.spinner });
      this.props.actions
        .getNotificationCount(this.props.loginResponse.userManagementResponse.userName)
        .then(response => {
          // console.log(" ressspo  ", response)
          this.setState({ spinner: false }, () => {
            if (response.notificationResponseCode == 10000) {
              this.setState({
                warning_count: response.warningCount,
                accident_count: response.accidentCount,
                planned_count: response.plannedMeasuresCount,
                warning_unread: response.warningUnReadCount,
                accident_unread: response.accidentUnReadCount,
                plannedmeasures_unread: response.plannedMeasuresUnReadCount
              })
            } else {
              setTimeout(
                function () {
                  Toast.show('Failed to get count.');
                }, 500
              );
            }
          });
        })
        .catch(error => {
          this.setState({ spinner: false }, () => {
            Toast.show("Something went wrong. Please try again later!");
          });
        });
    } else {
      this.setState({ spinner: false }, () => {
        alert("You don't have internet connection, Please try again.");
      });
    }
  };

  saveFcmToken = async () => {
    if (isNetworkAvailable) {
      this.setState({ spinner: !this.state.spinner });
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      let data = {
        to: fcmToken,
        beaconUniqueId: "A0E6F85455DA",
        username: this.props.loginResponse.userManagementResponse.userName
      }
      this.props.actions
        .saveFcmToken(data)
        .then(response => {
          // console.log(" ressspo  ", response)
          this.setState({ spinner: false }, () => {
            // if (response.notificationResponseCode == 10000) {
            //   this.setState({
            //     warning_count: response.warningCount,
            //     accident_count: response.accidentCount,
            //     planned_count: response.plannedMeasuresCount
            //   })
            // } else {
            //   setTimeout(
            //     function () {
            //       Toast.show('Failed to save count.');
            //     }, 500
            //   m);
            // }
          });
        })
        .catch(error => {
          this.setState({ spinner: false }, () => {
            // Toast.show("Something went wrong. Please try again later!");
          });
        });
    } else {
      this.setState({ spinner: false }, () => {
        alert("You don't have internet connection, Please try again.");
      });
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />

        <View style={{
          flex: 0.4,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
          <Image
            style={{
              // width: "90%",
              height: "70%",
              // flex:0.9,
              // marginTop: 20,
            }}
            resizeMode="contain"
            source={require('../../../img/thumbup.png')}
          />
        </View>

        <View style={{ flex: 0.6, margin: 10 }}>
          <View style={{ width: '100%' }}>
            <View style={{ ...styles.optionContainer }}>
              <TouchableOpacity style={{ ...styles.buttonContainer }}
                activeOpacity={0.5}
                onPress={() => {
                  Actions.warning({ category: 'Sanierung' });
                }}>
                <View style={{ flexDirection: "row", width: "80%", alignItems: "center" }}>
                  <Image style={{ ...styles.iconStyle }}
                    resizeMode="contain"
                    source={require('../../../img/warning.png')} />
                  
                  <Text style={{ ...styles.buttonText }}>Warnung</Text>
                </View>
                <View style={{ ...styles.arrowContainer }}>
                  <Text style={{ ...styles.countText }}>{this.state.warning_unread} / {this.state.warning_count}</Text>
                  <Image style={{ ...styles.arrowIconStyle }}
                    resizeMode="contain"
                    source={require('../../../img/arrow_gray.png')} />
                </View>
              </TouchableOpacity>
            </View>
            {/* <View style={{ ...styles.seperatorLine }}></View> */}

            <View style={{ ...styles.optionContainer }}>
              <TouchableOpacity style={{ ...styles.buttonContainer }}
                activeOpacity={0.5}
                onPress={() => {
                  Actions.warning({ category: 'Störung' });
                }}>
                <View style={{ flexDirection: "row", width: "80%", alignItems: "center" }}>
                  <Image style={{ ...styles.iconStyle }}
                    resizeMode="contain"
                    source={require('../../../img/alarm.png')} />
                  <Text style={{ ...styles.buttonText }}>Störung</Text>
                </View>
                <View style={{ ...styles.arrowContainer }}>
                  <Text style={{ ...styles.countText }}>{this.state.accident_unread} / {this.state.accident_count}</Text>
                  <Image style={{ ...styles.arrowIconStyle }}
                    resizeMode="contain"
                    source={require('../../../img/arrow_gray.png')} />
                  {/* <Text style={{ ...styles.buttonText }}>Storungen</Text> */}
                </View>
              </TouchableOpacity>
            </View>

            {/* <View style={{ ...styles.seperatorLine }}></View> */}

            <View style={{ ...styles.optionContainer }}>
              <TouchableOpacity style={{ ...styles.buttonContainer }}
                activeOpacity={0.5}
                onPress={() => {
                  Actions.warning({ category: 'Geplante Maßnahmen' });
                }}>
                <View style={{ flexDirection: "row", width: "80%", alignItems: "center" }}>
                  <Image style={{ ...styles.iconStyle }}
                    resizeMode="contain"
                    source={require('../../../img/tool.png')} />
                  <Text style={{ ...styles.buttonText }}>Maßnahmen</Text>
                </View>
                <View style={{ ...styles.arrowContainer }}>
                <Text style={{ ...styles.countText }}>{this.state.plannedmeasures_unread} / {this.state.planned_count}</Text>
                  <Image style={{ ...styles.arrowIconStyle }}
                    resizeMode="contain"
                    source={require('../../../img/arrow_gray.png')} />
                  {/* <Text style={{ ...styles.buttonText }}>Storungen</Text> */}
                </View>
              </TouchableOpacity>
            </View>

            {/* <View style={{ ...styles.seperatorLine }}></View> */}


          </View>

        </View>

        {/* <View style={{ flex: 0.7 }}>
          <FlatList
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            showsVerticalScrollIndicator={false}
            data={data}
            refreshing={false}
            // onRefresh={() => {
            //   this.getNotificationList();
            // }}
            ListEmptyComponent={() =>
              isEmpty(data) ? (
                <Text
                  style={{
                    ...styles.emptyMessageStyle,
                    color: 'black',
                    fontSize: 20,
                    opacity: 0.5,
                  }}>
                  No Available Notification List
              </Text>
              ) : null
            }
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => { Actions.details() }}>
                <CellComponent
                  key={index}
                  title={item.title}
                  image={item.image}
                  price={item.body}
                />
              </TouchableOpacity>
            )}
          />
        </View> */}


      </View >
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  emptyMessageStyle: {
    textAlign: 'center',
    marginTop: '50%',
  },
  seperatorLine: {
    height: 1,
    width: "100%",
    backgroundColor: "gray"
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#CCCCCC",
    marginTop: 20
    // width: "90%"
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 60
  },
  arrowContainer: {
    flexDirection: "row",
    width: "20%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 10
  },
  iconStyle: {
    width: 40,
    height: 40,
    marginLeft: 10
  },
  arrowIconStyle: {
    width: 30,
    height: 30,
  },
  buttonText: {
    fontSize: 16,
    color: "#0F1E5A",
    //color:'red',
    fontWeight: "bold",
    paddingLeft: 20
  },
  countText: {
    // width: "20%",
    color: "#0F1E5A",
    fontSize: 16,
    // fontWeight: "bold",
    textAlign: "center"
  }
});
