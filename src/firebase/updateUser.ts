import firestore from '@react-native-firebase/firestore';
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

