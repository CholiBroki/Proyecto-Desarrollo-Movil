import React, {useState} from 'react';
import { View, Text, textInput, FlatList, ScrollView, StyleSheet, TextInput } from 'react-native';
import NivelFiltro from '../components/NivelFiltro';
import Card from 'control-gastos/src/components/Card.js';
import {spacing, colors, typography} from '../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import {CLASES, NIVELES} from '../data/clases'

const ClasesScreen = ({navigation}) => {
    //const { columnas, paddingHorizontal } = useResposive;
    const [nivel, setNivel] = useState('Todos');
    const [busqueda, setBusqueda] = useState('');

  return (
    <View>
      <View>
        <Text>Aplicación de clases de inglés</Text>
        <View>
          <Ionicons name="search" size={18} />
          <TextInput 
            placeholder="Buscar por nivel o profesor"
            value={busqueda}
            onChangeText={setBusqueda}
            autoCorrect = {false}
          />

          {busqueda.length > 0 && (
            <Ionicons name="close-circle" 
            size={18} 
            onPress={() => setBusqueda('')} />
          )}
        </View>
        <ScrollView>
          style={{flexgrow: 0}}
          
          //repasar el metodo .map de js
          {
            NIVELES.map((item)=>(
              <NivelFiltro 
                eiqueta={item}
                activo={nivel === item}
                onPress={ () => setNivel(item)}
              />
            ))
          }
    
        </ScrollView>

      </View>
    </View>

  )
}

export default ClasesScreen