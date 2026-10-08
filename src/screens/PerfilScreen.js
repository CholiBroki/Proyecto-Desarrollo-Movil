import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { UsuarioContext } from '../contexts/UsuarioContext';
import { colors, spacing, radius, typography } from '../theme';

export default function PerfilScreen() {
  const insets = useSafeAreaInsets();
  const { usuario, cargandoUsuario, registrarUsuario, actualizarPerfil, eliminarRegistro } = useContext(UsuarioContext);

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre);
      setCorreo(usuario.correo);
      setTelefono(usuario.telefono);
    }
  }, [usuario]);

  const validarCampos = (esEdicion = false) => {
    if (!esEdicion && !nombre.trim()) {
      Alert.alert('Campo Requerido', 'Por favor ingresa tu nombre completo.');
      return false;
    }
    if (!correo.trim() || !correo.includes('@') || !correo.includes('.')) {
      Alert.alert('Correo Inválido', 'Por favor ingresa un correo electrónico válido.');
      return false;
    }
    if (!telefono.trim() || telefono.trim().length < 7) {
      Alert.alert('Teléfono Inválido', 'Por favor ingresa un número de teléfono válido.');
      return false;
    }
    return true;
  };

  const handleRegistro = () => {
    if (!validarCampos(false)) return;
    registrarUsuario(nombre, correo, telefono);
    Alert.alert('¡Bienvenido!', 'Tu registro ha sido completado exitosamente.');
  };

  const handleGuardarEdicion = () => {
    if (!validarCampos(true)) return;
    actualizarPerfil(correo, telefono);
    setEditando(false);
    Alert.alert('Perfil Actualizado', 'Tus datos han sido modificados correctamente.');
  };

  if (cargandoUsuario) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primario} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={[styles.container, { paddingTop: spacing.md }]}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {!usuario ? (
          /* VISTA 1: REGISTRO */
          <View style={styles.tarjeta}>
            <View style={styles.encabezado}>
              <Ionicons name="person-add-outline" size={48} color={colors.primario} />
              <Text style={styles.tituloForm}>Registro de Usuario</Text>
              <Text style={styles.subtituloForm}>
                Regístrate para gestionar tus reservas de clases.
              </Text>
            </View>

            <View style={styles.grupoCampo}>
              <Text style={styles.label}>Nombre completo *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. Abelardo Petro"
                placeholderTextColor={colors.textoSuave}
                value={nombre}
                onChangeText={setNombre}
                autoCorrect={false}
              />
            </View>

            <View style={styles.grupoCampo}>
              <Text style={styles.label}>Correo electrónico *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. abelardo@correo.com"
                placeholderTextColor={colors.textoSuave}
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.grupoCampo}>
              <Text style={styles.label}>Teléfono de contacto *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. 3001234567"
                placeholderTextColor={colors.textoSuave}
                value={telefono}
                onChangeText={setTelefono}
                keyboardType="phone-pad"
              />
            </View>

            <TouchableOpacity style={styles.botonPrincipal} onPress={handleRegistro}>
              <Text style={styles.textoBotonPrincipal}>Completar Registro</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* VISTA 2: USUARIO REGISTRADO */
          <View style={styles.tarjeta}>
            <View style={styles.encabezado}>
              <Ionicons name="person-circle-outline" size={64} color={colors.primario} />
              <Text style={styles.tituloPerfil}>{usuario.nombre}</Text>
              <Text style={styles.subtituloForm}>Usuario Registrado</Text>
            </View>

            <View style={styles.grupoCampo}>
              <Text style={styles.label}>Nombre completo (No editable)</Text>
              <View style={[styles.input, styles.inputDeshabilitado]}>
                <Text style={{ color: colors.textoSuave }}>{usuario.nombre}</Text>
              </View>
            </View>

            <View style={styles.grupoCampo}>
              <Text style={styles.label}>Correo electrónico</Text>
              <TextInput
                style={[styles.input, !editando && styles.inputDeshabilitado]}
                value={correo}
                onChangeText={setCorreo}
                editable={editando}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.grupoCampo}>
              <Text style={styles.label}>Teléfono de contacto</Text>
              <TextInput
                style={[styles.input, !editando && styles.inputDeshabilitado]}
                value={telefono}
                onChangeText={setTelefono}
                editable={editando}
                keyboardType="phone-pad"
              />
            </View>

            {editando ? (
              <View style={styles.filaBotones}>
                <TouchableOpacity
                  style={[styles.botonBorde, { flex: 1 }]}
                  onPress={() => {
                    setEditando(false);
                    setCorreo(usuario.correo);
                    setTelefono(usuario.telefono);
                  }}
                >
                  <Text style={styles.textoBotonBorde}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.botonPrincipal, { flex: 1 }]}
                  onPress={handleGuardarEdicion}
                >
                  <Text style={styles.textoBotonPrincipal}>Guardar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.botonSecundario}
                onPress={() => setEditando(true)}
              >
                <Ionicons name="create-outline" size={20} color="#FFFFFF" />
                <Text style={styles.textoBotonPrincipal}>Editar Correo / Teléfono</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.botonBorrar}
              onPress={() => {
                Alert.alert(
                  'Cerrar Sesión',
                  '¿Deseas eliminar el registro local?',
                  [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Sí, eliminar', style: 'destructive', onPress: eliminarRegistro },
                  ]
                );
              }}
            >
              <Text style={styles.textoBotonBorrar}>Cerrar Sesión / Resetear Usuario</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
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
  tarjeta: {
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  encabezado: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    gap: 4,
  },
  tituloForm: {
    ...typography.titulo,
    fontSize: 20,
    textAlign: 'center',
  },
  tituloPerfil: {
    ...typography.titulo,
    fontSize: 22,
    textAlign: 'center',
  },
  subtituloForm: {
    fontSize: 14,
    color: colors.textoSuave,
    textAlign: 'center',
  },
  grupoCampo: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.texto,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.borde,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 48,
    justifyContent: 'center',
    fontSize: 15,
    color: colors.texto,
    backgroundColor: colors.superficie,
  },
  inputDeshabilitado: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
  },
  botonPrincipal: {
    backgroundColor: colors.primario,
    height: 48,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  textoBotonPrincipal: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  botonSecundario: {
    backgroundColor: colors.primario,
    height: 48,
    borderRadius: radius.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: spacing.sm,
  },
  filaBotones: {
    flexDirection: 'row',
    gap: 10,
    marginTop: spacing.sm,
  },
  botonBorde: {
    borderWidth: 1,
    borderColor: colors.borde,
    height: 48,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotonBorde: {
    color: colors.texto,
    fontWeight: '600',
  },
  botonBorrar: {
    marginTop: spacing.xl,
    alignItems: 'center',
    padding: spacing.xs,
  },
  textoBotonBorrar: {
    color: '#D9534F',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
});