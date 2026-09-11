import React, {useState, useMemo } from 'react';
import { View, Text, textInput, FlatList, ScrollView, StyleSheet, TextInput, FlatList} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';

import { useResponsive } from '../hooks/useResponsive';
import Card from '../components/Card';
import NivelFiltro from '../components/NivelFiltro';
import EstadoVacio from '../components/EstadoVacio';
import {CLASES, NIVELES} from '../data/clases'
import {spacing, colors, typography} from '../theme';

import { useState, useMemo } from 'react';

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
      <View style={{paddingHorizontal: spacing.md}}>
        <Text>Aplicación de clases de inglés</Text>
        <View style={style.buscador}>
          <Ionicons name="search" size={18} />
          <TextInput
            placeholder="Buscar por nivel o profesor"
            value={nivel}
            onChangeText={setNivel}
            autoCorrect = {false}
          />
          {busqueda.length > 0 && (
            <Ionicons name="close-circle" size={18} onPress={() => setBusqueda('')} />
          )}
        </View>
        <ScrollView
          style={{flexGrow: 0}}>
            {
              NIVELES.map((item) => (
                <NivelFiltro


                  etiqueta={item}
                  activo={nivel === item}
                  onPress={() => setNivel(item)}
                />
              ))
            }
        </ScrollView>
        <FlatList
          data={resultados}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <Card
              clase={item}
              onPress={()=> navigation.navigate('DetalleClase', {clase: item})}
              titulo={item.titulo}
              nivel={item.nivel}
              profesor={item.profesor.nombre}
            />
          
          )}
          numColumns={columnas}
          showVerticalScrollIndicator={false}     
          contentContainerStyle={{paddingHorizontal, 
            flexGrow: 1, 
            paddingBottom: spacing.xl,
          }}
          ListEmptyComponent={
            <EstadoVacio>
              icono= "search-outline"
              titulo= "No encontramos valores de busqueda"
              mensaje= "Intenta con otro valor de busqueda"
              textoAccion= "Quitar filtro"
              onAction= {() => {
                setNivel('Todos');
                setBusqueda('');
              }}
            </EstadoVacio>
          }
        />
      </View>
    </View>


  )
}


const style = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  buscador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.superficie,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    height: 46,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  input: { flex: 1, fontSize: 14, color: colors.texto, paddingVertical: 0 },
});


export default ClasesScreen