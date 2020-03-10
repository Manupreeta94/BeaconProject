import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
// import {colors, fonts} from '../../CommonStyles';
import { isEmpty } from 'lodash';
import { Actions } from 'react-native-router-flux';
import { isNetworkAvailable } from '../../utils/helpers';
import CellComponent from '../cell_component/cell_component';

const data = [{ title: "test", body: "testtt" }, { title: "test", body: "testtt" }]

export default class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      notifications: [],
    };
  }

  componentDidMount() {
    // this.getNotificationList();
  }

  getNotificationList = () => {
    if (isNetworkAvailable()) {
      this.setState({ spinner: !this.state.spinner });
      this.props.actions
        .getNotificationList(this.props.loginResponse.id)
        .then(response => {
          this.setState({ spinner: false }, () => {
            if (!isEmpty(response)) {
              this.setState({ notifications: response });
            }
          });
        })
        .catch(error => {
          this.setState({ spinner: false }, () => {
            alert(error.data.message);
          });
        });
    } else {
      this.setState({ spinner: false }, () => {
        alert("You don't have internet connection, Please try again.");
      });
    }
  };

  ok_Button = () => {
    this.setState({ Alert_Visibility: !this.state.Alert_Visibility });
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
            <CellComponent
              key={index}
              title={item.title}
              image={item.image}
              price={item.body}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyMessageStyle: {
    textAlign: 'center',
    marginTop: '50%',
  },
});
