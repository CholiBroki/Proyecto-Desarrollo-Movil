import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_USUARIO = '@perfil_usuario_ingles';

export const UsuarioContext = createContext(null);

export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargandoUsuario, setCargandoUsuario] = useState(true);

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const guardado = await AsyncStorage.getItem(CLAVE_USUARIO);
        if (guardado !== null) {
          setUsuario(JSON.parse(guardado));
        }
      } catch (error) {
        console.log('Error al cargar datos del usuario', error);
      } finally {
        setCargandoUsuario(false);
      }
    };
    cargarUsuario();
  }, []);

  const guardarEnStorage = async (datos) => {
    try {
      if (datos === null) {
        await AsyncStorage.removeItem(CLAVE_USUARIO);
      } else {
        await AsyncStorage.setItem(CLAVE_USUARIO, JSON.stringify(datos));
      }
    } catch (error) {
      console.log('Error al guardar datos del usuario', error);
    }
  };

  const registrarUsuario = useCallback((nombre, correo, telefono) => {
    const nuevoUsuario = {
      nombre: nombre.trim(),
      correo: correo.trim(),
      telefono: telefono.trim(),
      fechaRegistro: new Date().toLocaleDateString(),
    };
    setUsuario(nuevoUsuario);
    guardarEnStorage(nuevoUsuario);
  }, []);

  const actualizarPerfil = useCallback((nuevoCorreo, nuevoTelefono) => {
    setUsuario((previo) => {
      if (!previo) return null;
      const actualizado = {
        ...previo,
        correo: nuevoCorreo.trim(),
        telefono: nuevoTelefono.trim(),
      };
      guardarEnStorage(actualizado);
      return actualizado;
    });
  }, []);

  const eliminarRegistro = useCallback(() => {
    setUsuario(null);
    guardarEnStorage(null);
  }, []);

  const valor = useMemo(() => ({
    usuario,
    cargandoUsuario,
    registrarUsuario,
    actualizarPerfil,
    eliminarRegistro,
  }), [usuario, cargandoUsuario, registrarUsuario, actualizarPerfil, eliminarRegistro]);

  return (
    <UsuarioContext.Provider value={valor}>
      {children}
    </UsuarioContext.Provider>
  );
}