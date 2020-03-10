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
import Toast from 'react-native-simple-toast';
import { isNetworkAvailable } from '../../utils/helpers';
import CellComponent from '../../components/cell_component/cell_component';

// const data = [{ title: "test", body: "testtt" }, { title: "test", body: "testtt" }]

export default class WarningComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      warnings: [],
      icon: null,
      category: ''
    };
    this.willFocus = this.props.navigation.addListener("willFocus", () => {
      this.getWarningList();
    });
  }

  componentDidMount() {
    let title;
    if (this.props.category== 'Sanierung') {
      title = 'Warnung';
      this.setState({ icon: require('../../../img/warning.png'), category: 'Sanierung' })
    } else if (this.props.category == 'Störung') {
      title = 'Störung';
      this.setState({ icon: require('../../../img/alarm.png'), category: 'Störung' })
    } else if (this.props.category == 'Geplante Maßnahmen') {
      title = 'Maßnahmen';
      this.setState({ icon: require('../../../img/tool.png'), category: 'Geplante Maßnahmen' })
    }
    this.props.navigation.setParams({
      title: title,
    });
    this.getWarningList();
    // console.log(("login propssss resss ", this.props.loginResponse));
  }

  getWarningList = () => {
    if (isNetworkAvailable) {
      this.setState({ spinner: !this.state.spinner });
      let url = `event/v1/notification/findOneEventByCategory?category=${this.props.category}&beaconUniqueId=A0E6F85455DA&username=${this.props.loginResponse.userManagementResponse.userName}`;
      this.props.actions
        .getWarningList(url)
        .then(response => {
          this.setState({ spinner: false }, () => {
            if (response.notificationResponseCode == 10000) {
              this.setState({ warnings: response.eventsDtoList });
            } else {
              setTimeout(
                function () {
                  Toast.show('Failed to get warnings.');
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

  markAllRead = () => {
    if (isNetworkAvailable) {
      this.setState({ spinner: !this.state.spinner });
      let data = {
          category: this.state.category,
          username: this.props.loginResponse.userManagementResponse.userName,
          beaconUniqueId: "A0E6F85455DA"
      };
      this.props.actions
        .markAllRead(data)
        .then(response => {
          this.setState({ spinner: false }, () => {
            if (response.eventResponseCode == 10000) {
              this.getWarningList();
              // this.setState({ warnings: response.eventsDtoList });
            } else {
              setTimeout(
                function () {
                  Toast.show('Failed update the status.');
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

        <View style={{ width: "100%", justifyContent: "flex-end", padding: 10 }}>
          <TouchableOpacity style={{ alignItems: "flex-end" }}
            activeOpacity={0.5}
            onPress={() => {
              // Actions.warning();
              this.markAllRead();
            }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Alle als gelesen markieren</Text>
          </TouchableOpacity>
        </View>

        <View style={{ ...styles.seperatorLine }}></View>

        <FlatList
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
          showsVerticalScrollIndicator={false}
          data={this.state.warnings}
          refreshing={false}
          // onRefresh={() => {
          //   this.getNotificationList();
          // }}
          ListEmptyComponent={() =>
            isEmpty(this.state.warnings) ? (
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
              onPress={() => { Actions.details({ selected_index: index, category: this.state.category }) }}>
              <CellComponent
                key={index}
                read={item.eventReadUnReadStatus}
                title={item.category}
                discription={item.eventDescription}
                icon={this.state.icon}
              />
            </TouchableOpacity>
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
  seperatorLine: {
    height: 1,
    width: "100%",
    backgroundColor: "gray"
  },
});
