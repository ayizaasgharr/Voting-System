import firestore from '@react-native-firebase/firestore';

const getHalka = async () => {
    try {
        const halkaSnapshot = await ( await firestore().collection('Halka').get()).docs
        const halkaData = halkaSnapshot.map(doc => doc.data());
        return halkaData;
    } catch (e) {
        return []
    }
}

export default getHalka;
