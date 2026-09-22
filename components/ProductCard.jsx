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
  id,
  nombre,
  precio,
  categoria,
  imagen,
}) {
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
    <Pressable
      testID={`product-${id}`}
      onPress={abrirProducto}
      style={({ pressed }) => [
        styles.card,
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
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    ...shadow,
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
});