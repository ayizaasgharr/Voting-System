import { Alert } from 'react-native';

import firestore from '@react-native-firebase/firestore';

import { SuccessMessages } from '../constants/message';

export const getHalka = async () => {
    try {
        const halkaSnapshot = await firestore().collection('Halka').get()
        const halkaData = halkaSnapshot.docs.map(doc => doc.data());
        return halkaData;
    } catch (e) {
        return []
    }
}

export const getUserHalka = async (id:string) => {
    try {
        const userRef = await firestore()
            .collection('User')
            .doc(id)
            .get();
        const userId = userRef.data()
        return userId?.halka
    } catch (e) {
        return []
    }
}

export const getUsersbyHalka = async(halka:string) => {
    try {
        const userRef = await firestore()
            .collection('User')
            .where('halka', '==', halka).where('user_type', '==', 'voter').get()
        const userData =  userRef.docs.map(doc => doc.data());
        return userData
    } catch (e) {
        return []
    }
}

export const createHalka = async (name: string) => {
    if (name) {
        try {
            const halkaRef = firestore().collection('Halka').where('Name',"==",name);
            const doc = await halkaRef.get();

            if (!doc.empty) {
                Alert.alert('Info', 'Halka already exists.');
            } else {
                await firestore().collection('Halka').add({
                    Name: name,
                });

                return SuccessMessages.CREATED_HALKA
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to check or create Halka.');
            console.error('Error:', error);
        }
    } else {
        Alert.alert('Error', 'Please provide a valid Halka name.');
    }
};