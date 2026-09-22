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

export default function ProductDetail() {
  const { id } = useLocalSearchParams();

  const router = useRouter();

  const producto = productos.find(
    (item) => String(item.id) === String(id)
  );

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
          {producto.stock} unidades
        </Text>
      </View>

      <TouchableOpacity
        style={styles.boton}
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

  botonTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
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