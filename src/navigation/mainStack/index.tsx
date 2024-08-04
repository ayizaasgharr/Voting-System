import { TouchableOpacity, StyleSheet } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Dashboard from '../../screens/dashboard';
import InviteUser from '../../screens/inviteUser';
import { useUser } from '../../context/UserContext';


const Stack = createNativeStackNavigator();

const MainStack = () => {

    const { setUser } = useUser();

    const handleSignOut = async () => {
        try {
            await auth().signOut();
            setUser(null);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    headerTintColor: '#fff',
                    headerRight: () => (<TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
                        <Icon name="logout" size={24} color="white" /> 
                    </TouchableOpacity>),
                    headerStyle: {
                        backgroundColor: '#1410B4',
                    },
                }}
            />
            <Stack.Screen
                name="Invite"
                component={InviteUser}
                options={{
                    headerTintColor: '#fff',
                    headerTitle: 'Create Invite',
                    headerStyle: {
                        backgroundColor: '#1410B4',
                    },
                }}
            />
        </Stack.Navigator>
    )
}
export default MainStack


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signOutButton: {
        marginRight: 15,
    },
});
