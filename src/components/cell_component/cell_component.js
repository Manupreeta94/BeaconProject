import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const CellComponent = props => {
  return (
    <View
      key={props.key}
      style={
        styles.boxViewStyle
      }>

      <Image
        style={
          styles.image
        }
        resizeMode="stretch"
        source={props.icon}
      />
      <View style={{ flex: 1 }}>
        <Text
          style={{
            ...styles.titleText,
            color: props.read ? '#808080' : '#0F1E5A',
          }}>
          {props.title}
        </Text>
        <Text
          style={{
            ...styles.bodyText
          }}>
          {props.discription}
        </Text>
      </View>

    </View>
  );
};

export default CellComponent;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  boxViewStyle: {
    flexDirection: "row",
    backgroundColor: 'white',
    alignContent: 'center',
    alignItems: 'center',
    width: "100%",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10
    // borderRadius: 8,
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
  },
  image: {
    width: 50,
    height: 50
  },
  titleText: {
    fontSize: 18,
    margin: 5,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  bodyText: {
    fontSize: 16,
    color: '#242A37',
    margin: 5,
    paddingLeft: 10

  }
});
