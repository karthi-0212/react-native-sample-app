import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../screens/LoginScreen';

const BottomNavigation = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
      <Text style={styles.text}>Login</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Details Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProductDetail')}>
        <Text style={styles.text}>Details</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2196F3',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: { 
    alignItems: 'center',
    flex: 1,
  },
  text: { 
    color: '#fff', 
    fontSize: 14, 
    marginTop: 5, 
    padding: 15
  },
  divider: {
    width: 1,   
    height: '100%',
    backgroundColor: '#fff', 
    marginHorizontal: 10, 
  },
});