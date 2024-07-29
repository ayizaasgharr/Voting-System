import LinearGradient from 'react-native-linear-gradient';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';

export default function Signup() {
  const [invite, setInvite] = useState<string>('');
  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={['#1410B4', '#040268']} style={styles.safeArea}>
        <View style={styles.inputView}>
          <Text style={styles.optionsText}>
            Please enter the invite share by Admin{' '}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Your Invite"
            value={invite}
            onChangeText={setInvite}
            autoCorrect={false}
            placeholderTextColor={'white'}
            autoCapitalize="none"
            numberOfLines={4}
          />
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity onPress={() => {}} style={styles.buttonView}>
            <LinearGradient
              colors={['#ED21D9', '#970DD9']}
              style={styles.buttonStyle}>
              <Text style={styles.buttonText}>Submit Invite</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: '10%',
    fontFamily: 'Lato-Regular',
    color: 'white',
    marginTop: '10%',
    marginBottom: 10,
  },
  inputView: {
    width: '100%',
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%',
  },
  input: {
    height: 50,
    borderColor: 'white',
    color: 'white',
    paddingHorizontal: '5%',
    width: 240,
    borderWidth: 2,
    borderRadius: 25,
    marginBottom: 5,
  },
  buttonView: {
    width: '100%',
    marginTop: '2%',
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonStyle: {
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    width: 240,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  optionsText: {
    textAlign: 'left',
    color: 'white',
    fontSize: 13,
    marginBottom: '4%',
  },
});
