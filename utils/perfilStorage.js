import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@tienda:profile';

export const PERFIL_INICIAL = {
  nombre: 'Ana Pérez',
  email: 'ana@example.com',
  fotoUri: null,
};

function validarPerfil(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('Los datos guardados del perfil no tienen un formato válido.');
  }

  return {
    nombre: typeof value.nombre === 'string'
      ? value.nombre
      : PERFIL_INICIAL.nombre,
    email: typeof value.email === 'string'
      ? value.email
      : PERFIL_INICIAL.email,
    fotoUri: typeof value.fotoUri === 'string'
      ? value.fotoUri
      : null,
  };
}

export async function cargarPerfil() {
  try {
    const datosGuardados = await AsyncStorage.getItem(KEY);

    if (datosGuardados === null) {
      return { ...PERFIL_INICIAL };
    }

    return validarPerfil(JSON.parse(datosGuardados));
  } catch (error) {
    console.warn('No se pudo cargar el perfil:', error);
    return null;
  }
}

export async function guardarPerfil(perfil) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(perfil));
  } catch (error) {
    console.warn('No se pudo guardar el perfil:', error);
    throw error;
  }
}
