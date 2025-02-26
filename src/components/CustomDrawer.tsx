import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

interface DrawerProps {
  isVisible: boolean;
  onClose: () => void;
}

const CustomDrawer: React.FC<DrawerProps> = ({isVisible, onClose}) => {
  const navigation = useNavigation();
  const [user, setUser] = useState<{name: string; email: string} | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user'); 
      navigation.reset({
        index: 0,
        routes: [{name: 'Login' as never}], // Redirect to Login and clear history
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.drawer}>
        {/* Close Button */}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Icon name="close" size={28} color="#fff" />
        </TouchableOpacity>

        {/* User Info */}
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user?.name || 'User Name'}</Text>
          <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
        </View>

        {/* Push Logout Button to Bottom */}
        <View style={styles.bottomContainer}>
          <SafeAreaView>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    width: '70%',
    height: '100%',
    backgroundColor: '#2196F3',
    padding: 20,
    position: 'absolute',
    left: 0,
    top: 0,
    flex: 1,
    paddingBottom: 60,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  userInfo: {
    marginTop: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  bottomContainer: {
    flex: 1, 
    justifyContent: 'flex-end',
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});