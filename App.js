import 'react-native-gesture-handler';
import * as React from 'react';
import { Platform, Text, View, Pressable, UIManager, StyleSheet, SectionList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ToastProvider } from 'react-native-toast-notifications'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import { PalettesProvider } from './components/utils/PalettesContext';
import { About } from './components/screens/About';
import { ColorList } from './components/screens/ColorList';
import { PaletteList } from './components/screens/PaletteList';
import { SettingsList } from './components/screens/SettingsList';



const PaletteStack = createStackNavigator();

const PalettesScreen = () => (
  <PaletteStack.Navigator>
    <PaletteStack.Group>
      <PaletteStack.Screen name="Palette list" component={PaletteList}></PaletteStack.Screen>
      <PaletteStack.Screen name="Color list" component={ColorList} options={({route})=>({ title: route.params.paletteName })}></PaletteStack.Screen>
    </PaletteStack.Group>
    <PaletteStack.Group screenOptions={{ presentation: 'modal' }}>
      <PaletteStack.Screen name="About" component={About} />
    </PaletteStack.Group>
  </PaletteStack.Navigator>
)
const SettingsStack = createStackNavigator();

const SettingsScreen = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen name="App settings" component={SettingsList} />
  </SettingsStack.Navigator>
)

const Tab = createBottomTabNavigator();

export default function App() {
  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const [palettes, setPalettes] = React.useState({numberOfColors: '5', paletteData: []})
  React.useEffect(()=>{
    fetch(`https://collision.digital/palettes/${palettes.numberOfColors}`)
    .then(res=>res.status==200&&res.json())
    .then(data=>setPalettes({...palettes, paletteData:data.palettes}))
  }, [palettes.numberOfColors])
  return(
    <PalettesProvider value={[palettes, setPalettes]}>
      <ToastProvider duration={2000}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case 'Palettes':
                iconName = 'color-palette';
                break;
              case 'Settings':
                iconName = 'cog';
                break;
              default:
                break;
            }
            if (!focused) iconName += '-outline'
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false
        })}>
           <Tab.Screen name="Palettes" component={PalettesScreen}/>
           <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </PalettesProvider>
  )
}