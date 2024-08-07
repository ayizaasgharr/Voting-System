import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Picker } from '@react-native-picker/picker';

import { Select } from '../../../../interfaces/selectfield';

const SelectField = ({ types, values, handleChange, type }: Select) => {
    return (
        <View style={styles.selectContainer}>
            <Text style={styles.textStyle}>Choose {type}</Text>
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={values}
                    onValueChange={itemValue => handleChange(type)(itemValue)}
                    style={styles.picker}>
                    {
                       types.map((type) => 
                            'label' in type ? 
                                <Picker.Item label={type.label} value={type.value||types[0]} key={type.label}  /> :
                                <Picker.Item label={type.Name} value={type.Name||types[0]} key={type.Name}  />
                        )
                    }
                </Picker>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
   textStyle: {
    color: 'black',
    fontSize: 16,
    marginTop: 2,
    fontWeight:'bold',
    textTransform:'capitalize'
  },
    selectContainer: {
        marginTop: 10,
        marginBottom: 5
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
        borderColor: '#808080',
        borderRadius: 30,
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 10,
    },
});

export default React.memo(SelectField);
