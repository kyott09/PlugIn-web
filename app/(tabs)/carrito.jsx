import { useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import CartItem from '../../components/CartItem';
import { useCarrito } from '../../contexts/CarritoContext';
import { productos } from '../../data/products';

const productosPorId = new Map(
  productos.map((producto) => [producto.id, producto])
);

function formatoPrecio(precio) {
  return `$ ${precio.toLocaleString('es-AR')}`;
}

export default function Carrito() {
  const {
    items,
    cantidadTotal,
    total,
    cargandoCarrito,
    carritoCargado,
    guardandoCarrito,
    errorCarrito,
    cambiarCantidad,
    quitarProducto,
    reintentarCarga,
  } = useCarrito();
  const router = useRouter();

  const productosCarrito = useMemo(() => (
    items
      .map((item) => ({
        product: productosPorId.get(item.id),
        cantidad: item.cantidad,
      }))
      .filter((item) => item.product)
  ), [items]);

  if (cargandoCarrito) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.statusContainer}>
          <ActivityIndicator color="#0B5FFF" />
          <Text style={styles.statusText}>Cargando carrito...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!carritoCargado) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.statusContainer}>
          <Text style={styles.error}>
            {errorCarrito || 'No se pudo cargar el carrito.'}
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

  if (productosCarrito.length === 0) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.emptyContainer}>
          <Text style={styles.title}>Carrito</Text>
          <Text style={styles.emptyText}>Todavía no agregaste productos.</Text>
          <Pressable
            onPress={() => router.navigate('/')}
            accessibilityRole="button"
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Volver al catálogo</Text>
          </Pressable>
          {errorCarrito && (
            <Text accessibilityRole="alert" style={styles.errorNotice}>
              {errorCarrito}
            </Text>
          )}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={productosCarrito}
        keyExtractor={({ product }) => String(product.id)}
        renderItem={({ item }) => (
          <CartItem
            product={item.product}
            cantidad={item.cantidad}
            disabled={guardandoCarrito}
            onDecrease={() => {
              void cambiarCantidad(item.product.id, -1);
            }}
            onIncrease={() => {
              void cambiarCantidad(item.product.id, 1);
            }}
            onRemove={() => {
              void quitarProducto(item.product.id);
            }}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={(
          <View style={styles.header}>
            <View style={styles.headerRow}>
              <Text style={styles.title}>Carrito</Text>
              <Text style={styles.count}>
                {cantidadTotal} {cantidadTotal === 1 ? 'unidad' : 'unidades'}
              </Text>
            </View>
            {guardandoCarrito && (
              <View style={styles.saving}>
                <ActivityIndicator color="#0B5FFF" size="small" />
                <Text style={styles.statusText}>Guardando...</Text>
              </View>
            )}
            {errorCarrito && (
              <Text accessibilityRole="alert" style={styles.errorNotice}>
                {errorCarrito}
              </Text>
            )}
          </View>
        )}
        ListFooterComponent={(
          <View style={styles.summary}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.total}>{formatoPrecio(total)}</Text>
            </View>
            <Pressable
              onPress={() => router.navigate('/')}
              accessibilityRole="button"
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>Seguir comprando</Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7FBFF',
  },

  listContent: {
    padding: 20,
    paddingBottom: 32,
  },

  header: {
    marginBottom: 16,
  },

  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    color: '#102A43',
    fontSize: 28,
    fontWeight: '800',
  },

  count: {
    color: '#52667A',
    fontSize: 14,
    fontWeight: '600',
  },

  separator: {
    height: 12,
  },

  saving: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },

  statusContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },

  statusText: {
    color: '#52667A',
    fontSize: 14,
    marginTop: 8,
  },

  error: {
    color: '#B42318',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },

  errorNotice: {
    color: '#B42318',
    fontSize: 14,
    marginTop: 10,
  },

  emptyContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },

  emptyText: {
    color: '#52667A',
    fontSize: 16,
    marginBottom: 18,
  },

  summary: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginTop: 18,
    padding: 16,
  },

  totalRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  totalLabel: {
    color: '#102A43',
    fontSize: 18,
    fontWeight: '700',
  },

  total: {
    color: '#102A43',
    fontSize: 20,
    fontWeight: '800',
  },

  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#0B5FFF',
    borderRadius: 12,
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
