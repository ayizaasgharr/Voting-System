import React from "react";
import { Text, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { CustomButtonProps } from "../interfaces/CustomButton";

const CustomButton = ({text, onPress}: CustomButtonProps) => (
              <TouchableOpacity style={styles.buttonView} onPress={onPress} >
              <LinearGradient
                colors={['#1410B4', '#040268']}
                style={styles.buttonStyle}>
            <Text style={styles.buttonText}>{text}</Text>
              </LinearGradient>
            </TouchableOpacity>
)

const styles = StyleSheet.create({
  
    buttonView: {
    width: '100%',
    marginTop: '4%',
    borderRadius: 20,
    alignItems: 'center',
  },

   buttonText: {
    color: 'white',
    width: 240,
    padding: 10,
     textAlign: 'center',
     fontFamily: 'Lato-Bold',
     fontSize: 18, 
  },
   
    buttonStyle: {
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
});

export default CustomButton