import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@tienda:cart';

export async function cargarCarrito() {
  try {
    const datosGuardados = await AsyncStorage.getItem(KEY);

    if (datosGuardados === null) {
      return [];
    }

    const items = JSON.parse(datosGuardados);

    if (!Array.isArray(items)) {
      throw new Error('Los datos guardados del carrito no tienen un formato válido.');
    }

    return items.filter((item) => (
      item
      && Number.isInteger(item.id)
      && Number.isInteger(item.cantidad)
      && item.cantidad > 0
    ));
  } catch (error) {
    console.warn('No se pudo cargar el carrito:', error);
    return null;
  }
}

export async function guardarCarrito(items) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(items));
  } catch (error) {
    console.warn('No se pudo guardar el carrito:', error);
    throw error;
  }
}
