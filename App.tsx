/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';

import seed from './seed';
import RootNavigator from './src/navigation/rootNavigator';
import { UserProvider } from './src/context/UserContext';

function App(): React.JSX.Element {


  useEffect(() => {
    seed()
  }, [])

  
  return (
    <UserProvider>
        <RootNavigator />
    </UserProvider>
  );
}

export default App;

