import React, { useState, useEffect, useCallback, useMemo, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_RESERVA = '@reservas_ingles';

export const ReservaContext = createContext(null);

export function ReservaProvider({ children }) {
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargar = async () => {
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

    useEffect(() => {
        if (cargando) return; // Evita sobrescribir el arreglo de reservas mientras se está cargando
        AsyncStorage.setItem(CLAVE_RESERVA, JSON.stringify(reservas)).catch((error) => 
            console.log('Ocurrió un error guardando la reserva: ', error)
        );
    }, [reservas, cargando]);

    // REQ 6: Agregar reserva y validar duplicados por horario
    const agregarReserva = useCallback((clase, horario) => {
        // 1. Validamos sobre el estado actual antes de modificarlo
        const duplicado = reservas.some((r) => r.horario === horario);
        
        if (duplicado) {
            return { ok: false, mensaje: `Ya tienes una clase agendada el ${horario}.` };
        }

        // 2. ID único de la reserva combinando id de clase y horario (o timestamp)
        const nueva = {
            id: `${clase.id}-${horario}-${Date.now()}`,
            idClase: clase.id,
            titulo: clase.titulo,
            nivel: clase.nivel,
            profesor: typeof clase.profesor === 'object' ? `${clase.profesor.nombre} ${clase.profesor.apellido}` : clase.profesor,
            precio: clase.precio,
            horario,
            creadoEn: new Date().toISOString(),
        };

        setReservas((previa) => [nueva, ...previa]);
        return { ok: true, mensaje: 'Reserva agendada exitosamente.' };
    }, [reservas]); // Añadimos reservas como dependencia para tener el valor actualizado

    // REQ 4: Función para cancelar una reserva por su id
    const cancelarReserva = useCallback((idReserva) => {
        setReservas((previa) => previa.filter((r) => r.id !== idReserva));
    }, []);

    // Se agregan paréntesis () para retornar el objeto correctamente
    const valor = useMemo(() => ({
        reservas,
        cargando,
        agregarReserva,
        cancelarReserva,
    }), [reservas, cargando, agregarReserva, cancelarReserva]);

    return (
        <ReservaContext.Provider value={valor}>
            {children}
        </ReservaContext.Provider>
    );
}