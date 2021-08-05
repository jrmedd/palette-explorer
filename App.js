import 'react-native-gesture-handler';
import * as React from 'react';
import { Platform, Text, View, Pressable, UIManager, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ToastProvider } from 'react-native-toast-notifications'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PalettesProvider } from './components/utils/PalettesContext';
import { PaletteList } from './components/screens/PaletteList';
import { ColorList } from './components/screens/ColorList';



const Stack = createStackNavigator();

export default function App() {
  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const [palettes, setPalettes] = React.useState([])
  React.useEffect(()=>{
    fetch('https://collision.digital/palettes/5')
    .then(res=>res.status==200&&res.json())
    .then(data=>setPalettes(data.palettes))
  }, [])
  return(
    <PalettesProvider value={palettes}>
      <ToastProvider duration={2000}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Palette list" component={PaletteList}></Stack.Screen>
            <Stack.Screen name="Color list" component={ColorList} options={({route})=>({ title: route.params.paletteName })}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </PalettesProvider>
  )
}


