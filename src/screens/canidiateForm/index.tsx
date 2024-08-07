import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput,
    Alert,
    Image
} from 'react-native';
import { useState } from 'react';

import auth from '@react-native-firebase/auth';
import { Formik } from 'formik';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '../../components/CustomButton';
import { uploadImage } from '../../utils/UploadImage';
import { findUserByEmail, updateUser } from '../../firebase/User';

export default function CanidiateForm() {

    const [errorText, setErrorText] = useState('')
    const [imageUri, setImageUri] = useState<string | null>(null);
    const navigation = useNavigation<any>()
    
    const selectImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, async (response: ImagePickerResponse) => {
            if (response.errorCode) {
                Alert.alert('ImagePicker Error', response.errorMessage || 'An error occurred');
            } else {
                setImageUri(response.assets?.[0].uri || null);

            }
        });
    };

    const handleSubmit = async (values: any) => {
        try {
            if (values.partyName && imageUri) {

                const uri = await uploadImage(imageUri);
                const email = auth().currentUser?.email

                if(email)
                {
                    const userId = await findUserByEmail(email);
                    await updateUser({
                        partySymbol: uri,
                        partyName: values.partyName,
                        canidiateRequest:'pending'
                    }, userId)
                    navigation.navigate('Dashboard')
                   
                }
   
            }
            else {
                setErrorText('PartyName/Image is mandatory')

            }
        } catch (error: any) {
            setErrorText(error?.message);
            setTimeout(() => {
                setErrorText('');
            }, 5000);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
                <View style={styles.formContainer}>
                    <Formik
                        initialValues={{ partyName: '', password: '' }}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {({ handleChange, handleBlur, values, errors, touched }) => (
                            <View style={styles.inputView}>
                                {
                                    errorText && <Text style={styles.errorText}>Error:{errorText}</Text>
                                }
                                <Text style={styles.optionsText}>
                                    Please enter the following information
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Party Name"
                                    value={values.partyName}
                                    onChangeText={handleChange('partyName')}
                                    onBlur={handleBlur('partyName')}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                />          
                                <View style={styles.imageContainer}>
                                {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
                                <CustomButton text={'Upload Image'} onPress={selectImage}/>
                                </View>
                            <View style={styles.buttonView}>
                                <CustomButton text={'Submit'} onPress={() => handleSubmit(values)} />
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },

    formContainer: {
        marginTop: "25%",
    },

    imageContainer: {
        alignItems: 'center',
        width: '100%',
        borderRadius: 8,

    },

    image: {
        height: 100,
        width: 100,
        borderRadius: 85,
    },

    inputView: {
        gap: 15,
        width: '100%',
        paddingHorizontal: 40,
        alignItems: 'center',
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

    buttonView: {
        width: '100%',
        marginTop: '4%',
        borderRadius: 25,
        alignItems: 'center',
    },

    optionsText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 13,
        marginTop: '4%',
    },

    errorText: {
        color: 'red',
        marginTop: 2,
        marginBottom: 8,
        backgroundColor: 'white',
        marginHorizontal: 32,
        paddingHorizontal: 8
    },

    uploadImage: {
        width: 200,
        height: 200,
        borderRadius: 8,
        resizeMode: 'cover',
    },
});
