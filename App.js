import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostScreen from './src/PostScreen';
import Webview from './src/Webview';

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Posts" component={PostScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Webview" component={Webview} options={{title:'Back',headerTitleStyle:{
        fontSize:15,
        fontWeight:'bold'
      },
      headerTintColor:'gray'
      }} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App