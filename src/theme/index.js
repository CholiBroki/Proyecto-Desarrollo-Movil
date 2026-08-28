import { Platform } from 'react-native';

export const colors = {
    fondo: '#F2F2F2',
    primario: '#5856D6',
    texto: '#111827',
    border: '#E5E7EB',
}

export const spacing = {
    xs: 4, 
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20
}

export const typography = {
    titulo: {fontSize: 26, fontWeight: '800', color: colors.texto},
    subtitulo: {fontSize: 18, fontWeight: '600', color: colors.texto},
}

export default {colors, spacing, typography}