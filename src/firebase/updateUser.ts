import firestore from '@react-native-firebase/firestore';

const updateUser = async (values: any,id:string) => {
    try {
        const userRef = await firestore()
            .collection('User')
            .doc(id)
        await userRef.update(values);
        return 'User updated successfully';
    } catch (error) {
        return 'Error updating user';
    }
};
export default updateUser;
