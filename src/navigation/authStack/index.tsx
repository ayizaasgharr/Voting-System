import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../../screens/auth/login/Login';
import Signup from '../../screens/auth/signup/Signup';
import UserInfo from '../../screens/auth/signup/UserInfo';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Signup"
                component={Signup}
                options={{
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#1410B4',
                    },
                }}
            />
            <Stack.Screen
                name="User Info"
                component={UserInfo}
                options={{
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#1410B4',
                    },
                }}
            />
            </Stack.Navigator>
    )
}
export default AuthStack
