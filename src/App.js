import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import Button from './Button';
import {Euler} from './Euler';
import {EulerMejorado} from './EulerMejorado';
import Grafico from './Grafico';
import {RungeKutta} from './RungeKutta';
import TextInput from './TextInput';


const Section = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'light';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      {children}
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'light';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [valoresEuler, setValoresEuler] = useState([]);
  const [valoresEulerMejorado, setValoresEulerMejorado] = useState([]);
  const [valoresKunge, setValoresKunge] = useState([]);

  const [funcion, setFuncion] = useState('');
  const [values, setValues] = useState({
    t0: 0,
    x0: undefined,
    n: undefined,
    h: undefined,
    b: undefined,
  });

  const onChange = key => value => {
    const newValues = {...values, [key]: value };
    const { t0, n, h, b } = values;
    if (key === 'n' && value) {
      if (h) {
        newValues.b = parseInt(t0 + (value * parseFloat(h)));
      } else if (b) {
        newValues.h = (t0 + b) / value;
      }
    } else if (key === 'h' && value) {
      if (b) {
        newValues.n = (b - t0) / parseFloat(h);
      } else if (n) {
        newValues.b = parseInt(t0 + (n * parseFloat(h)));
      }
    } else if (key === 'b' && value) {
      if (h) {
        newValues.n = (value - t0) / parseFloat(h);
      } else if (n) {
        newValues.h = (t0 + value) / n;
      }
    } else if (key === 't0' && value && n && h) {
      newValues.b = parseInt(value + (n * parseFloat(h)));
    }
    setValues(newValues);
  };

  const disableSubmit = () => {
    if (typeof funcion == 'undefined' || funcion === null) {
      return true;
    }
    if (typeof values.t0 == 'undefined' || values.t0 === null) {
      return true;
    }
    if (typeof values.x0 == 'undefined' || values.x0 === null) {
      return true;
    }
    if (typeof values.n == 'undefined' || values.n === null) {
      return true;
    }
    if ((typeof values.h == 'undefined' || values.h === null) && (typeof values.b == 'undefined' || values.b === null)) {
      return true;
    }
    return false;
  };

  const calcular = () => {
    setValoresEuler(Euler(funcion, parseFloat(values.t0), parseFloat(values.x0), parseFloat(values.n), parseFloat(values.h)));
    setValoresEulerMejorado(EulerMejorado(funcion, parseFloat(values.t0), parseFloat(values.x0), parseFloat(values.n), parseFloat(values.h)));
    setValoresKunge(RungeKutta(funcion, parseFloat(values.t0), parseFloat(values.x0), parseFloat(values.n), parseFloat(values.h)));
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <View style={{ paddingHorizontal: 20 }}>
            <TextInput
              label={'f(x,t)'}
              required={true}
              onChange={setFuncion}
              value={funcion}
            />
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <View>
              <TextInput
                label={'t0'}
                required={true}
                onChange={onChange('t0')}
                keyboardType={'number-pad'}
                value={values.t0}
              />
            </View>
            <View>
              <TextInput
                label={'x0'}
                required={true}
                onChange={onChange('x0')}
                keyboardType={'number-pad'}
                value={values.x0}
              />
            </View>
            <View>
              <TextInput
                label={'n'}
                required={true}
                onChange={onChange('n')}
                keyboardType={'number-pad'}
                value={values.n}
              />
            </View>
            <View>
              <TextInput
                label={'h'}
                required={!values.b}
                onChange={onChange('h')}
                keyboardType={'number-pad'}
                value={values.h}
              />
            </View>
            <View>
              <TextInput
                label={'b'}
                required={!values.h}
                onChange={onChange('b')}
                keyboardType={'number-pad'}
                value={values.b}
              />
            </View>
          </View>

          <View style={{ paddingHorizontal: 20 }}>
            <Button
              label={'calcular'}
              onPress={calcular}
              disabled={disableSubmit()}
              ownStyle={{ width: '100%' }}
            />
          </View>

          <Section title="Euler">
            <Grafico data={valoresEuler} color='red'></Grafico>
          </Section>
          <Section title="Euler Mejorado">
            <Grafico data={valoresEulerMejorado} color='green'></Grafico>
          </Section>
          <Section title="Runge Rutta">
            <Grafico data={valoresKunge} color='blue'></Grafico>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
});

export default App;
