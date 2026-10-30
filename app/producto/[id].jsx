import { useState } from 'react';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  useLocalSearchParams,
  useRouter,
} from 'expo-router';

import { productos } from '../../data/products';
import { useCarrito } from '../../contexts/CarritoContext';

export default function ProductDetail() {
  const { id } = useLocalSearchParams();

  const router = useRouter();
  const [mensajeCarrito, setMensajeCarrito] = useState('');
  const {
    agregarProducto,
    cargandoCarrito,
    carritoCargado,
    errorCarrito,
    guardandoCarrito,
  } = useCarrito();

  const producto = productos.find(
    (item) => String(item.id) === String(id)
  );

  const agregarAlCarrito = async () => {
    const agregado = await agregarProducto(producto);
    setMensajeCarrito(
      agregado
        ? 'Producto agregado al carrito.'
        : 'No se pudo agregar el producto. Intentá nuevamente.'
    );
  };

  if (!producto) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.error}>
          Producto no encontrado
        </Text>

        <TouchableOpacity
          style={styles.boton}
          onPress={() => router.back()}
        >
          <Text style={styles.botonTexto}>
            Volver
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contenedor}
    >
      <Image
        source={producto.imagen}
        style={styles.imagen}
        resizeMode="contain"
      />

      <Text style={styles.categoria}>
        {producto.categoria}
      </Text>

      <Text style={styles.nombre}>
        {producto.nombre}
      </Text>

      <Text style={styles.precio}>
        $ {producto.precio.toLocaleString('es-AR')}
      </Text>

      <View style={styles.separador} />

      <Text style={styles.tituloSeccion}>
        Descripción
      </Text>

      <Text style={styles.descripcion}>
        {producto.descripcion}
      </Text>

      <Text style={styles.tituloSeccion}>
        Características
      </Text>

      <View style={styles.caracteristicas}>
        {producto.caracteristicas.map(
          (caracteristica, index) => (
            <View
              key={index}
              style={styles.caracteristica}
            >
              <Text style={styles.punto}>
                •
              </Text>

              <Text style={styles.textoCaracteristica}>
                {caracteristica}
              </Text>
            </View>
          )
        )}
      </View>

      <View style={styles.stockBox}>
        <Text style={styles.stockTitulo}>
          Stock disponible
        </Text>

        <Text style={styles.stock}>
          {producto.stock == null
            ? 'Consultar disponibilidad'
            : `${producto.stock} unidades`}
        </Text>
      </View>

      <TouchableOpacity
        testID="add-to-cart"
        style={[
          styles.boton,
          styles.botonCarrito,
          (cargandoCarrito || guardandoCarrito || !carritoCargado)
            && styles.botonDeshabilitado,
        ]}
        onPress={agregarAlCarrito}
        disabled={cargandoCarrito || guardandoCarrito || !carritoCargado}
        accessibilityRole="button"
        accessibilityLabel={`Agregar ${producto.nombre} al carrito`}
      >
        <Text style={styles.botonTexto}>
          Agregar al carrito
        </Text>
      </TouchableOpacity>

      {errorCarrito || mensajeCarrito ? (
        <Text
          accessibilityLiveRegion="polite"
          style={[
            styles.mensajeCarrito,
            (errorCarrito || mensajeCarrito.startsWith('No se pudo'))
              && styles.mensajeCarritoError,
          ]}
        >
          {errorCarrito || mensajeCarrito}
        </Text>
      ) : null}

      <TouchableOpacity
        style={[styles.boton, styles.botonVolver]}
        onPress={() => router.back()}
      >
        <Text style={styles.botonTexto}>
          Volver al catálogo
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7FBFF',
  },

  contenedor: {
    padding: 20,
    paddingBottom: 40,
  },

  imagen: {
    width: '100%',
    height: 280,
    marginBottom: 20,
  },

  categoria: {
    color: '#0B5FFF',
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
  },

  nombre: {
    color: '#102A43',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 6,
  },

  precio: {
    color: '#102A43',
    fontSize: 25,
    fontWeight: '700',
    marginTop: 12,
  },

  separador: {
    height: 1,
    backgroundColor: '#D9E2EC',
    marginVertical: 24,
  },

  tituloSeccion: {
    color: '#102A43',
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 10,
  },

  descripcion: {
    color: '#52667A',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },

  caracteristicas: {
    marginBottom: 24,
  },

  caracteristica: {
    flexDirection: 'row',
    marginBottom: 9,
  },

  punto: {
    color: '#0B5FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
  },

  textoCaracteristica: {
    color: '#52667A',
    fontSize: 16,
    flex: 1,
  },

  stockBox: {
    backgroundColor: '#E8F1FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },

  stockTitulo: {
    color: '#52667A',
    fontSize: 14,
    marginBottom: 4,
  },

  stock: {
    color: '#102A43',
    fontSize: 18,
    fontWeight: '800',
  },

  boton: {
    backgroundColor: '#0B5FFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  botonCarrito: {
    marginBottom: 10,
  },

  botonVolver: {
    marginTop: 8,
  },

  botonDeshabilitado: {
    opacity: 0.5,
  },

  botonTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  mensajeCarrito: {
    color: '#247A42',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },

  mensajeCarritoError: {
    color: '#B42318',
  },

  errorContainer: {
    flex: 1,
    backgroundColor: '#F7FBFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  error: {
    color: '#102A43',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
});