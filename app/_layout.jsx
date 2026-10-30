import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { FavoritosProvider } from '../contexts/FavoritosContext';
import { CarritoProvider } from '../contexts/CarritoContext';
import { UsuarioProvider } from '../contexts/UsuarioContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FavoritosProvider>
        <UsuarioProvider>
          <CarritoProvider>
            <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="producto/[id]"
                options={{
                  headerShown: false,
                }}
              />
            </Stack>
          </CarritoProvider>
        </UsuarioProvider>
      </FavoritosProvider>
    </GestureHandlerRootView>
  );
}