import firestore from '@react-native-firebase/firestore';


const verifyInvite = async (values: any) => {
    try {
        
        const userQuerySnapshot = await firestore()
            .collection('User')
            .where('cnic', '==', values.cnic)
            .get();
        let userId;

        if (!userQuerySnapshot.empty) {

            userId = userQuerySnapshot.docs[0].id
            if (!userQuerySnapshot.empty) {
                const inviteQuerySnapshot = await firestore().collection('Invite').where('userId', '==', userId).get()
                if (!inviteQuerySnapshot.empty && values.invite == inviteQuerySnapshot.docs[0].data().invite) {
                    return { invite: true, userid: userId }
                }
            }

        }
        
        return { invite: false, userid: userId }
    } catch (error) {
        console.error('Error seeding data:', error);
    }
};
export default verifyInvite;
