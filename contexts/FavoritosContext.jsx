import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Alert } from 'react-native';

import { productos } from '../data/products';
import {
  cargarFavoritos,
  guardarFavoritos,
} from '../utils/favoritosStorage';

const FavoritosContext = createContext(null);
const idsProductos = new Set(productos.map((producto) => producto.id));

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]);
  const [cargandoFavoritos, setCargandoFavoritos] = useState(true);
  const [guardandoFavoritos, setGuardandoFavoritos] = useState(false);
  const [errorFavoritos, setErrorFavoritos] = useState(null);
  const favoritosRef = useRef([]);
  const lecturaCompletaRef = useRef(false);
  const guardandoRef = useRef(false);

  const cargar = useCallback(async () => {
    setCargandoFavoritos(true);
    setErrorFavoritos(null);

    try {
      const favoritosGuardados = await cargarFavoritos();

      if (favoritosGuardados === null) {
        lecturaCompletaRef.current = false;
        setErrorFavoritos('No se pudieron cargar los favoritos. Reintentá la lectura.');
        return false;
      }

      const idsValidos = favoritosGuardados.filter((id) => idsProductos.has(id));
      favoritosRef.current = idsValidos;
      setFavoritos(idsValidos);
      lecturaCompletaRef.current = true;
      return true;
    } finally {
      setCargandoFavoritos(false);
    }
  }, []);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  const actualizarFavoritos = useCallback(async (nuevosIds) => {
    if (!lecturaCompletaRef.current || guardandoRef.current) {
      return false;
    }

    guardandoRef.current = true;
    setGuardandoFavoritos(true);

    const anteriores = favoritosRef.current;
    const siguientes = [...new Set(
      nuevosIds.filter((id) => idsProductos.has(id))
    )];

    favoritosRef.current = siguientes;
    setFavoritos(siguientes);
    setErrorFavoritos(null);

    try {
      await guardarFavoritos(siguientes);
      return true;
    } catch (error) {
      favoritosRef.current = anteriores;
      setFavoritos(anteriores);
      setErrorFavoritos('No se pudieron guardar los cambios. Se restauró el orden anterior.');
      Alert.alert(
        'No se pudieron guardar los favoritos',
        'Se restauraron los favoritos anteriores. Revisá el almacenamiento e intentá de nuevo.'
      );
      return false;
    } finally {
      guardandoRef.current = false;
      setGuardandoFavoritos(false);
    }
  }, []);

  const alternarFavorito = useCallback((producto) => {
    const actuales = favoritosRef.current;
    const siguientes = actuales.includes(producto.id)
      ? actuales.filter((id) => id !== producto.id)
      : [...actuales, producto.id];

    return actualizarFavoritos(siguientes);
  }, [actualizarFavoritos]);

  const quitarFavorito = useCallback((id) => (
    actualizarFavoritos(
      favoritosRef.current.filter((favoritoId) => favoritoId !== id)
    )
  ), [actualizarFavoritos]);

  const value = useMemo(() => ({
    favoritos,
    cargandoFavoritos,
    guardandoFavoritos,
    errorFavoritos,
    alternarFavorito,
    actualizarFavoritos,
    quitarFavorito,
    reintentarCarga: cargar,
  }), [
    favoritos,
    cargandoFavoritos,
    guardandoFavoritos,
    errorFavoritos,
    alternarFavorito,
    actualizarFavoritos,
    quitarFavorito,
    cargar,
  ]);

  return (
    <FavoritosContext.Provider value={value}>
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  const context = useContext(FavoritosContext);

  if (!context) {
    throw new Error('useFavoritos debe utilizarse dentro de FavoritosProvider.');
  }

  return context;
}
