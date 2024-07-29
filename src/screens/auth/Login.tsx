import {
  Alert,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {Navigation} from '../../types';

type LoginScreenProps = {
  navigation: Navigation;
};

export default function LoginForm({navigation}: LoginScreenProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const image =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9y68Pdo7sp3_tuQKqlonM3O2U_8UhtgabWA&s';

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={['#1410B4', '#040268']} style={styles.container}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
        />
        <View style={styles.loginText}>
          <Text style={styles.title}>Welcome again, Rebeeca!</Text>
          <Text style={styles.optionsText}>
            Please Log into your existing account
          </Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Your Email"
            value={username}
            onChangeText={setUsername}
            autoCorrect={false}
            placeholderTextColor={'white'}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Your Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            autoCorrect={false}
            autoCapitalize="none"
            placeholderTextColor={'white'}
          />
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Dashboard')}
            style={styles.buttonView}>
            <LinearGradient
              colors={['#ED21D9', '#970DD9']}
              style={styles.buttonStyle}>
              <Text style={styles.buttonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.optionsText}>Don't have an account?</Text>
          <Text
            style={styles.signup}
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            Sign Up
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    paddingTop: '20%',
    flex: 1,
  },
  loginText: {
    paddingVertical: 40,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 85,
  },

  title: {
    fontSize: 20,
    fontWeight: 'medium',
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
    color: 'white',
  },
  inputView: {
    gap: 15,
    width: '100%',
    paddingHorizontal: 40,
    alignItems: 'center',
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

  buttonStyle: {
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    width: 240,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },

  buttonView: {
    width: '100%',
    marginTop: '4%',
    borderRadius: 25,
    alignItems: 'center',
  },

  optionsText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 13,
    marginTop: '4%',
  },

  footerText: {
    textAlign: 'center',
    color: 'white',
  },

  signup: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
