import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  AsyncStorage,
  PermissionsAndroid,
  ScrollView,

} from 'react-native';

import { initRule, executeRules } from '../../utils/validations';
import { required, checkValidEmail } from '../../utils/validations/rules';
import { isNetworkAvailable } from '../../utils/helpers';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CheckBox from 'react-native-check-box'
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';
import Firebase from 'react-native-firebase';
import { isEmpty } from 'lodash';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const fieldValidations = [
  initRule('username', 'Username', required),
  initRule('password', 'Password', required),
];

export default class SignInComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validationErrors: {},
      params: {
        username: '',
        password: '',
      },
      fcmToken: '',
      isChecked: false
    };
  }

  componentDidMount() {
    let firebaseConfig;

    firebaseConfig = {
      clientId:
        '569899976922-dkecjna198uvnos1u3so6v96bjqj36uh.apps.googleusercontent.com',
      appId: '1:569899976922:ios:b896111ebcdebfd844fde3',
      apiKey: 'AIzaSyDkxm8JB0FHOlWe6MpVU4uaVRupo34Nx3k',
      projectId: 'beacon-311b2',
      databaseURL: 'https://beacon-311b2.firebaseio.com',
      storageBucket: 'beacon-311b2.appspot.com',
      messagingSenderId: '569899976922',
      // enable persistence by adding the below flag
      persistence: true,
    };

    // if (Platform.OS === 'android') {
    //   this.requestAppPermissions();
    // }

    if (!Firebase.apps.length) {
      Firebase.initializeApp(firebaseConfig);
    }
    // // this.getDeviceUniqueId();
    this.checkPermission();
    // Actions.tabBar();
  }

  async checkPermission() {
    const enabled = await Firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async requestPermission() {
    try {
      await Firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      //console.log("permission rejected");
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await Firebase.messaging().getToken();
      if (fcmToken) {
        this.setState({ fcmToken: fcmToken });
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } else {
      this.setState({ fcmToken: fcmToken });
    }
    // console.log('token ', fcmToken);
  }

  // async getDeviceUniqueId() {
  //   let device_id = await AsyncStorage.getItem("device_id");
  //   if (!device_id) {
  //     DeviceInfo.getUniqueId().then(uniqueId => {
  //       this.setState({ device_id: uniqueId });
  //       AsyncStorage.setItem("device_id", uniqueId);
  //     });
  //   } else {
  //     this.setState({ device_id: device_id });
  //   }
  // }

  // async requestAppPermissions() {
  //   try {
  //     const granted = await PermissionsAndroid.requestMultiple([
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  //     ]);
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //     } else {
  //       this.requestAppPermissions();
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // }

  loginButtonAction = () => {
    this.setState(
      { validationErrors: executeRules(this.state.params, fieldValidations) },
      () => {
        let { validationErrors } = this.state;
        if (isEmpty(validationErrors)) {
          if (isNetworkAvailable) {
            this.setState({ spinner: !this.state.spinner });
            let data = {
              username: this.state.params.username,
              password: this.state.params.password,
              userLoginType: 1

            };
            this.props.actions
              .authenticateUser(data)
              .then(response => {
                // console.log(response)
                this.setState({ spinner: false }, () => {
                  if (response.loginResponseCode == 20000) {
                    Actions.home({ type: 'reset', isFromLogin: true });
                  } else {
                    setTimeout(
                      function () {
                        Toast.show('Invalid credentials');
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
              Toast.show("You don't have internet connection, Please try again.");
            });
          }
        } else {
          alert(JSON.stringify(this.state.validationErrors));
        }
      },
    );
  };

  onInputChange = (text, fieldName) => {
    this.setState({
      ...this.state,
      params: { ...this.state.params, [fieldName]: text },
    });
  };

  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
          width: '100%',
          height: '100%',
          // backgroundColor: 'white',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: '#F9F9F9',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />


          <Image
            style={{
              width: 200,
              height: 200,
              // marginTop: 20,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}
            resizeMode="stretch"
            source={require('../../../img/spie_logo.png')}
          />
          <Text style={{ padding: 10, fontSize: 18, color: "#7F7F7F", fontWeight: "bold" }}>Einloggen</Text>
          <View
            style={{
              padding: 20,
              width: "90%",
              // backgroundColor: 'white',
              alignContent: 'center',
              alignItems: 'center',
              // borderRadius: 10,
              // shadowColor: '#000',
              // shadowOffset: { width: 2, height: 2 },
              // shadowOpacity: 0.2,
              // shadowRadius: 2,
              // elevation: 2,
            }}>
            <TextInput
              style={{
                ...styles.textInput,
                // marginTop: 30,
                // width: '100%',
                borderColor: '#CCC',

              }}
              placeholder="Nutzername"
              placeholderTextColor="#7F7F7F"
              keyboardType="email-address"
              value={this.state.params.username}
              onChangeText={text => this.onInputChange(text, 'username')}
            />
            <View style={{ ...styles.seperatorLine }}></View>

            <TextInput
              style={{
                ...styles.textInput,
                marginTop: 20,
                // width: '100%',
                borderColor: '#CCC',
              }}
              secureTextEntry={!this.state.isChecked}
              placeholder="Passwort"
              placeholderTextColor="#7F7F7F"
              // keyboardType="email-address"
              value={this.state.params.password}
              onChangeText={text => this.onInputChange(text, 'password')}
            />
            <View style={{ ...styles.seperatorLine }}></View>

            <View
              style={{ width: '100%', marginTop: 10 }}>
              <View
                style={{ width: '100%', justifyContent: 'flex-end', flexDirection: "row" }}>
                <CheckBox
                  style={{ height: 40 }}
                  onClick={() => {
                    this.setState({
                      isChecked: !this.state.isChecked
                    })
                  }}
                  isChecked={this.state.isChecked}
                />
                <Text style={{ paddingTop: 4 }}>Passwort anzeigen</Text>
              </View>
              {/* <TouchableOpacity
                  style={{ height: 40, width: '50%', alignItems: 'flex-end', marginTop: 5 }}
                  activeOpacity={0.5}
                  onPress={() => {
                    Actions.retrieve_password();
                  }}>
                  <Text
                    style={{ textAlign: 'right' }}>
                    {' '}
                    Forgot Password?
                </Text>
                </TouchableOpacity> */}
            </View>

            <TouchableOpacity
              style={{
                ...styles.buttonStyle,
              }}
              activeOpacity={0.5}
              onPress={() => { this.loginButtonAction() }}>
              <Text style={{ ...styles.buttonTextStyle }}>{/*EINREICHEN*/}Login</Text>
            </TouchableOpacity>

          </View>

          {/* <View
            style={{
              width: '90%',
              height: '45%',
              // backgroundColor: 'yellow',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: colors.buttonBorderColor,
                width: '100%',
                fontSize: 30,
                fontFamily: fonts.Book,
                alignContent: 'flex-start',
              }}>
              LOGIN
            </Text>

            <TextInput
              style={{
                ...styles.textInput,
                marginTop: 30,
                width: '100%',
                borderColor: '#CCC',
              }}
              placeholder="Email"
              keyboardType="email-address"
              value={this.state.params.email}
              onChangeText={text => this.onInputChange(text, 'email')}
            />

            <TextInput
              style={{
                ...styles.textInput,
                marginTop: 20,
                width: '100%',
                borderColor: '#CCC',
              }}
              placeholder="Password"
              keyboardType="email-address"
              value={this.state.params.password}
              onChangeText={text => this.onInputChange(text, 'password')}
            />

            <View
              style={{alignItems: 'flex-end', width: '100%', marginTop: 10}}>
              <TouchableOpacity
                style={{height: 40, width: '50%', justifyContent: 'center'}}
                activeOpacity={0.5}
                onPress={() => {
                  Actions.retrieve_password();
                }}>
                <Text
                  style={{...styles.signinLinkTextStyle, textAlign: 'right'}}>
                  {' '}
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              height: '20%',
              // backgroundColor: 'yellow',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'flex-end',
              marginRight: 10,
            }}>
            <TouchableOpacity
              style={{
                ...styles.pickUpButtonStyle,
                margin: 10,
                height: 50,
                width: '50%',
              }}
              activeOpacity={0.5}
              onPress={this.loginButtonAction}>
              <Text style={{...styles.buttonTextStyle}}>LOGIN</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signinContainerViewStyle}>
            <Text style={styles.plainTextStyle}>Don't have an account?</Text>
            <TouchableOpacity
              style={{height: 30}}
              onPress={this.createAccountButtonAction}>
              <Text style={styles.signinLinkTextStyle}> Create Account</Text>
            </TouchableOpacity>
          </View> */}
        </View>

      </KeyboardAwareScrollView>

    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  textInput: {
    fontSize: 16,
    width: '100%',
    height: hp('6%'),
    paddingLeft: 10,
    justifyContent: 'center',
    alignContent: 'center',
    // backgroundColor: '#FFF',
    // fontFamily: fonts.Light,
  },
  seperatorLine: {
    height: 1,
    width: "100%",
    backgroundColor: "black"
  },
  buttonTextStyle: {
    color: '#7F7F7F',
    textAlign: 'center',
    fontSize: 18,
    // fontFamily: fonts.Book,
  },

  buttonStyle: {
    padding: 5,
    backgroundColor: '#DEEBF4',
    justifyContent: 'center',
    marginTop: 30,
    height: 50,
    width: '100%',
    // borderRadius: 10,
  },

});
