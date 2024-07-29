import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput, Text, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import {Picker} from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';

import { user_types } from '../../constants/invite';
import getHalka from '../../firebase/Halka';

export default function InviteUser() {
  const initialValue = {
    cnic: '',
    password: '',
      color: 'red', 
    invite:''
  };

  const [selectedValue, setSelectedValue] = useState(initialValue.color);

  useEffect(() => {
    getHalka()
  }, [])

  return (
    <View style={styles.safeArea}>
      <Formik
        initialValues={initialValue}
        onSubmit={values => console.log(values)}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View style={styles.formStyle}>
            <TextInput
              onChangeText={handleChange('cnic')}
              onBlur={handleBlur('cnic')}
              value={values.cnic}
              placeholder="CNIC"
              style={styles.inputStyle}
            />
            <Text style={styles.textStyle}>Choose Type</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={values.color}
                onValueChange={itemValue => handleChange('color')(itemValue)}
                style={styles.picker}>
                {
                  user_types.map((user) => (
                    <Picker.Item label={user.label} value={user.value} key={user.label} />
                  ))
                }
              </Picker>
            </View>

            <TouchableOpacity style={styles.buttonView}>
              <LinearGradient
                colors={['#1410B4', '#040268']}
                style={styles.buttonStyle}>
                <Text style={styles.buttonText}>Generate Invite</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TextInput
              onChangeText={handleChange('invite')}
              aria-disabled
              onBlur={handleBlur('invite')}
              value={values.invite}
              placeholder="Invite"
              style={styles.inputInviteStyle}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputInviteStyle: {
    borderWidth: 2,
    marginTop: 16,
    borderColor: '#1410B4',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inputStyle: {
    borderWidth: 2,
    borderColor: '#1410B4',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  formStyle: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    width: 240,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  picker: {
    height: 50,
    borderColor: 'black',
  },
  pickerWrapper: {
    borderWidth: 2,
    borderColor: '#1410B4',
    borderRadius: 10,
    overflow: 'hidden', 
  },
  buttonView: {
    width: '100%',
    marginTop: '4%',
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonStyle: {
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
});
