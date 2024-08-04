import { NavigationContainer } from '@react-navigation/native';

import MainStack from "./mainStack";
import AuthStack from "./authStack";
import { useUser } from "../context/UserContext";


const RootNavigator = () => {

    const { user } = useUser();

    return (
    <NavigationContainer>
    {user ?
    <MainStack /> :
    <AuthStack />}
    </NavigationContainer >)
}

export default RootNavigator
