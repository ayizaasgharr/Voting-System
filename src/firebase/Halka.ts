import firestore from '@react-native-firebase/firestore';

export const getHalka = async () => {
    try {
        const halkaSnapshot = await ( await firestore().collection('Halka').get()).docs
        const halkaData = halkaSnapshot.map(doc => doc.data());
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
