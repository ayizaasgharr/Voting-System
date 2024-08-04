import storage from '@react-native-firebase/storage';

 export const uploadImage = async (uri: string) => {

    try {
        await storage().ref('1234').putFile(uri);
        const url = await storage().ref('1234').getDownloadURL();
        return url
    } catch (error) {
        console.error('Upload Error:', error);
    } 
};