import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ClasesStack from './ClasesStack';
import ReservasScreen from '../screens/ReservasScreen';
import PerfilScreen from '../screens/PerfilScreen'; // Importamos la pantalla real

const Tab = createBottomTabNavigator();

const ICONOS_TAB = {
  InicioTab: { activo: 'home', inactivo: 'home-outline' },
  ReservasTab: { activo: 'calendar', inactivo: 'calendar-outline' },
  PerfilTab: { activo: 'person', inactivo: 'person-outline' },
};

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icono = ICONOS_TAB[route.name] || { activo: 'square', inactivo: 'square-outline' };
          const iconName = focused ? icono.activo : icono.inactivo;
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="InicioTab" 
        component={ClasesStack} 
        options={{ title: 'Inicio', headerShown: false }} 
      />
      <Tab.Screen 
        name="ReservasTab" 
        component={ReservasScreen} 
        options={{ title: 'Reservas' }} 
      />
      <Tab.Screen 
        name="PerfilTab" 
        component={PerfilScreen} 
        options={{ title: 'Perfil' }} 
      />
    </Tab.Navigator>
  );
}