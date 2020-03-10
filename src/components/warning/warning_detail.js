import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView
} from 'react-native';

import { isNetworkAvailable } from '../../utils/helpers';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';

export default class WarningDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warnings: [],
      icon: null,
      selected_warning: '',
      selected_index: 0
    };
  }

  componentDidMount() {
    if (this.props.category == 'Sanierung') {
      this.setState({ icon: require('../../../img/warning.png') })
    } else if (this.props.category == 'Störung') {
      this.setState({ icon: require('../../../img/alarm.png') })
    } else if (this.props.category == 'Geplante Maßnahmen') {
      this.setState({ icon: require('../../../img/tool.png') })
    }
    this.setState({
      warnings: this.props.warningListResponse.eventsDtoList,
      selected_warning: this.props.warningListResponse.eventsDtoList[this.props.selected_index],
      selected_index: this.props.selected_index
    }, () => {
      if (!this.state.selected_warning.eventReadUnReadStatus)
        this.modifyReadunReadStatus();
    })
    // console.log("detailslssl ", this.state.selected_warning.buildingInfoDto.buildNumber)
  }

  modifyReadunReadStatus = () => {
    if (isNetworkAvailable) {
      this.setState({ spinner: !this.state.spinner });
      let data = {
        eventNumber: this.state.selected_warning.eventNumber,
        username: this.props.loginResponse.userManagementResponse.userName,
        beaconUniqueId: this.state.selected_warning.beaconUniqueId
      }
      this.props.actions
        .modifyReadunReadStatus(data)
        .then(response => {
          this.setState({ spinner: false }, () => {
            // if (response.notificationResponseCode == 10000) {
            //   // this.setState({ warnings: response.eventsDtoList });
            //   // Actions.details({ item: item, eventType: this.state.eventType })
            // } else {
            //   setTimeout(
            //     function () {
            //       Toast.show('Failed to update the status.');
            //     }, 500
            //   );
            // }
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

  previousWarning = () => {
    let index = this.state.selected_index - 1;
    if (index >= 0) {
      this.setState({
        selected_warning: this.state.warnings[index],
        selected_index: index
      }, () => {
        if (!this.state.selected_warning.eventReadUnReadStatus)
          this.modifyReadunReadStatus();
      })
    } else {
      Toast.show('Previous item not available');
    }
  }

  nextWarning = () => {
    let index = this.state.selected_index + 1;
    if (index < this.state.warnings.length) {
      this.setState({
        selected_warning: this.state.warnings[index],
        selected_index: index
      }, () => {
        if (!this.state.selected_warning.eventReadUnReadStatus)
          this.modifyReadunReadStatus();
      })
    } else {
      Toast.show('Next item not available');
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FAFAFA",
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
            flex: 1
          }}>
          <ScrollView>

            <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                }}
                resizeMode="stretch"
                source={this.state.icon}
              />
              <View style={{ padding: 10, flex: 1 }}>
                <Text
                  style={{
                    paddingLeft: 10,
                    fontSize: 18,
                    color: '#0F1E5A',
                    // margin: 5,
                    fontWeight: "bold",
                  }}>
                  {this.state.selected_warning.category}
                </Text>

                <Text
                  style={{
                    paddingLeft: 10, paddingTop: 5, paddingRight: 5
                  }}>
                  {this.state.selected_warning.eventDescription}
                </Text>

              </View>
              {/* <View style={{width:"100%", height:1, backgroundColor:'red'}}> </View> */}

            </View>

            <View style={{ width: "100%", height: 1, alignItems: "center", backgroundColor: "gray", marginBottom: 10 }}></View>

            <View style={{ width: "100%", flexDirection: "row" }}>
              <View style={{ width: "50%", padding: 10 }}>
                <Text style={{ color: "gray" }}>
                  {"Ereignis Number"}
                </Text>
                <Text style={{ paddingTop: 10, color: "black" }}>
                  {this.state.selected_warning.eventNumber}
                </Text>
                <View style={{ width: "100%", height: 1, backgroundColor: "gray", marginTop: 10 }}></View>
              </View>
              <View style={{ width: "50%", padding: 10 }}>
                <Text style={{ color: "gray" }}>
                  {"Kategorie"}
                </Text>
                <Text style={{ paddingTop: 10, color: "black" }}>
                  {this.state.selected_warning.category}
                </Text>
                <View style={{ width: "100%", height: 1, backgroundColor: "gray", marginTop: 10 }}></View>
              </View>
            </View>

            <View style={{ width: "100%", padding: 10 }}>
              <Text style={{ color: "gray" }}>
                {"Beschreibung"}
              </Text>
              <Text style={{ paddingTop: 10, color: "black" }}>
                {this.state.selected_warning.eventDescription}
              </Text>
              <View style={{ width: "100%", height: 1, backgroundColor: "gray", marginTop: 10 }}></View>
            </View>

            <View style={{ width: "100%", flexDirection: "row" }}>
              <View style={{ width: "50%", padding: 10 }}>
                <Text style={{ color: "gray" }}>
                  {"Dauer von"}
                </Text>
                <Text style={{ paddingTop: 10, color: "black" }}>
                  {this.state.selected_warning.periodFrom}
                </Text>
                <View style={{ width: "100%", height: 1, backgroundColor: "gray", marginTop: 10 }}></View>
              </View>
              <View style={{ width: "50%", padding: 10 }}>
                <Text style={{ color: "gray" }}>
                  {"Dauer bis"}
                </Text>
                <Text style={{ paddingTop: 10, color: "black" }}>
                  {this.state.selected_warning.periodTo}
                </Text>
                <View style={{ width: "100%", height: 1, backgroundColor: "gray", marginTop: 10 }}></View>
              </View>
            </View>

            <View style={{ width: "100%", flexDirection: "row" }}>
              <View style={{ width: "50%", padding: 10 }}>
                <Text style={{ color: "gray" }}>
                  {"Liegenschaft"}
                </Text>
                <Text style={{ paddingTop: 10, color: "black" }}>
                  {this.state.selected_warning != '' ? this.state.selected_warning.buildingInfoDto.propertyNumber : ''}
                </Text>
                <View style={{ width: "100%", height: 1, backgroundColor: "gray", marginTop: 10 }}></View>
              </View>
              <View style={{ width: "50%", padding: 10 }}>
                <Text style={{ color: "gray" }}>
                  {"Gebäudenummer"}
                </Text>
                <Text style={{ paddingTop: 10, color: "black" }}>
                  {this.state.selected_warning != '' ? this.state.selected_warning.buildingInfoDto.buildNumber : ''}
                </Text>
                <View style={{ width: "100%", height: 1, backgroundColor: "gray", marginTop: 10 }}></View>
              </View>
            </View>

            <View style={{ width: "100%", flexDirection: "row" }}>
              <View style={{ width: "50%", padding: 10 }}>
                <Text style={{ color: "gray" }}>
                  {"Etage"}
                </Text>
                <Text style={{ paddingTop: 10, color: "black" }}>
                  {this.state.selected_warning != '' ? this.state.selected_warning.buildingInfoDto.floor : ''}
                </Text>
                <View style={{ width: "100%", height: 1, backgroundColor: "gray", marginTop: 10 }}></View>
              </View>
              {/* <View style={{ width: "50%", padding: 10 }}>
              <Text style={{ color: "gray" }}>
                {"Kategorie"}
              </Text>
              <Text style={{ paddingTop: 10, color: "black" }}>
                {"128.0"}
              </Text>
              <View style={{ width: "100%", height: 1, backgroundColor: "gray", marginTop: 10 }}></View>
            </View> */}
            </View>

            <View style={{ width: "100%", padding: 10 }}>
              <Text style={{ color: "gray" }}>
                {"Mögliche Einschränkungen"}
              </Text>
              <Text style={{ paddingTop: 10, color: "black" }}>
                {this.state.selected_warning.restriction}
              </Text>
              <View style={{ width: "100%", height: 1, backgroundColor: "gray", marginTop: 10 }}></View>
            </View>

            <View style={{ width: "100%", padding: 10 }}>
              <Text style={{ color: "gray" }}>
                {"Ansprechpartner"}
              </Text>
              <View style={{ flexDirection: 'row', width: "100%" }}>

                <Text style={{ paddingTop: 10, color: "black", width: "80%" }}>
                  {this.state.selected_warning.pointOfContactTelephone}
                </Text>

                <View style={{ width: "20%", alignItems: 'flex-end' }}>
                  <TouchableOpacity
                    style={{ height: 30, width: 30 }}
                    activeOpacity={0.5}
                    onPress={() => {
                      // Linking.openURL(this.state.selected_warning.pointOfContactTelephone);
                      Linking.openURL(`tel:${this.state.selected_warning.pointOfContactTelephone}`)
                    }}>
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                      }}
                      resizeMode="stretch"
                      source={
                        require('../../../img/call.png')
                      }
                    />
                  </TouchableOpacity>
                </View>

              </View>

              <View style={{ width: "100%", height: 1, backgroundColor: "gray", marginTop: 10 }}></View>
            </View>
          </ScrollView>
        </View>

        <View
          style={{
            width: '100%',
            height: "10%",
            flexDirection: "row",
            alignContent: 'center',
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: '#A9A9A9'
          }}>
          <View style={{
            width: '50%',
            // height: "100%",
            // backgroundColor:"white",
            flexDirection: "row"

          }}>
            <Image
              style={{
                width: 30,
                height: 30,
              }}
              resizeMode="stretch"
              source={
                require('../../../img/arrow_left.png')
              }
            />

            <TouchableOpacity
              style={{ height: 30, alignContent: 'center', }}
              activeOpacity={0.5}
              onPress={() => { this.previousWarning() }}>
              <Text style={{ textAlign: "center", fontSize: 16, color: "white", paddingTop: 5 }}>Vorherige Nachricht</Text>
            </TouchableOpacity>

          </View>

          <View style={{
            width: '50%',
            height: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center"

          }}>

            <TouchableOpacity
              style={{ height: 30, alignContent: 'center', }}
              activeOpacity={0.5}
              onPress={() => { this.nextWarning() }}>
              <Text style={{ textAlign: "center", fontSize: 16, color: "white", paddingTop: 5 }}>Nächste Nachricht</Text>
            </TouchableOpacity>

            <Image
              style={{
                width: 30,
                height: 30,
              }}
              resizeMode="stretch"
              source={
                require('../../../img/arrow_right.png')
              }
            />

          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  }
});
