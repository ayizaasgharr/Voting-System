import firestore from '@react-native-firebase/firestore';

const seed = async () => {
  try {
       const userQuerySnapshot = await firestore()
         .collection('User')
         .where('email', '==', 'admin21@gmail.com')
         .get();
  
    if (userQuerySnapshot.empty) {
           await firestore().collection('User').add({
             name: 'Admin',
             password: 'admin1234',
             email: 'admin21@gmail.com',
             user_type: 'admin',
           });
         }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};
export default seed;
