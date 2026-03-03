import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from './screen/Register';
import Login from './screen/Login';
import LandingPage from './screen/LandingPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing Page" component={LandingPage} />
       <Stack.Screen name="Register" component={Register} />
         <Stack.Screen name="Login" component={Login} />
       </Stack.Navigator>
    </NavigationContainer>
    

    
  );
}