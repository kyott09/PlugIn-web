import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function formatoPrecio(precio) {
  return `$ ${precio.toLocaleString('es-AR')}`;
}

export default function CartItem({
  product,
  cantidad,
  disabled,
  onDecrease,
  onIncrease,
  onRemove,
}) {
  return (
    <View style={styles.card}>
      <Image
        source={product.imagen}
        style={styles.image}
        resizeMode="cover"
        accessibilityLabel={product.nombre}
      />

      <View style={styles.details}>
        <Text style={styles.name}>{product.nombre}</Text>
        <Text style={styles.category}>{product.categoria}</Text>
        <Text style={styles.price}>{formatoPrecio(product.precio)}</Text>

        <View style={styles.actions}>
          <View style={styles.quantityControl}>
            <Pressable
              onPress={onDecrease}
              disabled={disabled || cantidad <= 1}
              accessibilityRole="button"
              accessibilityLabel={`Disminuir cantidad de ${product.nombre}`}
              style={[
                styles.quantityButton,
                (disabled || cantidad <= 1) && styles.disabled,
              ]}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </Pressable>

            <Text
              accessibilityLabel={`Cantidad: ${cantidad}`}
              style={styles.quantity}
            >
              {cantidad}
            </Text>

            <Pressable
              onPress={onIncrease}
              disabled={disabled}
              accessibilityRole="button"
              accessibilityLabel={`Aumentar cantidad de ${product.nombre}`}
              style={[
                styles.quantityButton,
                disabled && styles.disabled,
              ]}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </Pressable>
          </View>

          <Pressable
            onPress={onRemove}
            disabled={disabled}
            accessibilityRole="button"
            accessibilityLabel={`Quitar ${product.nombre} del carrito`}
            style={styles.removeButton}
          >
            <Text style={styles.removeText}>Quitar</Text>
          </Pressable>
        </View>
      </View>

      <Text style={styles.subtotal}>
        {formatoPrecio(product.precio * cantidad)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    gap: 12,
    padding: 12,
  },

  image: {
    width: 72,
    height: 72,
    borderRadius: 12,
  },

  details: {
    flex: 1,
  },

  name: {
    color: '#102A43',
    fontSize: 16,
    fontWeight: '700',
  },

  category: {
    color: '#52667A',
    fontSize: 12,
    marginTop: 3,
  },

  price: {
    color: '#102A43',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
  },

  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },

  quantityControl: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },

  quantityButton: {
    alignItems: 'center',
    backgroundColor: '#EAF3FF',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },

  quantityButtonText: {
    color: '#0B5FFF',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
  },

  quantity: {
    color: '#102A43',
    fontSize: 15,
    fontWeight: '700',
    minWidth: 18,
    textAlign: 'center',
  },

  removeButton: {
    paddingHorizontal: 4,
    paddingVertical: 6,
  },

  removeText: {
    color: '#B42318',
    fontSize: 13,
    fontWeight: '700',
  },

  subtotal: {
    alignSelf: 'flex-start',
    color: '#102A43',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 'auto',
    maxWidth: 86,
    textAlign: 'right',
  },

  disabled: {
    opacity: 0.45,
  },
});
