/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export type RootStackParamList = {
    Login: undefined;
    Product: undefined;
    ProductDetail: undefined;
  };

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

function LoginScreen({navigation}: Props): React.JSX.Element {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleSubmit = async () => {
    if (!name || !email) {
      console.log('warning');
      Alert.alert('Error', 'Please enter both name and email');
      return;
    }
    //console.log(AsyncStorage);
    //console.log('Hello Karthi!!!');
    try {
      await AsyncStorage.setItem('user', JSON.stringify({name, email}));
      navigation.navigate('Product');
    } catch (error) {
      Alert.alert('Error', 'Failed to save data');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, marginTop: "30%", padding: 20},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1, 
    padding: 10, 
    marginBottom: 10, 
    borderRadius: 5
  },
});

export default LoginScreen;
