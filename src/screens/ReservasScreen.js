import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ReservaContext } from '../contexts/ReservaContext';
import EstadoVacio from '../components/EstadoVacio';
import { colors, spacing, radius, typography } from '../theme';

export default function ReservasScreen() {
  const insets = useSafeAreaInsets();
  const { reservas, cargando, cancelarReserva } = useContext(ReservaContext);

  const confirmarCancelacion = (idReserva, titulo) => {
    Alert.alert(
      'Cancelar Reserva',
      `¿Estás seguro de que deseas cancelar tu reserva para "${titulo}"?`,
      [
        { text: 'No, mantener', style: 'cancel' },
        {
          text: 'Sí, cancelar',
          style: 'destructive',
          onPress: () => cancelarReserva(idReserva),
        },
      ]
    );
  };

  if (cargando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primario} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.sm }]}>
      <Text style={styles.tituloPantalla}>Mis Reservas</Text>

      {reservas.length === 0 ? (
        <EstadoVacio
          icono="calendar-outline"
          titulo="No tienes reservas activas"
          mensaje="Explora nuestras clases disponibles e inscríbete en la sección de Inicio."
        />
      ) : (
        <FlatList
          data={reservas}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.tarjetaReserva}>
              <View style={styles.infoReserva}>
                <Text style={styles.tituloClase}>{item.titulo}</Text>
                <View style={styles.filtroDetalle}>
                  <Ionicons name="person-outline" size={16} color={colors.textoSuave} />
                  <Text style={styles.textoDetalle}>{item.profesor}</Text>
                </View>
                <View style={styles.filtroDetalle}>
                  <Ionicons name="time-outline" size={16} color={colors.primario} />
                  <Text style={styles.textoHorario}>{item.horario}</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.botonCancelar}
                onPress={() => confirmarCancelacion(item.id, item.titulo)}
              >
                <Ionicons name="trash-outline" size={20} color="#D9534F" />
                <Text style={styles.textoBotonCancelar}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fondo,
    paddingHorizontal: spacing.md,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tituloPantalla: {
    ...typography.titulo,
    marginBottom: spacing.md,
  },
  lista: {
    paddingBottom: 100,
  },
  tarjetaReserva: {
    backgroundColor: colors.superficie,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borde,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoReserva: {
    flex: 1,
    gap: spacing.xs,
  },
  tituloClase: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.texto,
  },
  filtroDetalle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  textoDetalle: {
    fontSize: 14,
    color: colors.textoSuave,
  },
  textoHorario: {
    fontSize: 14,
    color: colors.primario,
    fontWeight: '600',
  },
  botonCancelar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: '#FDE8E8',
  },
  textoBotonCancelar: {
    color: '#D9534F',
    fontSize: 13,
    fontWeight: '600',
  },
});