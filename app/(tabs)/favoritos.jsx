import { useState } from 'react';

import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import DraggableFlatList from 'react-native-draggable-flatlist';

import FavoriteGestureRow from '../../components/FavoriteGestureRow';
import { useFavoritos } from '../../contexts/FavoritosContext';
import { productos } from '../../data/products';

const productosPorId = new Map(
  productos.map((producto) => [producto.id, producto])
);

export default function Favoritos() {
  const {
    favoritos,
    cargandoFavoritos,
    guardandoFavoritos,
    errorFavoritos,
    actualizarFavoritos,
    quitarFavorito,
    reintentarCarga,
  } = useFavoritos();

  const [arrastrando, setArrastrando] = useState(false);
  const productosFavoritos = favoritos
    .map((id) => productosPorId.get(id))
    .filter((producto) => producto !== undefined);

  const renderItem = ({ item, drag, isActive }) => (
    <FavoriteGestureRow
      product={item}
      drag={drag}
      isActive={isActive}
      disabled={guardandoFavoritos || arrastrando}
      onDelete={quitarFavorito}
    />
  );

  if (cargandoFavoritos || (errorFavoritos && favoritos.length === 0)) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.loadingContainer}>
          {cargandoFavoritos ? (
            <ActivityIndicator
              color="#0B5FFF"
              accessibilityLabel="Cargando favoritos"
            />
          ) : (
            <>
              <Text style={styles.error}>
                {errorFavoritos}
              </Text>

              <Pressable
                onPress={() => {
                  void reintentarCarga();
                }}
                accessibilityRole="button"
                style={styles.retryButton}
              >
                <Text style={styles.retryText}>
                  Reintentar
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </SafeAreaView>
    );
  }

  if (productosFavoritos.length === 0) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.emptyContainer}>
          <Text style={styles.title}>
            Favoritos
          </Text>

          <Text style={styles.text}>
            Todavía no tenés productos favoritos.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <DraggableFlatList
        data={productosFavoritos}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        onDragBegin={() => setArrastrando(true)}
        onDragEnd={({ data }) => {
          setArrastrando(false);
          void actualizarFavoritos(data.map((producto) => producto.id));
        }}
        scrollEnabled={!guardandoFavoritos}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
        ListHeaderComponent={(
          <View style={styles.listHeader}>
            <Text style={styles.title}>
              Favoritos
            </Text>

            <Text style={styles.count}>
              {favoritos.length} {favoritos.length === 1 ? 'producto' : 'productos'}
            </Text>

            {guardandoFavoritos && (
              <View style={styles.saving}>
                <ActivityIndicator
                  color="#0B5FFF"
                  size="small"
                />
                <Text style={styles.savingText}>
                  Guardando...
                </Text>
              </View>
            )}

            {errorFavoritos && (
              <Text style={styles.errorNotice}>
                {errorFavoritos}
              </Text>
            )}
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

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  listContent: {
    padding: 20,
    paddingBottom: 32,
  },

  listHeader: {
    marginBottom: 16,
    position: 'relative',
  },

  separator: {
    height: 14,
  },

  count: {
    color: '#52667A',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },

  title: {
    color: '#102A43',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 10,
  },

  text: {
    color: '#52667A',
    fontSize: 16,
  },

  saving: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    position: 'absolute',
    top: 0,
    right: 0,
  },

  savingText: {
    color: '#52667A',
    fontSize: 14,
  },

  error: {
    color: '#B42318',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },

  errorNotice: {
    color: '#B42318',
    fontSize: 14,
    marginTop: 10,
  },

  retryButton: {
    backgroundColor: '#0B5FFF',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },

  retryText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});