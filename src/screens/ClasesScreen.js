import React, {useState, useMemo } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, TextInput} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';

import useResponsive from '../hooks/useResponsive';
import Card from '../components/Card';
import NivelFiltro from '../components/NivelFiltro';
import EstadoVacio from '../components/EstadoVacio';
import {CLASES, NIVELES} from '../data/clases'
import {spacing, colors, typography, radius} from '../theme';

const ClasesScreen = ({navigation}) => {
    const insets = useSafeAreaInsets();
    const { columnas, paddingHorizontal } = useResponsive();

    const [nivel, setNivel] = useState('Todos');
    const [busqueda, setBusqueda] = useState('');

    const resultados = useMemo(() => {
      const textoBusqueda = busqueda.trim().toLowerCase();
      return CLASES.filter((clase) => {
        const coincideNivel = nivel === 'Todos' || clase.nivel === nivel;
        const coincideTextoBusqueda = textoBusqueda === '' ||
        clase.titulo.toLowerCase().includes(textoBusqueda) ||
        clase.profesor.nombre.toLowerCase().includes(textoBusqueda);
        return coincideNivel && coincideTextoBusqueda;
      });
    }, [nivel, busqueda]);

  
  return (
    <View style={[style.pantalla, {paddingTop: insets.top + spacing.md}]}>
      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <Card
            clase={item}
            onPress={() => navigation.navigate('DetalleClase', {clase: item})}
          />
        )}
        numColumns={columnas}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[style.lista, {paddingHorizontal}]}
        columnWrapperStyle={columnas > 1 ? style.columnas : undefined}
        ListHeaderComponent={
          <View>
            <Text style={style.tituloPantalla}>Aplicación de clases de inglés</Text>
            <View style={style.buscador}>
              <Ionicons name="search" size={24} color={colors.textoSuave} />
              <TextInput
                style={style.input}
                placeholder="Buscar por nivel o profesor"
                placeholderTextColor={colors.textoSuave}
                value={busqueda}
                onChangeText={setBusqueda}
                autoCorrect={false}
              />
              {busqueda.length > 0 && (
                <Ionicons name="close-circle" size={20} color={colors.textoSuave} onPress={() => setBusqueda('')} />
              )}
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={style.filtros}
            >
              {NIVELES.map((item) => (
                <NivelFiltro
                  key={item}
                  etiqueta={item}
                  activo={nivel === item}
                  onPress={() => setNivel(item)}
                />
              ))}
            </ScrollView>
          </View>
        }
        ListEmptyComponent={
          <EstadoVacio
            icono="search-outline"
            titulo="No encontramos valores de búsqueda"
            mensaje="Intenta con otro valor de búsqueda"
            textoAccion="Quitar filtro"
            onAction={() => {
              setNivel('Todos');
              setBusqueda('');
            }}
          />
        }
      />
    </View>
  )
}


const style = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  lista: { paddingTop: spacing.md, paddingBottom: spacing.xl },
  tituloPantalla: { ...typography.titulo, marginBottom: spacing.lg },
  buscador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.superficie,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    height: 72,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  input: { flex: 1, fontSize: 14, color: colors.texto, paddingVertical: 0 },
  filtros: { paddingVertical: spacing.md, paddingBottom: spacing.lg },
  columnas: { justifyContent: 'space-between', gap: spacing.md },
});


export default ClasesScreen