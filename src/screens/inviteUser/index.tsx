import React,{useEffect, useState} from 'react';
import { View, StyleSheet, TextInput, Text, Alert, Clipboard, } from 'react-native';

import { Formik } from 'formik';
import { DocumentData } from '@firebase/firestore'; 

import { user_types } from '../../constants/invite';
import SelectField from './components/SelectField';
import CustomButton from '../../components/CustomButton';

import { getHalka } from '../../firebase/Halka';
import { setUser } from '../../firebase/User';

 const initialValue = {
    cnic: '',
    type: 'canidiate',
    halka: 'na-12', 
 };
  
 const InviteUser = () => {

  const [halka, setHalka] = useState<DocumentData[]>([])
  const [error, setError] = useState({
    cnicError: '',
  })
  const [invite, setInvite] = useState<string>('')
  const regex = /^[0-9]{13}$/;

  useEffect(() => {
        fetchData();
  }, []);
  
   const fetchData = async () => {
     const data = await getHalka();
     setHalka(data);
   };
  
       

   const handleSubmit = async (values: any) => {
     if (!regex.test(values.cnic)) {
       setError({
         ...error,
         cnicError:'*CNIC must be exactly 13 digits long and contain only numbers.'});
     }
     else {
       setError({
         ...error,
         cnicError: ''
       });
       const userInvite = await setUser(values)
       Alert.alert(userInvite||'')
       setInvite(userInvite || '')
    }
  }
  
  return (
    <View style={styles.safeArea}>
      <Formik
        initialValues={initialValue}
        onSubmit={values => console.log("Values",values)}>
        {({handleChange, handleBlur, values, resetForm}) => (
          <View style={styles.formStyle}>
            <View style={styles.selectContainer}>
            <Text style={styles.textStyle}>CNIC</Text>
            <TextInput
              onChangeText={handleChange('cnic')}
              value={values.cnic}
                placeholder="CNIC"
                keyboardType='numeric'
                maxLength={13}
              style={styles.inputStyle}
              />
            {error.cnicError ? <Text style={styles.errorText}>{error.cnicError}</Text> : null}
            </View>
            <SelectField types={user_types} values={values.type} handleChange={handleChange} type={'type'} />
            <SelectField types={halka} values={values.halka} handleChange={handleChange} type={'halka'} />
            <CustomButton text={'Generate Invite'} onPress={()=>handleSubmit(values)}/>
            <TextInput
              onChangeText={handleChange('invite')}
              onBlur={handleBlur('invite')}
              value={invite}
              placeholder="Invite"
              readOnly={true}
              style={styles.inputInviteStyle}
            />
            <CustomButton text={'Copy to Clipboard'} onPress={() => (
               Clipboard.setString(invite)
            )}/>
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
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
    fontFamily: 'Lato-Bold',
  },
  inputInviteStyle: {
    borderWidth: 2,
    marginTop: 16,
    borderColor: '#1410B4',
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
    fontFamily: 'Lato-Regular',
  },
  errorText: {
    color: 'red',
    marginTop: 8,
    fontFamily: 'Lato-Regular',
  },
  inputStyle: {
    borderWidth: 2,
    borderColor: '#808080',
    borderRadius: 30,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'Lato-Regular',
  },
  selectContainer: {
    marginTop: 10,
    marginBottom: 5,
  },
  formStyle: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  buttonView: {
    width: '100%',
    marginTop: '4%',
    borderRadius: 20,
    alignItems: 'center',
  },
})

export default InviteUser
