import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ClasesStack from './ClasesStack';

const ReservasScreen = () => (
    <View style={styles.center}>
        <Text>Pantalla de Reservas</Text>
    </View>
);

const PerfilScreen = () => (
    <View style={styles.center}>
        <Text>Pantalla de Perfil</Text>
    </View>
);

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'InicioTab') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'ReservasTab') {
                        iconName = focused ? 'calendar' : 'calendar-outline';
                    }
                    else if (route.name === 'PerfilTab') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen 
            name="InicioTab" 
            component={ClasesStack}
            options={{ headerShown: false, title: 'Inicio' }}
            />
            <Tab.Screen name="ReservasTab" 
            component={ReservasScreen}
            options={{ title: 'Reservas' }}
            />
            <Tab.Screen name="PerfilTab" 
            component={PerfilScreen} 
            options={{ title: 'Perfil' }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});