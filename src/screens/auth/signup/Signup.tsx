import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { Formik } from 'formik';

import LinearGradient from 'react-native-linear-gradient';

import verifyInvite from '../../../firebase/Invite';

const initialValues = {
  invite: '',
  cnic: '',
};
export default function Signup({ navigation }: { navigation: any }) {

  const [errorText, setErrorText] = useState('')


  const handleSubmit = async (values: any) => {
    const verifiedInvite = await verifyInvite(values)
    if(verifiedInvite?.invite)
    { navigation.navigate('User Info',{id:verifiedInvite.userid}); }
    else {
      setErrorText('Invalid Invite!!')
    }
    
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={['#1410B4', '#040268']} style={styles.safeArea}>
        <Formik
          initialValues={initialValues}
          onSubmit={()=>(console.log('values'))}
        >
          {({ handleChange, handleBlur, values }) => (
            <View style={styles.inputView}>
              {
                errorText && <Text style={styles.errorText}>Error:{errorText}</Text>
              }
              <Text style={styles.optionsText}>
                Please enter the invite shared by Admin{' '}
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Your Invite"
                value={values.invite}
                onChangeText={handleChange('invite')}
                onBlur={handleBlur('invite')}
                placeholderTextColor={'white'}
                autoCapitalize="none"
              />

              <TextInput
                style={styles.input}
                placeholder="Your CNIC"
                value={values.cnic}
                onChangeText={handleChange('cnic')}
                onBlur={handleBlur('cnic')}
                maxLength={13}
                placeholderTextColor={'white'}
                autoCapitalize="none"
              />

              <View style={styles.buttonView}>
                <TouchableOpacity onPress={() => handleSubmit(values)} style={styles.buttonView}>
                  <LinearGradient
                    colors={['#ED21D9', '#970DD9']}
                    style={styles.buttonStyle}
                  >
                    <Text style={styles.buttonText}>Submit Invite</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
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
    marginBottom: 15,
    fontFamily: 'Lato-Regular',
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
    fontFamily: 'Lato-Bold',
  },
  optionsText: {
    textAlign: 'left',
    color: 'white',
    fontSize: 13,
    marginBottom: '4%',
    fontFamily: 'Lato-Regular',
  },
  errorText: {
    color: 'red',
    marginTop: 2,
    marginBottom: 8,
    backgroundColor: 'white',
    marginHorizontal: 32,
    paddingHorizontal: 8,
    fontFamily: 'Lato-Regular',
  },
});