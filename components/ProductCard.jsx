import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';

export default function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  cartDisabled = false,
  showFavoriteToggle = true,
  interactionsDisabled = false,
}) {
  const {
    id,
    nombre,
    precio,
    categoria,
    imagen,
  } = product;

  const router = useRouter();

  const abrirProducto = () => {
    router.push({
      pathname: '/producto/[id]',
      params: {
        id: String(id),
      },
    });
  };

  return (
    <View style={styles.card}>
      <Pressable
        testID={`product-${id}`}
        onPress={abrirProducto}
        disabled={interactionsDisabled}
        style={({ pressed }) => [
          styles.product,
          pressed && styles.pressed,
        ]}
      >
        <Image
          source={imagen}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.info}>
          <Text style={styles.category}>
            {categoria}
          </Text>

          <Text style={styles.name}>
            {nombre}
          </Text>

          <Text style={styles.price}>
            $ {precio.toLocaleString('es-AR')}
          </Text>
        </View>
      </Pressable>

      {showFavoriteToggle && (
        <Pressable
          testID={`favorite-toggle-${id}`}
          onPress={() => onToggleFavorite(product)}
          disabled={!onToggleFavorite}
          accessibilityRole="button"
          accessibilityLabel={
            isFavorite
              ? `Quitar ${nombre} de favoritos`
              : `Agregar ${nombre} a favoritos`
          }
          accessibilityState={{
            disabled: !onToggleFavorite,
            selected: isFavorite,
          }}
          style={({ pressed }) => [
            styles.favoriteButton,
            pressed && styles.favoritePressed,
          ]}
        >
          <Text
            style={[
              styles.favoriteIcon,
              isFavorite && styles.favoriteIconSelected,
            ]}
          >
            {isFavorite ? '♥' : '♡'}
          </Text>
        </Pressable>
      )}

      {onAddToCart && (
        <Pressable
          testID={`cart-add-${id}`}
          onPress={() => onAddToCart(product)}
          disabled={cartDisabled}
          accessibilityRole="button"
          accessibilityLabel={`Agregar ${nombre} al carrito`}
          accessibilityState={{
            disabled: cartDisabled,
          }}
          style={({ pressed }) => [
            styles.cartButton,
            pressed && !cartDisabled && styles.favoritePressed,
            cartDisabled && styles.cartButtonDisabled,
          ]}
        >
          <Text style={styles.cartIcon}>+</Text>
        </Pressable>
      )}
    </View>
  );
}

const shadow = Platform.select({
  android: {
    elevation: 4,
  },

  ios: {
    shadowColor: '#0F172A',
    shadowOpacity: 0.14,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  default: {},
});

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    ...shadow,
  },

  product: {
    flexDirection: 'row',
    gap: 12,
  },

  pressed: {
    opacity: 0.85,
  },

  image: {
    width: 96,
    height: 96,
    borderRadius: 12,
  },

  info: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 34,
  },

  category: {
    color: '#0B5FFF',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  name: {
    color: '#102A43',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },

  price: {
    color: '#102A43',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },

  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },

  favoritePressed: {
    opacity: 0.7,
  },

  favoriteIcon: {
    color: '#52667A',
    fontSize: 28,
    lineHeight: 32,
  },

  favoriteIconSelected: {
    color: '#E53935',
  },

  cartButton: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B5FFF',
    borderRadius: 18,
    zIndex: 1,
  },

  cartButtonDisabled: {
    opacity: 0.45,
  },

  cartIcon: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
  },
});