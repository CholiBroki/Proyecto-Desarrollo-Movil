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

    useEffect(()=>{
        if(cargando) return; // Evita sobrescribir el arreglo de reservas mientras se está cargando
        AsyncStorage.setItem(CLAVE_RESERVA, JSON.stringify(reservas)).catch((error) => 
            console.log('Ocurrio un error guardando la reserva: ', error)
        );
    },[reservas, cargando]);

    const agregarReserva = useCallback((clase, horario) => {
        const nueva = {
            id: clase.id + '-' + horario,
            id: clase.id,
            titulo: clase.titulo,
            nivel: clase.nivel,
            profesor: clase.profesor.nombre + ' ' + clase.profesor.apellido,
            precio: clase.precio,
            horario,
            creadoEn: new Date().toISOString(),
        };
        let resultados = {ok: true};
        setReservas((previa) => {
            if (previa.some((r) => r.id === nueva.id)) {
                resultados = {ok: false, mensaje: 'Data duplicada'}
                return previa;
            }
            return [nueva, ...previa];
        });
        return resultados;
    }, []);//Cierra el callback

    const valor = useMemo(
        ()=> {reservas, cargando, agregarReserva},[reservas, cargando, agregarReserva]
    );

    return (
        <ReservaContext.Provider value={valor}>
            {children}
        </ReservaContext.Provider>
    );
}//Esta es la llave de cierre para la función ReservaProvider
