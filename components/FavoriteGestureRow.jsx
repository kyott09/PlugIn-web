import { useRef } from 'react';

import {
  Alert,
  Pressable,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

import ProductCard from './ProductCard';

export default function FavoriteGestureRow({
  product,
  drag,
  isActive,
  disabled,
  onDelete,
}) {
  const swipeableRef = useRef(null);

  const confirmarEliminacion = () => {
    const mensaje = `¿Querés quitar ${product.nombre} de tus favoritos?`;

    if (Platform.OS === 'web') {
      if (globalThis.confirm(mensaje)) {
        onDelete(product.id);
      }
      return;
    }

    Alert.alert(
      'Eliminar de Favoritos',
      mensaje,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => onDelete(product.id),
        },
      ]
    );
  };

  const iniciarArrastre = () => {
    swipeableRef.current?.close();
    requestAnimationFrame(drag);
  };

  return (
    <View style={[styles.row, isActive && styles.activeRow]}>
      <View style={styles.product}>
        <ReanimatedSwipeable
          ref={swipeableRef}
          enabled={!disabled}
          testID={`favorite-swipe-${product.id}`}
          containerStyle={styles.swipeContainer}
          rightThreshold={48}
          overshootRight={false}
          renderRightActions={() => (
            <Pressable
              onPress={confirmarEliminacion}
              disabled={disabled}
              accessibilityRole="button"
              accessibilityLabel={`Eliminar ${product.nombre}`}
              style={styles.deleteAction}
            >
              <Text style={styles.deleteText}>
                Eliminar
              </Text>
            </Pressable>
          )}
        >
          <ProductCard
            product={product}
            isFavorite
            showFavoriteToggle={false}
            interactionsDisabled={disabled}
          />
        </ReanimatedSwipeable>
      </View>

      <Pressable
        onLongPress={iniciarArrastre}
        delayLongPress={250}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={`Mover ${product.nombre}`}
        accessibilityHint="Mantené presionado para reordenar este producto."
        style={({ pressed }) => [
          styles.moveButton,
          (pressed || isActive) && styles.moveButtonActive,
          disabled && styles.disabled,
        ]}
      >
        <Text style={styles.moveText}>
          Mover
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'transparent',
  },

  activeRow: {
    borderColor: '#0B5FFF',
    backgroundColor: '#E8F1FA',
  },

  product: {
    flex: 1,
  },

  swipeContainer: {
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },

  moveButton: {
    minHeight: 48,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#E8F1FA',
  },

  moveButtonActive: {
    backgroundColor: '#D5E6FA',
  },

  moveText: {
    color: '#0B5FFF',
    fontSize: 13,
    fontWeight: '700',
  },

  deleteAction: {
    width: 88,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E53935',
  },

  deleteText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  disabled: {
    opacity: 0.5,
  },
});
