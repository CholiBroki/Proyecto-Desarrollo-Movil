import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import EtiquetaNivel from './EtiquetaNivel';
import {spacing, colors, radius} from '../theme';

export default function Card({ clase, onPress }) {
    return (
        <Pressable onPress={onPress} style={({pressed}) => [styles.tarjeta, pressed && styles.presionada]}>
            <Image source={{ uri: clase.imagen }} style={styles.imagen} />
            <View style={styles.contenido}>
                <EtiquetaNivel nivel={clase.nivel} />
                <Text style={styles.titulo}>{clase.titulo}</Text>
                <Text style={styles.descripcion}>{clase.descripcion}</Text>
                <Text style={styles.profesor}>{clase.profesor.nombre}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    tarjeta: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: colors.superficie,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.borde,
        marginBottom: spacing.lg,
    },
    presionada: { opacity: 0.85 },
    imagen: {
        width: '100%',
        height: 260,
        backgroundColor: colors.primarioSuave,
    },
    contenido: { padding: spacing.lg },
    titulo: {
        fontSize: 22,
        color: colors.texto,
        fontWeight: '700',
        marginTop: spacing.md,
    },
    descripcion: {
        fontSize: 17,
        lineHeight: 24,
        color: colors.textoSuave,
        marginTop: spacing.sm,
    },
    profesor: {
        color: colors.primario,
        fontSize: 16,
        fontWeight: '700',
        marginTop: spacing.md,
    }
})