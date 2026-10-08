import React, { useState, useMemo, useLayoutEffect, useContext } from "react";
import { View, Text, ScrollView, Alert, Image, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import useResponsive from "../hooks/useResponsive";
import { colors, spacing, typography, radius } from "../theme";
import { formatearPrecio } from "../data/clases";
import { ReservaContext } from "../contexts/ReservaContext";

export default function DetalleClaseScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { clase } = route.params;
  const { isTable } = useResponsive();
  const { agregarReserva } = useContext(ReservaContext);

  const [cuposDisponibles, setCuposDisponibles] = useState(clase.cupos);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(
    clase.horarios && clase.horarios.length > 0 ? clase.horarios[0] : ''
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: clase.titulo,
      headerStyle: {
        height: 60 + insets.top,
        backgroundColor: colors.superficie,
      },
      headerTitleStyle: {
        marginTop: insets.top / 2,
      },
    });
  }, [navigation, insets, clase.titulo]);

  const ejecutarReserva = () => {
    const respuesta = agregarReserva(clase, horarioSeleccionado);

    if (respuesta.ok) {
      setCuposDisponibles((actual) => Math.max(0, actual - 1));
      Alert.alert(
        '¡Reserva Exitosa!',
        respuesta.mensaje || 'Tu clase ha sido agendada correctamente.',
        [
          {
            text: 'Ver Mis Reservas',
            onPress: () => navigation.navigate('ReservasTab'),
          },
          { text: 'Aceptar' },
        ]
      );
    } else {
      Alert.alert('Conflicto de Reserva', respuesta.mensaje);
    }
  };

  const handleReservar = () => {
    if (cuposDisponibles <= 0) {
      Alert.alert('Sin cupos', 'Ya no quedan cupos disponibles para esta clase.');
      return;
    }

    if (!horarioSeleccionado) {
      Alert.alert('Atención', 'Por favor selecciona un horario disponible.');
      return;
    }

    Alert.alert(
      'Confirmar Reserva',
      `¿Deseas reservar el curso "${clase.titulo}" para el horario ${horarioSeleccionado}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, reservar',
          onPress: ejecutarReserva,
        },
      ]
    );
  };

  return (
    <View style={styles.pantalla}>
      <ScrollView
        contentContainerStyle={{
          padding: spacing.lg,
          paddingBottom: insets.bottom + 120,
          gap: spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: clase.imagen }}
          style={[
            styles.portada,
            { height: isTable ? 300 : 200 },
          ]}
          resizeMode="cover"
        />

        <View style={styles.datos}>
          <View style={styles.dato}>
            <Text style={styles.datoValor}>{formatearPrecio(clase.precio)}</Text>
            <Text>Precio</Text>
          </View>
          <View style={styles.dato}>
            <Text style={styles.datoValor}>{clase.duracion} min</Text>
            <Text>Duración</Text>
          </View>
          <View style={styles.dato}>
            <Text style={styles.datoValor}>{cuposDisponibles}</Text>
            <Text>Cupos</Text>
          </View>
        </View>

        <View style={styles.profesor}>
          <Image source={{ uri: clase.profesor.foto }} style={styles.avatar} />
          <Text style={styles.profesorNombre}>
            {typeof clase.profesor === 'object'
              ? `${clase.profesor.nombre} ${clase.profesor.apellido}`
              : clase.profesor}
          </Text>
        </View>

        <Text style={styles.descripcion}>{clase.descripcion}</Text>

        <View>
          <Text
            style={{
              fontWeight: '700',
              color: colors.texto,
              marginBottom: 8,
            }}
          >
            Selecciona un horario disponible:
          </Text>
          <View style={styles.contenedorHorarios}>
            {clase.horarios.map((horario, index) => {
              const seleccionado = horarioSeleccionado === horario;
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.chipHorario, seleccionado && styles.chipSeleccionado]}
                  onPress={() => setHorarioSeleccionado(horario)}
                >
                  <Ionicons
                    name={seleccionado ? 'checkmark-circle' : 'time-outline'}
                    size={16}
                    color={seleccionado ? '#FFFFFF' : colors.primario}
                  />
                  <Text style={[styles.textoChip, seleccionado && styles.textoChipSeleccionado]}>
                    {horario}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.barra,
          { paddingBottom: insets.bottom + spacing.md, paddingTop: spacing.md },
        ]}
      >
        <Text style={styles.precio}>$ {clase.precio}</Text>
        <Pressable
          style={[styles.boton, cuposDisponibles <= 0 && styles.botonDeshabilitado]}
          onPress={handleReservar}
          disabled={cuposDisponibles <= 0}
        >
          <Text style={styles.botonTexto}>
            {cuposDisponibles <= 0 ? 'Sin cupos' : 'Reservar curso'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colors.fondo,
  },
  portada: {
    width: '100%',
    backgroundColor: colors.primarioSuave,
    borderRadius: radius.lg,
  },
  datos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
  },
  dato: {
    alignItems: 'center',
    gap: 2,
  },
  datoValor: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.texto,
  },
  profesor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.borde,
  },
  profesorNombre: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.texto,
  },
  descripcion: {
    ...typography.cuerpo,
    color: colors.textoSuave,
    lineHeight: 22,
    marginTop: spacing.sm,
  },
  contenedorHorarios: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  chipHorario: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borde,
    backgroundColor: colors.superficie,
  },
  chipSeleccionado: {
    backgroundColor: colors.primario,
    borderColor: colors.primario,
  },
  textoChip: {
    fontSize: 13,
    color: colors.texto,
    fontWeight: '500',
  },
  textoChipSeleccionado: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  barra: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.superficie,
    borderTopWidth: 1,
    borderTopColor: colors.borde,
    paddingHorizontal: spacing.lg,
  },
  precio: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primario,
  },
  boton: {
    backgroundColor: colors.primario,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.lg,
  },
  botonDeshabilitado: {
    backgroundColor: '#B0B0B0',
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});