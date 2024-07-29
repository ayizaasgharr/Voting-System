import firestore from '@react-native-firebase/firestore';

const getHalka = async () => {
    try {
        const userQuerySnapshot = await firestore()
            .collection('halka')
            .get();
        
        console.log("userquery", userQuerySnapshot,"docs",userQuerySnapshot.docs)
        
    } catch (error) {
        console.error('Error seeding data:', error);
    }
};
export default getHalka;
