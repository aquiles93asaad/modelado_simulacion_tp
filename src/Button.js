import React from 'react';
import { Text, TouchableOpacity,ActivityIndicator, StyleSheet } from 'react-native';

const btnStlye = {
  paddingVertical: 10,
  paddingHorizontal: 20,
  maxWidth: 300,
  borderRadius: 5,
  alignItems: 'center',
  marginVertical: 10,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
};

const textStyle = {
  fontSize: 11,
  fontWeight: 'bold',
  textTransform: 'uppercase',
};

const styles = StyleSheet.create({
  button: {
    ...btnStlye,
    elevation: 4,
    backgroundColor: 'black',
  },
  buttonDisabled: {
    ...btnStlye,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },
  buttonText: {
    ...textStyle,
    color: 'white',
  },
  buttonTextDisabled: {
    ...textStyle,
    color: 'rgba(0, 0, 0, 0.26)',
  },
});


const Button = ({ label, ownStyle, onPress, loading, disabled }) => {
  const btnStyle = disabled ? styles.buttonDisabled : styles.button;

  return (
    <TouchableOpacity
      style={{ ...btnStyle, ...ownStyle }}
      activeOpacity={.7}
      onPress={onPress}
      disabled={disabled ? disabled : loading ? true : false}
    >
      {loading &&
        <ActivityIndicator size="small" color="#fff" />
      }
      {!loading &&
        <Text style={disabled ? styles.buttonTextDisabled : styles.buttonText}>
          {label}
        </Text>
      }
    </TouchableOpacity>
  )
};

export default Button;
