import {
    SafeAreaView,
    StyleSheet,
    View,
    TextInput,
    Text
} from 'react-native';
import { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import CustomButton from '../../components/CustomButton';
import { createHalka } from '../../firebase/Halka';

import { SuccessMessages } from '../../constants/message';

export default function HalkaForm() {

    const navigation = useNavigation<any>()

    const [halka, setHalka] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async () => {
        const response = await  createHalka(halka)
        if (response == SuccessMessages.CREATED_HALKA) {
            navigation.navigate('Dashboard')
        }
        else {
            if(response)
            {
                setError(response)
            }
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.formContainer}> 
                            <TextInput
                                style={styles.input}
                                placeholder="Halka Name"
                                value={halka}
                                onChangeText={setHalka}
                                autoCorrect={false}
                                autoCapitalize="none"
                />
                {
                    error && <Text style={styles.errorText}>Error:{error}</Text>
                }
                <CustomButton text={'Create Halka'} onPress={handleSubmit} />
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },

    formContainer: {
        marginTop: "15%",
        justifyContent: 'center',
        alignItems:'center'
    },

    input: {
        height: 50,
        borderColor: 'black',
        color: 'black',
        paddingHorizontal: '5%',
        width: 240,
        borderWidth: 2,
        borderRadius: 25,
        marginBottom: 5,
    },

    errorText: {
        color: 'red',
        marginTop: 2,
        marginBottom: 8,
        backgroundColor: 'white',
        marginHorizontal: 32,
        paddingHorizontal: 8
    },

});