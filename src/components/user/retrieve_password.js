import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { initRule, executeRules } from '../../utils/validations';
import { required, checkValidEmail } from '../../utils/validations/rules';
import { isNetworkAvailable } from '../../utils/helpers';
import Spinner from 'react-native-loading-spinner-overlay';
import { isEmpty } from 'lodash';
// import CommonStyles, { colors, fonts } from '../../CommonStyles';
import { Actions } from 'react-native-router-flux';

const fieldValidations = [
  initRule("email", "Email", required, checkValidEmail)
];

export default class ResetPasswordComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validationErrors: {},
      email: "",
    };
  }

  retrieveButtonAction = () => {
    this.setState(
      { validationErrors: executeRules(this.state, fieldValidations) },
      () => {
        let { validationErrors } = this.state;
        if (isEmpty(validationErrors)) {
          if (isNetworkAvailable()) {
            this.setState({ spinner: !this.state.spinner });
            let data = {
              email: this.state.email
            }
            this.props.actions
              .retrievePassword(data)
              .then(response => {
                this.setState({ spinner: false }, () => {
                  Alert.alert(
                    'Retrieve Password',
                    'Reset link sent to your registered Email.',
                    [
                      { text: 'OK', onPress: () => Actions.signin() },
                    ],
                    { cancelable: false },
                  );
                  // console.log("eror msggggg resss ", response.message)
                });
              })
              .catch(error => {
                this.setState({ spinner: false }, () => {
                  setTimeout(() => {
                    alert(JSON.stringify(error.data.message));
                  }, 100);
                });
              });
          } else {
            this.setState({ spinner: false }, () => {
              alert("You don't have internet connection, Please try again.");
            });
          }
        }
        else {
          alert(JSON.stringify(this.state.validationErrors))
        }
      })
  }

  onInputChange = (text, fieldName) => {
    this.setState({ ...this.state, [fieldName]: text });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: "white",
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View
          style={{
            width: '90%',
            padding: 20,
            // paddingTop: 40,
            backgroundColor: '#FAFAFA',
            alignContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 2,
          }}>

          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            {/* <Text
              style={{
                // color: colors.buttonBorderColor,
                width: '100%',
                fontSize: 30,
                // fontFamily: fonts.Book,
                alignContent: 'flex-start',
              }}>
              Retrieve Password
            </Text> */}

            <TextInput
              style={{
                ...styles.textInput,
                marginTop: 20,
                width: '100%',
                borderColor: '#CCC',
              }}
              placeholder="Email"
              keyboardType="email-address"
              value={this.state.email}
              onChangeText={text => this.onInputChange(text, "email")}
            />
            <View style={{ ...styles.seperatorLine }}></View>

          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginRight: 20,
            }}>
            <TouchableOpacity
              style={{
                ...styles.retrieveButtonStyle,
                marginTop: 40,
                height: 50,
                width: '50%',
              }}
              activeOpacity={0.5}
              onPress={() => { this.retrieveButtonAction() }}>
              <Text style={{ ...styles.buttonTextStyle }}>Retrieve Password</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // textInput: CommonStyles.commonTextInput,
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
    backgroundColor: '#FFF',
    // fontFamily: fonts.Light,
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    // fontFamily: fonts.Book,
  },
  seperatorLine: {
    height: 1,
    width: "100%",
    backgroundColor: "black"
  },
  retrieveButtonStyle: {
    padding: 5,
    backgroundColor: 'black',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
