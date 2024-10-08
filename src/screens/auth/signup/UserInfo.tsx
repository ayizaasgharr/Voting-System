import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    Image
} from 'react-native';
import { useState, useEffect } from 'react';

import auth from '@react-native-firebase/auth';
import { Formik } from 'formik';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { useRoute } from '@react-navigation/native';

import { useUser } from '../../../context/UserContext';
import { uploadImage } from '../../../utils/UploadImage';
import { updateUser } from '../../../firebase/User';
import { getRoleById } from '../../../firebase/User';


export default function UserInfo() {

    const [errorText, setErrorText] = useState('')
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [symbolUri, setSymbolUri] = useState<string | null>(null);

    const [role, setRole] = useState<string>('')
    
    const { setUser } = useUser();
    const route = useRoute();
    const { id } = route.params as { id: string }; 

    const getRole = async() => {
        const role = await getRoleById(id)
        setRole(role)
    }

    useEffect(() => {
        getRole()
    }, [])

    
    const selectImage = (type:string) => {
        launchImageLibrary({ mediaType: 'photo' },async (response: ImagePickerResponse) => {
            if (response.errorCode) {
                Alert.alert('ImagePicker Error', response.errorMessage || 'An error occurred');
            } else {
                if (type == 'profile_picture')
                {
                    setImageUri(response.assets?.[0].uri || null);
                }
                else if (type == 'party_symbol') {
                    setSymbolUri(response.assets?.[0].uri || null)
                }
            
            }
        });
    };

    const handleSubmit = async (values: any) => {
        try {
            if (values.email && values.password && imageUri ) {
                const uri = await uploadImage(imageUri); 
                if (symbolUri)
                {
                const symbol_uri = await uploadImage(symbolUri)
                await updateUser({
                    image: uri,
                    email: values.email,
                    partySymbol: symbol_uri,
                    partyName: values.party_name
                }, id)
                } else {
                    await updateUser({
                        image: uri,
                        email: values.email,
                    },id)
                }
                
               await  auth()
                    .createUserWithEmailAndPassword(values.email, values.password)
                setUser(auth().currentUser);
               
            }
            else {
                setErrorText('Email/Password is mandatory')
                
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
       
        <LinearGradient colors={['#1410B4', '#040268']} style={styles.safeArea}>
            <View style={styles.formContainer}>
            <Formik
                    initialValues={{ email: '', password: '', party_name:'', }}
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
                            placeholder="Your Email"
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            autoCorrect={false}
                            placeholderTextColor={'white'}
                            autoCapitalize="none"
                        />
                        {touched.email && errors.email ? (
                            <Text style={styles.errorText}>{errors.email}</Text>
                        ) : null}
                        <TextInput
                            style={styles.input}
                            placeholder="Your Password"
                            secureTextEntry
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            autoCorrect={false}
                            autoCapitalize="none"
                            placeholderTextColor={'white'}
                        />
                        {touched.password && errors.password ? (
                            <Text style={styles.errorText}>{errors.password}</Text>
                            ) : null}
                           { role=='canidiate'&& <TextInput
                                style={styles.input}
                                placeholder="Party Name"
                                value={values.party_name}
                                onChangeText={handleChange('party_name')}
                                onBlur={handleBlur('party_name')}
                                autoCorrect={false}
                                autoCapitalize="none"
                                placeholderTextColor={'white'}
                            />}
                             <View style={styles.imageContainer}>
                                    {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
                                    <TouchableOpacity style={styles.buttonStyle} onPress={()=>selectImage('profile_picture')}>
                                        <LinearGradient colors={['#ED21D9', '#970DD9']} style={styles.buttonStyle}>
                                            <Text style={styles.buttonText}>Upload Image</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            {
                                role == 'canidiate' &&
                                <View style={styles.imageContainer}>
                                    {symbolUri && <Image source={{ uri: symbolUri }} style={styles.image} />}
                                    <TouchableOpacity style={styles.buttonStyle} onPress={() => selectImage('party_symbol')}>
                                        <LinearGradient colors={['#ED21D9', '#970DD9']} style={styles.buttonStyle}>
                                            <Text style={styles.buttonText}>Upload Party Symbol</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>}
                        <View style={styles.buttonView}>
                            <TouchableOpacity onPress={() => handleSubmit(values)} style={styles.buttonView}>
                                <LinearGradient colors={['#ED21D9', '#970DD9']} style={styles.buttonStyle}>
                                    <Text style={styles.buttonText}>Submit</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                    )}
                    
                </Formik>
            </View>
        </LinearGradient>
    </SafeAreaView>
)

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

    formContainer: {
        marginTop:"25%",
    },

    imageContainer: {
        alignItems: 'center',
        width: '100%',
        borderRadius: 8,
        
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
        fontSize: 14,
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

    errorText: {
        color: 'red',
        marginTop: 2,
        marginBottom: 8,
        backgroundColor: 'white',
        marginHorizontal: 32,
        paddingHorizontal: 8
    },

    button: {
        backgroundColor: 'white',
        borderRadius: 20,

    },

    imageButtonText: {
        color: 'black',
        fontSize: 18,
        width: 240,
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center',
    },
    
    uploadImage: {
        width: 200,
        height: 200,
        borderRadius: 8,
        resizeMode: 'cover',
    },
});
