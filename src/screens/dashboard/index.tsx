
import { View,Text, StyleSheet,TouchableOpacity } from "react-native"
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
      <TouchableOpacity style={styles.buttonStyle} onPress={handleInviteUser}>
        <LinearGradient colors={['#1410B4', '#040268']}>
          <Text style={styles.buttonText}> Invite User</Text>
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
      alignItems: 'flex-end',
      margin: 8,

  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    width: 100,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
});