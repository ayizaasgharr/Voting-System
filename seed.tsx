import firestore from '@react-native-firebase/firestore';

const seed = async () => {
  try {
       const userQuerySnapshot = await firestore()
         .collection('User')
         .where('Email', '==', 'admin21@gmail.com')
         .get();
         if (userQuerySnapshot.empty) {
           await firestore().collection('User').add({
             Name: 'Admin',
             Password: 'admin1234',
             Email: 'admin21@gmail.com',
             UserType: 'Admin',
           });
         }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};
export default seed;
