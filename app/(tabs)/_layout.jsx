import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useFavoritos } from '../../contexts/FavoritosContext';
import { useCarrito } from '../../contexts/CarritoContext';

function TabIcon({ activeName, inactiveName, color, focused }) {
  return (
    <Ionicons
      name={focused ? activeName : inactiveName}
      size={22}
      color={color}
    />
  );
}

export default function TabsLayout() {
  const { favoritos } = useFavoritos();
  const { cantidadTotal } = useCarrito();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0B5FFF',
        tabBarInactiveTintColor: '#7B8794',
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Catálogo',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              activeName="grid"
              inactiveName="grid-outline"
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favoritos"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              activeName="heart"
              inactiveName="heart-outline"
              color={color}
              focused={focused}
            />
          ),
          tabBarBadge: favoritos.length > 0 ? favoritos.length : undefined,
        }}
      />

      <Tabs.Screen
        name="carrito"
        options={{
          title: 'Carrito',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              activeName="cart"
              inactiveName="cart-outline"
              color={color}
              focused={focused}
            />
          ),
          tabBarBadge: cantidadTotal > 0 ? cantidadTotal : undefined,
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              activeName="person"
              inactiveName="person-outline"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}