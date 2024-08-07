import firestore from '@react-native-firebase/firestore';

import generateRandomString from '../utils/RandomString';
import { SuccessMessages } from '../constants/message';

export const updateUser = async (values: any,id:string) => {
    try {
        const userRef = await firestore()
            .collection('User')
            .doc(id)
        await userRef.update(values);
        return SuccessMessages.UPDATED_USER;
    } catch (error) {
        return 'Error updating user';
    }
};

export const findUserByEmail = async (email: string) => {
    try {
        const userRef = await firestore()
            .collection('User')
            .where('email', '==', email).get()
        const userId = userRef.docs[0].id
        return userId

    } catch (error) {
        return 'Error updating user';
    }
}

export const getRoleById = async (id: string) => {
    try {
        const userRef = await firestore()
            .collection('User')
            .doc(id).get()
        const role = userRef.data()?.user_type
        return role

    } catch (error) {
        return 'Error getting user';
    }
}

export const getUnapprovedCanidiates = async () => {
    try {
        const userSnapshot = await firestore()
            .collection('User')
            .where('user_type', '==', 'voter').where('canidiateRequest', '==', 'pending').get()
        const userData = userSnapshot.docs.map(doc => doc.data());

        return userData;
    } catch (error) {
        return []
    }
}

export const getVotersList = async () => {
    try {
        const userSnapshot = await firestore()
            .collection('User')
            .where('user_type', '==', 'voter').where('approved', '==', 'false').get()
        const userData = userSnapshot.docs.map(doc => doc.data());
        return userData;
    } catch (error) {
        return []
    }
}

export const setUser = async (values: any) => {
    try {
        const userQuerySnapshot = await firestore()
            .collection('User')
            .where('cnic', '==', values.cnic)
            .get();

        let token = ''
        if (userQuerySnapshot.empty) {
            token = generateRandomString(10)
            const user = await firestore().collection('User').add({
                cnic: values.cnic,
                halka: values.halka,
                user_type: values.type,
            });

           await firestore().collection('Invite').add({
                invite: token,
                userId: user.id,
                adminId: ''
            })
        }
        else {
            const userData = userQuerySnapshot.docs
            const invite = await firestore().collection('Invite').where('userId', '==', userData[0].id).get()
            token = invite.docs[0].data().invite

        }
        return token
    } catch (error) {
        console.error('Error seeding data:', error);
    }
};

export const getUserRole = async (email: string) => {
    const userRef = await firestore()
        .collection('User')
        .where('email', '==', email).get()
    const userRole = userRef.docs[0]?.data().user_type
    return userRole
}
