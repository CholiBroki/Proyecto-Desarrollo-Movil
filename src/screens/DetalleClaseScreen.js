import React, {useState, useMemo, useLayoutEffect} from "react"; 
import { View, Text, FlatList, ScrollView, Alert, Image, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import useResponsive from "../hooks/useResponsive";
import { colors, spacing, typography, sombra, radius } from "../theme";
import { formatearPrecio } from "../data/clases";

export default function DetalleClaseScreen({ route, navigation }) {
    const insets = useSafeAreaInsets();
    const {clase} = route.params;
    const {isTable} = useResponsive();
    const [cupos, setCupos] = useState(clase.cupos);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: clase.titulo,
        });
    }, [navigation, clase.titulo]);

    return(
        <View style={styles.pantalla}>
            <ScrollView
                contentContainerStyle={{ padding: spacing.lg, paddingBottom: insets.bottom + spacing.xl, gap: spacing.lg }}
                showsVerticalScrollIndicator={false}
            >
                <Image
                    source={{uri: clase.imagen}}
                    style={[styles.portada, {height: isTable ? 300 : 200}]}
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
                    <View>
                        <View style={styles.dato}>
                            <Text style={styles.datoValor}>{cupos}</Text>
                            <Text>Cupos</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.profesor}>
                    <Image source={{uri: clase.profesor.foto}} style={styles.avatar} />
                    <Text style={styles.profesorNombre}>{clase.profesor.nombre}</Text>
                </View>

                <Text style={styles.descripcion}>{clase.descripcion}</Text>

                <View>
                    <Text style={{ fontWeight: '700', color: colors.texto, marginBottom: 4 }}>Horarios disponibles</Text>
                    {clase.horarios.map((horario, index) => (
                        <Text key={index} style={{ color: colors.textoSuave }}>{horario}</Text>
                    ))}
                </View>

            </ScrollView>

            <View style={styles.barra}>
                <Text style={styles.precio}>{formatearPrecio(clase.precio)}</Text>
                <Pressable
                disabled={cupos === 0}
                style={({ pressed }) => [
                    styles.boton,
                    cupos === 0 && styles.botonDeshabilitado,
                    pressed && { opacity: 0.7 }
                ]}
                onPress={() => Alert.alert('Inscripción', '¿Deseas inscribirte a esta clase?', [
                    {
                        text: 'Cancelar',
                        style: 'cancel'
                        },
                        {
                            text: 'Inscribirme',
                            onPress: () => {
                                setCupos((prev) => {
                                    const siguiente = Math.max(0, prev - 1);
                                    if (siguiente === 0) {
                                        Alert.alert('Sin cupos', 'Ya no quedan cupos disponibles para esta clase.');
                                    } else {
                                        Alert.alert('¡Inscripción exitosa!', 'Te has inscrito a la clase.');
                                    }
                                    return siguiente;
                                });
                            }
                        }
                    ])}
                >
                    <Text style={styles.botonTexto}>{cupos === 0 ? 'Sin cupos' : 'Inscribirme'}</Text>
                </Pressable>
            </View>

        </View>
    
    )
}


const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  portada: { width: '100%', backgroundColor: colors.primarioSuave },
  datos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
  },
  dato: { alignItems: 'center', gap: 2 },
  datoValor: { fontSize: 16, fontWeight: '800', color: colors.texto },
  profesor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.borde },
  profesorNombre: { fontSize: 15, fontWeight: '700', color: colors.texto },
  descripcion: { ...typography.cuerpo, color: colors.textoSuave, lineHeight: 22, marginTop: spacing.sm },
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
    paddingVertical: spacing.lg,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg
  },
  precio: { fontSize: 18, fontWeight: '800', color: colors.primario },

    boton: {
    backgroundColor: colors.primario,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.lg,
},
    botonDeshabilitado: {
    backgroundColor: colors.borde,
},
    botonTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
},
});