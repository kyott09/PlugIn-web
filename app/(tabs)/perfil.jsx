import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { useUsuario } from '../../contexts/UsuarioContext';
import {
  eliminarFotoPerfil,
  persistirFotoPerfil,
} from '../../utils/perfilPhoto';

export default function Perfil() {
  const context = useUsuario();

  return (
    <PerfilContenido
      key={`${context.perfil.nombre}\u0000${context.perfil.email}`}
      context={context}
    />
  );
}

function PerfilContenido({ context }) {
  const {
    perfil,
    cargandoPerfil,
    perfilCargado,
    guardandoPerfil,
    errorPerfil,
    actualizarPerfil,
    reintentarCarga,
  } = context;
  const [nombre, setNombre] = useState(perfil.nombre);
  const [email, setEmail] = useState(perfil.email);
  const [errorLocal, setErrorLocal] = useState(null);
  const [ocupadoFoto, setOcupadoFoto] = useState(false);

  const guardarDatos = async () => {
    const nombreLimpio = nombre.trim();
    const emailLimpio = email.trim();

    if (!nombreLimpio || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpio)) {
      setErrorLocal('Ingresá un nombre y un correo electrónico válidos.');
      return;
    }

    setErrorLocal(null);
    await actualizarPerfil({
      nombre: nombreLimpio,
      email: emailLimpio,
    });
  };

  const seleccionarFoto = async (usarCamara) => {
    if (ocupadoFoto || guardandoPerfil || !perfilCargado) {
      return;
    }

    setOcupadoFoto(true);
    setErrorLocal(null);

    try {
      if (usarCamara && Platform.OS !== 'web') {
        let permiso = await ImagePicker.getCameraPermissionsAsync();

        if (!permiso.granted) {
          permiso = await ImagePicker.requestCameraPermissionsAsync();
        }

        if (!permiso.granted) {
          setErrorLocal(
            'No se concedió permiso para usar la cámara. Podés habilitarlo en la configuración del dispositivo.'
          );
          return;
        }
      }

      const opciones = {
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: Platform.OS === 'web',
      };
      const resultado = usarCamara
        ? await ImagePicker.launchCameraAsync(opciones)
        : await ImagePicker.launchImageLibraryAsync(opciones);
      const fotoSeleccionada = resultado.assets?.[0];

      if (resultado.canceled || !fotoSeleccionada) {
        return;
      }

      const fotoUri = await persistirFotoPerfil(fotoSeleccionada);
      const fotoAnterior = perfil.fotoUri;
      const guardado = await actualizarPerfil({ fotoUri });

      if (!guardado) {
        await eliminarFotoPerfil(fotoUri);
        setErrorLocal('No se pudo guardar la nueva foto de perfil.');
        return;
      }

      if (fotoAnterior && fotoAnterior !== fotoUri) {
        await eliminarFotoPerfil(fotoAnterior);
      }
    } catch (error) {
      console.warn('No se pudo actualizar la foto de perfil:', error);
      setErrorLocal('No se pudo seleccionar o guardar la foto.');
    } finally {
      setOcupadoFoto(false);
    }
  };

  const iniciales = perfil.nombre
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0].toUpperCase())
    .join('') || 'U';
  const controlesDeshabilitados = (
    cargandoPerfil
    || !perfilCargado
    || guardandoPerfil
    || ocupadoFoto
  );

  if (cargandoPerfil) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.statusContainer}>
          <ActivityIndicator color="#0B5FFF" />
          <Text style={styles.statusText}>Cargando perfil...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!perfilCargado) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.statusContainer}>
          <Text style={styles.error}>
            {errorPerfil || 'No se pudo cargar el perfil.'}
          </Text>
          <Pressable
            onPress={() => {
              void reintentarCarga();
            }}
            accessibilityRole="button"
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Reintentar</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
        >
          <Text style={styles.title}>Mi Perfil</Text>

          <View style={styles.profileCard}>
            {perfil.fotoUri ? (
              <Image
                source={{ uri: perfil.fotoUri }}
                style={styles.avatar}
                accessibilityLabel="Foto de perfil"
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitials}>{iniciales}</Text>
              </View>
            )}

            <Text style={styles.profileName}>{perfil.nombre}</Text>
            <Text style={styles.profileEmail}>{perfil.email}</Text>

            <View style={styles.photoActions}>
              <Pressable
                onPress={() => {
                  void seleccionarFoto(false);
                }}
                disabled={controlesDeshabilitados}
                accessibilityRole="button"
                style={[
                  styles.secondaryButton,
                  controlesDeshabilitados && styles.disabledButton,
                ]}
              >
                <Text style={styles.secondaryButtonText}>Elegir foto</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  void seleccionarFoto(true);
                }}
                disabled={controlesDeshabilitados}
                accessibilityRole="button"
                style={[
                  styles.secondaryButton,
                  controlesDeshabilitados && styles.disabledButton,
                ]}
              >
                <Text style={styles.secondaryButtonText}>Tomar foto</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              value={nombre}
              onChangeText={setNombre}
              editable={!controlesDeshabilitados}
              autoCapitalize="words"
              accessibilityLabel="Nombre"
              style={styles.input}
            />

            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              editable={!controlesDeshabilitados}
              autoCapitalize="none"
              keyboardType="email-address"
              accessibilityLabel="Correo electrónico"
              style={styles.input}
            />

            {(errorLocal || errorPerfil) && (
              <Text accessibilityRole="alert" style={styles.errorNotice}>
                {errorLocal || errorPerfil}
              </Text>
            )}

            <Pressable
              onPress={() => {
                void guardarDatos();
              }}
              disabled={controlesDeshabilitados}
              accessibilityRole="button"
              style={[
                styles.primaryButton,
                controlesDeshabilitados && styles.disabledButton,
              ]}
            >
              {guardandoPerfil || ocupadoFoto ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.primaryButtonText}>Guardar cambios</Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7FBFF',
  },

  keyboardAvoiding: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 32,
  },

  title: {
    color: '#102A43',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 18,
  },

  profileCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },

  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#EAF3FF',
  },

  avatarPlaceholder: {
    width: 112,
    height: 112,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAF3FF',
    borderRadius: 56,
  },

  avatarInitials: {
    color: '#0B5FFF',
    fontSize: 34,
    fontWeight: '800',
  },

  profileName: {
    color: '#102A43',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 12,
  },

  profileEmail: {
    color: '#52667A',
    fontSize: 15,
    marginTop: 4,
  },

  photoActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 18,
  },

  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#EAF3FF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 11,
  },

  secondaryButtonText: {
    color: '#0B5FFF',
    fontSize: 14,
    fontWeight: '700',
  },

  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginTop: 16,
    padding: 18,
  },

  label: {
    color: '#102A43',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 7,
  },

  input: {
    borderColor: '#D5E2F0',
    borderRadius: 10,
    borderWidth: 1,
    color: '#102A43',
    fontSize: 16,
    marginBottom: 16,
    minHeight: 48,
    paddingHorizontal: 12,
  },

  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#0B5FFF',
    borderRadius: 12,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  disabledButton: {
    opacity: 0.55,
  },

  errorNotice: {
    color: '#B42318',
    fontSize: 14,
    marginBottom: 12,
  },

  error: {
    color: '#B42318',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },

  statusContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  statusText: {
    color: '#52667A',
    fontSize: 15,
    marginTop: 12,
  },
});
