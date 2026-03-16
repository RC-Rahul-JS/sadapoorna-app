import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// HomeScreen import karein (Path: src/screens/HomeScreen.tsx)
import HomeScreen from './src/components/sadapoorna/HomeScreen';
import AboutUsScreen from './src/screens/AboutUsScreen';
import Help from './src/screens/help';
import Mybill from './src/screens/my-bills';
import Contactus from './src/screens/contact-us';
import MyOrders from './src/screens/my-orders';
import Payments from './src/screens/payments';
// import Productlist from './src/screens/product-list';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="/about-us" component={AboutUsScreen} />
          <Stack.Screen name="/contact-us" component={Contactus} />
        <Stack.Screen name="/help" component={Help} />
        <Stack.Screen name="/my-bills" component={Mybill} />
 <Stack.Screen name="/my-orders" component={MyOrders} />
  <Stack.Screen name="/payments" component={Payments} />
{/* <Stack.Screen name="/productlist" component={Productlist} /> */}


        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}