import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import ProductCard from '../components/ProductCard';

import { productos } from '../data/products';

export default function Products() {
  const { width } = useWindowDimensions();

  const compact = width < 380;

  const heroHeight = Math.max(
    180,
    Math.min(300, width * 0.42)
  );

  const horizontalPadding = compact ? 16 : 24;

  const heroTitleSize = compact ? 32 : 40;

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={productos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ProductCard {...item} />
        )}
        contentContainerStyle={[
          styles.content,
          {
            paddingHorizontal: horizontalPadding,
          },
        ]}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No hay productos disponibles.
          </Text>
        }
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View>
                <Text style={styles.eyebrow}>
                  PLUGIN STORE
                </Text>

                <Text style={styles.headerTitle}>
                  Inicio
                </Text>
              </View>

              <Text style={styles.count}>
                {productos.length} artículos
              </Text>
            </View>

            <ImageBackground
              source={require('../assets/hero.jpg')}
              resizeMode="cover"
              style={[
                styles.hero,
                {
                  height: heroHeight,
                },
              ]}
              imageStyle={styles.heroImage}
            >
              <View style={styles.heroOverlay}>
                <Text
                  style={[
                    styles.heroTitle,
                    {
                      fontSize: heroTitleSize,
                    },
                  ]}
                >
                  Armá tu PC ideal
                </Text>

                <Text style={styles.heroText}>
                  Hardware para gaming y rendimiento.
                </Text>
              </View>
            </ImageBackground>

            <Text style={styles.sectionTitle}>
              Hardware destacado
            </Text>
          </>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7FBFF',
  },

  content: {
    paddingTop: 16,
    paddingBottom: 32,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  eyebrow: {
    color: '#0B5FFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.4,
  },

  headerTitle: {
    color: '#102A43',
    fontSize: 34,
    fontWeight: '800',
  },

  count: {
    color: '#0B5FFF',
    fontSize: 14,
    fontWeight: '700',
  },

  hero: {
    justifyContent: 'flex-end',
    marginBottom: 24,
  },

  heroImage: {
    borderRadius: 20,
  },

  heroOverlay: {
    backgroundColor: 'rgba(16,42,67,0.52)',
    borderRadius: 20,
    padding: 22,
  },

  heroTitle: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  heroText: {
    color: '#EAF3FF',
    fontSize: 16,
    marginTop: 8,
  },

  sectionTitle: {
    color: '#102A43',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 14,
  },

  separator: {
    height: 14,
  },

  empty: {
    color: '#52667A',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 40,
  },
});