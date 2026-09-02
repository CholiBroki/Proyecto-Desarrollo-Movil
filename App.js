import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ClassesStack from './src/navigation/ClasesStack';
import {colors} from './src/theme';

const temaNavegacion= {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.primary,
    card: colors.superficie,
    primary: colors.primario,
    text: colors.texto,
    border: colors.borde,
  }
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={temaNavegacion}>
        <StatusBar style="dark" />  
        <ClassesStack />
      </NavigationContainer>
    </SafeAreaProvider>

  );
}