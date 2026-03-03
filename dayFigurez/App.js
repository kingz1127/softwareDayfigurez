import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from './screen/Register';
import Login from './screen/Login';
import LandingPage from './screen/LandingPage';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import HomeScreen from './screen/HomeScreen';
import ForgetPassworScreen from './screen/ForgetPassworScreen';
// import ForgetPassworScreen from './screen/ForgetPassworScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    
    <GluestackUIProvider mode="dark">
      <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing Page" component={LandingPage} />
       <Stack.Screen name="Register" component={Register} />
       <Stack.Screen name="Home" component={HomeScreen} />
       <Stack.Screen name="ForgetPassword" component={ForgetPassworScreen} />
         <Stack.Screen name="Login" component={Login} />
       </Stack.Navigator>
    </NavigationContainer>
    </GluestackUIProvider>
  
    

    
  );
}