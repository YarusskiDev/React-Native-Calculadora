import React, {useState} from 'react';
import {Text, StyleSheet, Dimensions, TouchableHighlight} from 'react-native';

export default props => {
  const stylesButton = [styles.button];
  if (props.double) stylesButton.push(styles.buttonDouble);
  if (props.triple) stylesButton.push(styles.buttonTriple);
  if (props.operation) stylesButton.push(styles.operationButton);
  return (
    <TouchableHighlight onPress={props.onClick}>
      <Text style={stylesButton}> {props.label}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    fontSize: 40,
    height: Dimensions.get('window').width / 4,
    width: Dimensions.get('window').width / 4,
    paddingTop: 20,
    backgroundColor: '#f8f8f8',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#888',
    color: 'purple',
  },
  operationButton: {
    color: '#fff',
    backgroundColor: '#fa8231',
  },
  buttonDouble: {
    width: (Dimensions.get('window').width / 4) * 2,
  },
  buttonTriple: {
    width: (Dimensions.get('window').width / 4) * 3,
  },
});
