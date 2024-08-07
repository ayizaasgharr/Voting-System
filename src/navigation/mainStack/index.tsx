import { TouchableOpacity, StyleSheet } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Dashboard from '../../screens/dashboard';
import InviteUser from '../../screens/inviteUser';
import CanidiateForm from '../../screens/canidiateForm';
import CanidiateInvites from '../../screens/canidiateInvites';
import HalkaForm from '../../screens/halkaForm';

import VotesReceived from '../../screens/canidiateView';
import VoterList from '../../screens/voterList';
import Voting from '../../screens/voting';
import CastVote from '../../screens/castVote';
import Result from '../../screens/result';

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
                    headerTitleStyle: styles.headerTitleStyle,
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
                    headerTitleStyle: styles.headerTitleStyle,
                }}
            />
            <Stack.Screen
                name="Canidiate Form"
                component={CanidiateForm}
                options={{
                    headerTintColor: '#fff',
                    headerTitle: 'Create Canidiate',
                    headerStyle: {
                        backgroundColor: '#1410B4',
                    },
                    headerTitleStyle: styles.headerTitleStyle,
                }}
            />
            <Stack.Screen
                name="Create Halka"
                component={HalkaForm}
                options={{
                    headerTintColor: '#fff',
                    headerTitle: 'Create Halka',
                    headerStyle: {
                        backgroundColor: '#1410B4',
                    },
                    headerTitleStyle: styles.headerTitleStyle,
                }}
            />
            <Stack.Screen
                name="Invite Candidiate"
                component={CanidiateInvites }
                options={{
                    headerTintColor: '#fff',
                    headerTitle: 'Invite Canidiate',
                    headerStyle: {
                        backgroundColor: '#1410B4',
                    },
                    headerTitleStyle: styles.headerTitleStyle,
                }} />
            <Stack.Screen
                name="Voters list"
                component={VoterList}
                options={{
                    headerTintColor: '#fff',
                    headerTitle: 'Voters list',
                    headerStyle: {
                        backgroundColor: '#1410B4',
                    },
                    headerTitleStyle: styles.headerTitleStyle,
                }} />
            <Stack.Screen
                name="Voting"
                component={Voting}
                options={{
                    headerTintColor: '#fff',
                    headerTitle: 'Schedule Voting',
                    headerStyle: {
                        backgroundColor: '#1410B4',
                    },
                    headerTitleStyle: styles.headerTitleStyle,
                }} />
            <Stack.Screen
                name="Cast Vote"
                component={CastVote}
                options={{
                    headerTintColor: '#fff',
                    headerTitle: 'Cast Vote',
                    headerStyle: {
                        backgroundColor: '#1410B4',
                    },
                    headerTitleStyle: styles.headerTitleStyle,
                }} />
            <Stack.Screen
                name="Result"
                component={Result}
                options={{
                    headerTintColor: '#fff',
                    headerTitle: 'Result',
                    headerStyle: {
                        backgroundColor: '#1410B4',
                    },
                    headerTitleStyle: styles.headerTitleStyle,
                }} />
            <Stack.Screen
                name="Votes Received"
                component={VotesReceived}
                options={{
                    headerTintColor: '#fff',
                    headerTitle: 'Result',
                    headerStyle: {
                        backgroundColor: '#1410B4',
                    },
                    headerTitleStyle: styles.headerTitleStyle,
            }}/>
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
    headerTitleStyle: {
        fontFamily: 'Lato-Bold',
        fontSize: 20, 
    }
});
