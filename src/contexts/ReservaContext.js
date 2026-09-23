import React, { useState, useEffect, useCallback, useMemo, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_RESERVA = '@reservas_ingles';

export const ReservaContext = createContext(null);

export function ReservaProvider({ children }) {
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        let cargar = async () => {
            try {
                const guardado = await AsyncStorage.getItem(CLAVE_RESERVA);
                if (guardado !== null) {
                    setReservas(JSON.parse(guardado));
                }
            } catch (error) {
                console.log('Error leyendo reservas', error);
            } finally {
                setCargando(false);
            }
        };
        cargar();
    }, []);
}
