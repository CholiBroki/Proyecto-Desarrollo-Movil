import React from 'react';
import { View, Text, textInput, FlatList, ScrollView, StyleSheet, TextInput } from 'react-native';
import Card from 'control-gastos/src/components/Card.js';
import {spacing, colors, typography} from '../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import {CLASES, NIVELES} from '../data/clases'

const ClasesScreen = ({navigation}) => {
    //const { columnas, paddingHorizontal } = useResposive;
    const [nivel, setNivel] = useState('Todos');

  return (
    <View>
      <View>
        <Text>Aplicación de clases de inglés</Text>
        <View>
          <Ionicons name="search" size={18} />
          <TextInput 
            placeholder="Buscar por nivel o profesor"
            value={nivel}
            onChangeText={setNivel}
            autoCorrect = {false}
          />
        </View>
      </View>
    </View>

  )
}

export default ClasesScreen