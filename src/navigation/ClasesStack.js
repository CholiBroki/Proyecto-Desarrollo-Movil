import react from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ClasesScreen from '../screens/ClasesScreen';
import {colors} from '../theme';
import DetalleClaseScreen from '../screens/DetalleClaseScreen';

const Stack = createNativeStackNavigator();

export default function ClasesStack(){
    const insets = useSafeAreaInsets();
    return(
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    height: 60 + insets.top,
                    backgroundColor: colors.superficie,
                },
                headerTitleStyle: {
                    marginTop: insets.top / 2,
                },
            }}
        >
            <Stack.Screen
                name="Clases"
                component={ClasesScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="DetalleClase"
                component={DetalleClaseScreen}
                options={{
                    title: 'Detalle', headerBackTitle: 'Atrás',
                }}
            />
        </Stack.Navigator>
    );
}
