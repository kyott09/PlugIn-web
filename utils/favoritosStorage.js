import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'favoritos';

export async function cargarFavoritos() {
  try {
    const datosGuardados = await AsyncStorage.getItem(KEY);

    if (datosGuardados === null) {
      return [];
    }

    const favoritos = JSON.parse(datosGuardados);

    if (!Array.isArray(favoritos)) {
      throw new Error('Los datos guardados no tienen un formato válido.');
    }

    return [...new Set(favoritos.filter((id) => Number.isInteger(id)))];
  } catch (error) {
    console.error('No se pudieron cargar los favoritos:', error);
    return null;
  }
}

export async function guardarFavoritos(favoritos) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(favoritos));
  } catch (error) {
    console.error('No se pudieron guardar los favoritos:', error);
    throw error;
  }
}
