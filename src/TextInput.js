import React, { useState, useEffect } from 'react';
import { View, Text, TextInput as Input, StyleSheet } from 'react-native';

const styles = ({ focused, pristine, error, disabled }) =>
  StyleSheet.create({
    container: {
      width: '100%',
      marginVertical: 4,
      height: 62,
    },
    required: {
      width: '100%',
    },
    inputContainer: {
      marginBottom: 0,
      borderBottomWidth: 1,
      borderBottomColor: error ? 'red' : '#CCC',
      borderStyle: 'solid',
      borderRadius: 1,
      paddingBottom: 5,
      height: 44,
    },
    inputLabel: {
      fontSize: 12,
      color: error ? 'red' : disabled ? 'gray' : 'black',
    },
    input: {
      marginVertical: 4,
      fontSize: 14,
      paddingTop: pristine ? 20 : 0,
      color: disabled ? 'gray' : 'black',
    },
    requiredText: {
      fontSize: 12,
      color: error ? 'red' : 'black',
    },
  });

const TextInput = ({
  label,
  required,
  value,
  onChange,
  secureTextEntry,
  keyboardType,
  disabled,
}) => {
  const [text, setText] = useState(value || '');
  const [pristine, setPristine] = useState(!value);
  const [error, setError] = useState(false);
  const [focused, setFocused] = useState(false);


  useEffect(() => {
    if (value && value !== text) {
      setText(String(value) || '')
    }
  }, [value, setText]);

  const setBlur = () => {
    setFocused(false)
    if (required && text.length === 0) {
      setError('Requerido');
    } else {
      setError(false);
    }
    setPristine(text.length === 0)
  };

  const onChangeText = text => {
    setText(text)

    if (onChange) {
      onChange(text)
    }
  };

  const labelPlaceholder = `${label} ${required ? '*' : ''}`;

  return (
    <View style={styles({ error }).container}>
      <View style={styles({ error, disabled }).inputContainer}>
        <Text style={styles({ error, disabled }).inputLabel}>
          {focused || !pristine ? labelPlaceholder : ''}
        </Text>
        <Input
          autoCorrect={false}
          autoCompleteType={'off'}
          autoCapitalize={'none'}
          placeholderTextColor={error ? 'red' : disabled ? 'gray' : 'black'}
          style={styles({ focused, error, disabled }).input}
          placeholder={!focused ? labelPlaceholder : ''}
          onFocus={() => setFocused(true)}
          onBlur={() => setBlur()}
          onChangeText={onChangeText}
          value={text}
          secureTextEntry={secureTextEntry}
          keyboardType={(keyboardType) ? keyboardType : 'default'}
          editable={disabled ? false : true}
        />
      </View>
      <View style={styles.required}>
        {error && (
          <Text style={styles({ error }).requiredText}>{error}</Text>
        )}
      </View>
    </View>
  )
};

export default TextInput;
