
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

import LinearGradient from 'react-native-linear-gradient';

import {Navigation} from '../../types';

type LoginScreenProps = {
  navigation: Navigation;
};

export default function Dashboard({ navigation }: LoginScreenProps) {
    
  const handleInviteUser = () => {
      
      navigation.navigate('Invite');
    };
    
  return (
    <View style={styles.safeArea}>
        <TouchableOpacity style={styles.buttonView} onPress={handleInviteUser} >
              <LinearGradient
                colors={['#1410B4', '#040268']}
                style={styles.buttonStyle}>
                <Text style={styles.buttonText}>Generate Invite</Text>
              </LinearGradient>
            </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  buttonStyle: {
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
   buttonView: {
    width: '100%',
    marginTop: '20%',
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    width: 240,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
});