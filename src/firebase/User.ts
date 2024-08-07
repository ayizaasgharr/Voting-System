import firestore from '@react-native-firebase/firestore';

import generateRandomString from '../utils/RandomString';

const setUser = async (values: any) => {
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

            const invite = await firestore().collection('Invite').add({
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
export default setUser;
